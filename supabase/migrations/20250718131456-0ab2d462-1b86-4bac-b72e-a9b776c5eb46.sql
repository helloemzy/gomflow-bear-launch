-- Add GOMFLOW-specific fields to existing users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS country_id UUID;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS total_orders_completed INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS total_earnings DECIMAL(12,2) NOT NULL DEFAULT 0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 5.0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS member_since TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();

-- Create countries table for Southeast Asian markets
CREATE TABLE public.countries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  currency_code TEXT NOT NULL,
  currency_symbol TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert SEA countries
INSERT INTO public.countries (name, code, currency_code, currency_symbol) VALUES
('Philippines', 'PH', 'PHP', '₱'),
('Indonesia', 'ID', 'IDR', 'Rp'),
('Thailand', 'TH', 'THB', '฿'),
('Malaysia', 'MY', 'MYR', 'RM'),
('Singapore', 'SG', 'SGD', 'S$');

-- Add foreign key constraint for country_id
ALTER TABLE public.users ADD CONSTRAINT fk_users_country 
FOREIGN KEY (country_id) REFERENCES public.countries(id);

-- Create orders table for group orders
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gom_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  price_per_item DECIMAL(10,2) NOT NULL,
  currency_code TEXT NOT NULL,
  minimum_orders INTEGER NOT NULL DEFAULT 1,
  current_orders INTEGER NOT NULL DEFAULT 0,
  closing_date TIMESTAMP WITH TIME ZONE NOT NULL,
  estimated_shipping_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'completed', 'cancelled')),
  payment_methods JSONB NOT NULL DEFAULT '{}',
  payment_instructions TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create participants table for fans joining orders
CREATE TABLE public.participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp_number TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL,
  payment_reference TEXT,
  payment_proof_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'payment_uploaded', 'verified', 'rejected')),
  notes TEXT,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on new tables
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;

-- RLS Policies for countries (public read)
CREATE POLICY "Countries are publicly readable"
ON public.countries FOR SELECT
USING (is_active = true);

-- RLS Policies for orders
CREATE POLICY "Anyone can view published orders"
ON public.orders FOR SELECT
USING (is_published = true);

CREATE POLICY "GOMs can view their own orders"
ON public.orders FOR SELECT
USING (auth.uid() = gom_id);

CREATE POLICY "GOMs can create orders"
ON public.orders FOR INSERT
WITH CHECK (auth.uid() = gom_id);

CREATE POLICY "GOMs can update their own orders"
ON public.orders FOR UPDATE
USING (auth.uid() = gom_id);

CREATE POLICY "GOMs can delete their own orders"
ON public.orders FOR DELETE
USING (auth.uid() = gom_id);

-- RLS Policies for participants
CREATE POLICY "Anyone can join published orders"
ON public.participants FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE id = order_id AND is_published = true AND status = 'active'
  )
);

CREATE POLICY "GOMs can view participants in their orders"
ON public.participants FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE id = order_id AND gom_id = auth.uid()
  )
);

CREATE POLICY "GOMs can update participants in their orders"
ON public.participants FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE id = order_id AND gom_id = auth.uid()
  )
);

-- Triggers for updated_at on new tables
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_participants_updated_at
    BEFORE UPDATE ON public.participants
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update order count when participants change
CREATE OR REPLACE FUNCTION public.update_order_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.status = 'verified' THEN
        UPDATE public.orders 
        SET current_orders = current_orders + NEW.quantity
        WHERE id = NEW.order_id;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.status != 'verified' AND NEW.status = 'verified' THEN
            UPDATE public.orders 
            SET current_orders = current_orders + NEW.quantity
            WHERE id = NEW.order_id;
        ELSIF OLD.status = 'verified' AND NEW.status != 'verified' THEN
            UPDATE public.orders 
            SET current_orders = current_orders - OLD.quantity
            WHERE id = NEW.order_id;
        END IF;
    ELSIF TG_OP = 'DELETE' AND OLD.status = 'verified' THEN
        UPDATE public.orders 
        SET current_orders = current_orders - OLD.quantity
        WHERE id = OLD.order_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update order counts
CREATE TRIGGER update_order_count_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.participants
    FOR EACH ROW
    EXECUTE FUNCTION public.update_order_count();