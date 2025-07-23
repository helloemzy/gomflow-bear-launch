-- Create countries table
CREATE TABLE public.countries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name varchar(100) NOT NULL UNIQUE,
  code varchar(2) NOT NULL UNIQUE,
  currency_code varchar(3) NOT NULL,
  currency_symbol varchar(5) NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Insert some common countries
INSERT INTO public.countries (name, code, currency_code, currency_symbol) VALUES
('Philippines', 'PH', 'PHP', '₱'),
('United States', 'US', 'USD', '$'),
('Canada', 'CA', 'CAD', 'C$'),
('United Kingdom', 'GB', 'GBP', '£'),
('Australia', 'AU', 'AUD', 'A$'),
('Singapore', 'SG', 'SGD', 'S$'),
('Malaysia', 'MY', 'MYR', 'RM'),
('Thailand', 'TH', 'THB', '฿'),
('Indonesia', 'ID', 'IDR', 'Rp'),
('Vietnam', 'VN', 'VND', '₫'),
('Japan', 'JP', 'JPY', '¥'),
('South Korea', 'KR', 'KRW', '₩'),
('India', 'IN', 'INR', '₹'),
('China', 'CN', 'CNY', '¥'),
('Germany', 'DE', 'EUR', '€'),
('France', 'FR', 'EUR', '€'),
('Italy', 'IT', 'EUR', '€'),
('Spain', 'ES', 'EUR', '€'),
('Netherlands', 'NL', 'EUR', '€'),
('Brazil', 'BR', 'BRL', 'R$');

-- Enable RLS
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Countries are publicly viewable" 
ON public.countries 
FOR SELECT 
USING (true);