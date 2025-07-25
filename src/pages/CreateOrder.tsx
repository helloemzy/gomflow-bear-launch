import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  Upload, 
  X,
  CalendarIcon,
  DollarSign,
  Eye,
  Sparkles,
  Check,
  Link2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Country {
  code: string;
  name: string;
  flag: string;
  currency_code: string;
  currency_symbol: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  logo?: string;
  color: string;
}

interface OrderData {
  country: Country | null;
  title: string;
  description: string;
  product_url: string;
  images: string[];
  price_per_item: number;
  minimum_orders: number;
  maximum_orders?: number;
  closing_date: Date | undefined;
  estimated_shipping_date: Date | undefined;
  payment_methods: string[];
  payment_instructions: string;
}

// Country data with payment methods
const COUNTRIES: Country[] = [
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', currency_code: 'HKD', currency_symbol: 'HK$' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', currency_code: 'MYR', currency_symbol: 'RM' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', currency_code: 'IDR', currency_symbol: 'Rp' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', currency_code: 'PHP', currency_symbol: '₱' },
  { code: 'US', name: 'USA', flag: '🇺🇸', currency_code: 'USD', currency_symbol: '$' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency_code: 'CAD', currency_symbol: 'C$' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency_code: 'EUR', currency_symbol: '€' },
  { code: 'GB', name: 'UK', flag: '🇬🇧', currency_code: 'GBP', currency_symbol: '£' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency_code: 'AUD', currency_symbol: 'A$' },
];

const PAYMENT_METHODS: Record<string, PaymentMethod[]> = {
  HK: [
    { id: 'payme', name: 'PayMe', color: 'bg-blue-500' },
    { id: 'fps', name: 'FPS', color: 'bg-green-500' },
    { id: 'bank_transfer', name: 'Bank Transfer', color: 'bg-gray-500' },
    { id: 'alipay_hk', name: 'Alipay HK', color: 'bg-blue-600' },
  ],
  MY: [
    { id: 'tng', name: "Touch 'n Go", color: 'bg-blue-500' },
    { id: 'grabpay', name: 'GrabPay', color: 'bg-green-500' },
    { id: 'bank_transfer', name: 'Bank Transfer', color: 'bg-gray-500' },
    { id: 'boost', name: 'Boost', color: 'bg-orange-500' },
  ],
  ID: [
    { id: 'gopay', name: 'GoPay', color: 'bg-green-500' },
    { id: 'ovo', name: 'OVO', color: 'bg-purple-500' },
    { id: 'dana', name: 'DANA', color: 'bg-blue-500' },
    { id: 'bank_transfer', name: 'Bank Transfer', color: 'bg-gray-500' },
  ],
  PH: [
    { id: 'gcash', name: 'GCash', color: 'bg-blue-500' },
    { id: 'paymaya', name: 'PayMaya', color: 'bg-green-500' },
    { id: 'bank_transfer', name: 'Bank Transfer', color: 'bg-gray-500' },
    { id: 'paypal', name: 'PayPal', color: 'bg-blue-600' },
  ],
  US: [
    { id: 'paypal', name: 'PayPal', color: 'bg-blue-600' },
    { id: 'venmo', name: 'Venmo', color: 'bg-blue-400' },
    { id: 'zelle', name: 'Zelle', color: 'bg-purple-500' },
    { id: 'apple_pay', name: 'Apple Pay', color: 'bg-black' },
  ],
  CA: [
    { id: 'interac', name: 'Interac e-Transfer', color: 'bg-red-500' },
    { id: 'paypal', name: 'PayPal', color: 'bg-blue-600' },
    { id: 'bank_transfer', name: 'Bank Transfer', color: 'bg-gray-500' },
    { id: 'apple_pay', name: 'Apple Pay', color: 'bg-black' },
  ],
  FR: [
    { id: 'paypal', name: 'PayPal', color: 'bg-blue-600' },
    { id: 'bank_transfer', name: 'Bank Transfer', color: 'bg-gray-500' },
    { id: 'lydia', name: 'Lydia', color: 'bg-green-500' },
    { id: 'apple_pay', name: 'Apple Pay', color: 'bg-black' },
  ],
  GB: [
    { id: 'paypal', name: 'PayPal', color: 'bg-blue-600' },
    { id: 'bank_transfer', name: 'Bank Transfer', color: 'bg-gray-500' },
    { id: 'revolut', name: 'Revolut', color: 'bg-blue-500' },
    { id: 'apple_pay', name: 'Apple Pay', color: 'bg-black' },
  ],
  AU: [
    { id: 'payid', name: 'PayID', color: 'bg-orange-500' },
    { id: 'paypal', name: 'PayPal', color: 'bg-blue-600' },
    { id: 'bank_transfer', name: 'Bank Transfer', color: 'bg-gray-500' },
    { id: 'apple_pay', name: 'Apple Pay', color: 'bg-black' },
  ],
};

export default function CreateOrder() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderData>({
    country: null,
    title: '',
    description: '',
    product_url: '',
    images: [],
    price_per_item: 0,
    minimum_orders: 50,
    maximum_orders: undefined,
    closing_date: undefined,
    estimated_shipping_date: undefined,
    payment_methods: [],
    payment_instructions: ''
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // For now, we'll just add placeholder URLs
    // In production, you'd upload to Supabase Storage
    const newImages = Array.from(files).map((file, index) => 
      URL.createObjectURL(file)
    );
    
    setOrderData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 5) // Max 5 images
    }));
  };

  const removeImage = (index: number) => {
    setOrderData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const calculatePotentialEarnings = () => {
    if (!orderData.price_per_item || !orderData.minimum_orders) return 0;
    // Assume 10% margin for calculation
    return orderData.price_per_item * orderData.minimum_orders * 0.1;
  };

  const getAvailablePaymentMethods = () => {
    if (!orderData.country) return [];
    return PAYMENT_METHODS[orderData.country.code] || [];
  };

  const handleSubmit = async (publish: boolean = false) => {
    if (!user || !orderData.country) return;

    setIsLoading(true);

    try {
      // Map currency codes to supported values
      const currencyMapping: Record<string, 'PHP' | 'MYR'> = {
        'PHP': 'PHP',
        'MYR': 'MYR',
        // Default other currencies to PHP for now
        'HKD': 'PHP',
        'IDR': 'PHP',
        'USD': 'PHP',
        'CAD': 'PHP',
        'EUR': 'PHP',
        'GBP': 'PHP',
        'AUD': 'PHP'
      };

      const { data, error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          title: orderData.title,
          description: orderData.description,
          price: orderData.price_per_item,
          currency: currencyMapping[orderData.country.currency_code] || 'PHP',
          min_orders: orderData.minimum_orders,
          max_orders: orderData.maximum_orders,
          deadline: orderData.closing_date?.toISOString(),
          is_active: publish,
          slug: orderData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          payment_methods: orderData.payment_methods
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: publish ? "Order Published!" : "Order Saved!",
        description: publish 
          ? "Your order is now live and ready for customers!"
          : "Your order has been saved as a draft.",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error saving order",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { id: 1, title: "Country & Payment", description: "Where are you based?" },
    { id: 2, title: "Product Details", description: "What are you selling?" },
    { id: 3, title: "Pricing", description: "Let's talk money" },
    { id: 4, title: "Timeline", description: "When does this adventure end?" },
    { id: 5, title: "Launch", description: "Ready to go live?" }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return orderData.country && orderData.payment_methods.length > 0;
      case 2:
        return orderData.title && orderData.description;
      case 3:
        return orderData.price_per_item > 0 && orderData.minimum_orders > 0;
      case 4:
        return orderData.closing_date;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Create New Order</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    currentStep === step.id ? "bg-primary text-primary-foreground" :
                    currentStep > step.id ? "bg-green-500 text-white" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {currentStep > step.id ? '✓' : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "w-full h-0.5 mx-2",
                      currentStep > step.id ? "bg-green-500" : "bg-muted"
                    )} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">{steps[currentStep - 1].title}</h2>
              <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
            </div>
          </div>

          {/* Step Content */}
          <Card className="mb-8">
            <CardContent className="p-6">
              {currentStep === 1 && (
                <div className="space-y-8">
                  {/* Country Selection */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">Select Your Country</h3>
                      <p className="text-muted-foreground">This determines currency and available payment methods</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {COUNTRIES.map((country) => (
                        <Card 
                          key={country.code}
                          className={cn(
                            "cursor-pointer transition-all hover:shadow-md",
                            orderData.country?.code === country.code 
                              ? "ring-2 ring-primary bg-primary/5" 
                              : "hover:shadow-sm"
                          )}
                          onClick={() => {
                            setOrderData(prev => ({ 
                              ...prev, 
                              country, 
                              payment_methods: [] 
                            }));
                          }}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl mb-2">{country.flag}</div>
                            <div className="font-medium text-sm">{country.name}</div>
                            <div className="text-xs text-muted-foreground">{country.currency_code}</div>
                            {orderData.country?.code === country.code && (
                              <Check className="h-4 w-4 text-primary mx-auto mt-2" />
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Payment Methods Selection */}
                  {orderData.country && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Select Payment Methods</h3>
                        <p className="text-muted-foreground">Choose all payment methods you can accept</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {getAvailablePaymentMethods().map((method) => (
                          <Card 
                            key={method.id}
                            className={cn(
                              "cursor-pointer transition-all hover:shadow-md",
                              orderData.payment_methods.includes(method.id)
                                ? "ring-2 ring-primary bg-primary/5" 
                                : "hover:shadow-sm"
                            )}
                            onClick={() => {
                              setOrderData(prev => ({
                                ...prev,
                                payment_methods: prev.payment_methods.includes(method.id)
                                  ? prev.payment_methods.filter(id => id !== method.id)
                                  : [...prev.payment_methods, method.id]
                              }));
                            }}
                          >
                            <CardContent className="p-4 flex items-center space-x-3">
                              <div className={cn("w-3 h-3 rounded-full", method.color)} />
                              <span className="font-medium flex-1">{method.name}</span>
                              {orderData.payment_methods.includes(method.id) && (
                                <Check className="h-4 w-4 text-primary" />
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title</Label>
                    <Input
                      id="title"
                      placeholder="BTS Proof Standard Edition Album"
                      value={orderData.title}
                      onChange={(e) => setOrderData(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product_url">Product URL (Optional)</Label>
                    <div className="relative">
                      <Link2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="product_url"
                        placeholder="https://example.com/product"
                        value={orderData.product_url}
                        onChange={(e) => setOrderData(prev => ({ ...prev, product_url: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell your customers about this amazing product..."
                      value={orderData.description}
                      onChange={(e) => setOrderData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Product Images</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {orderData.images.map((image, index) => (
                        <div key={index} className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                          <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 h-6 w-6 p-0"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {orderData.images.length < 5 && (
                        <label className="aspect-square bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                          <div className="text-center">
                            <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Add Photo</p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price per Item</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-sm text-muted-foreground">
                          {orderData.country?.currency_symbol || '$'}
                        </span>
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.00"
                          value={orderData.price_per_item || ''}
                          onChange={(e) => setOrderData(prev => ({ ...prev, price_per_item: parseFloat(e.target.value) || 0 }))}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="minimum">Minimum Orders</Label>
                      <Input
                        id="minimum"
                        type="number"
                        placeholder="50"
                        value={orderData.minimum_orders || ''}
                        onChange={(e) => setOrderData(prev => ({ ...prev, minimum_orders: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maximum">Maximum Orders (Optional)</Label>
                    <Input
                      id="maximum"
                      type="number"
                      placeholder="No limit"
                      value={orderData.maximum_orders || ''}
                      onChange={(e) => setOrderData(prev => ({ 
                        ...prev, 
                        maximum_orders: e.target.value ? parseInt(e.target.value) : undefined 
                      }))}
                    />
                  </div>

                  {orderData.price_per_item > 0 && orderData.minimum_orders > 0 && (
                    <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Sparkles className="h-5 w-5 text-orange-600" />
                          <h3 className="font-semibold text-orange-800 dark:text-orange-200">Potential Earnings</h3>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">
                          {orderData.country?.currency_symbol || '$'}{calculatePotentialEarnings().toFixed(2)}
                        </p>
                        <p className="text-sm text-orange-700 dark:text-orange-300">
                          If you get {orderData.minimum_orders} orders, you could earn this much!
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Closing Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !orderData.closing_date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {orderData.closing_date ? format(orderData.closing_date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={orderData.closing_date}
                            onSelect={(date) => setOrderData(prev => ({ ...prev, closing_date: date }))}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Estimated Shipping Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !orderData.estimated_shipping_date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {orderData.estimated_shipping_date ? format(orderData.estimated_shipping_date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={orderData.estimated_shipping_date}
                            onSelect={(date) => setOrderData(prev => ({ ...prev, estimated_shipping_date: date }))}
                            initialFocus
                            disabled={(date) => orderData.closing_date ? date < orderData.closing_date : date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Payment Instructions</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Add specific payment details for your selected methods..."
                      value={orderData.payment_instructions}
                      onChange={(e) => setOrderData(prev => ({ ...prev, payment_instructions: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      💡 <strong>Pro tip:</strong> Give yourself buffer time! Suppliers usually take 3-4 weeks, 
                      so add extra time for unexpected delays.
                    </p>
                  </div>
                </div>
              )}


              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Ready to Launch!</h3>
                    <p className="text-muted-foreground">
                      Your order looks amazing! Choose how you want to proceed:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <h4 className="font-semibold mb-2">Save as Draft</h4>
                        <p className="text-sm text-muted-foreground">
                          Save your order to work on it later. You can publish it whenever you're ready.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                      <CardContent className="p-0">
                        <h4 className="font-semibold mb-2">Publish Order</h4>
                        <p className="text-sm text-muted-foreground">
                          Go live immediately! Your order will be available for customers to join.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            <div className="flex space-x-2">
              {currentStep === 5 ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => handleSubmit(false)}
                    disabled={isLoading}
                  >
                    Save Draft
                  </Button>
                  <Button
                    onClick={() => handleSubmit(true)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Publishing...' : 'Publish Order'}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
                  disabled={!canProceed()}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}