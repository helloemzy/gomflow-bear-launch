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
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Country {
  id: string;
  name: string;
  currency_code: string;
  currency_symbol: string;
}

interface OrderData {
  title: string;
  description: string;
  images: string[];
  price_per_item: number;
  minimum_orders: number;
  closing_date: Date | undefined;
  estimated_shipping_date: Date | undefined;
  payment_methods: {
    gcash: boolean;
    paymaya: boolean;
    bpi: boolean;
    bank_transfer: boolean;
  };
  payment_instructions: string;
}

export default function CreateOrder() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [country, setCountry] = useState<Country | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderData>({
    title: '',
    description: '',
    images: [],
    price_per_item: 0,
    minimum_orders: 50,
    closing_date: undefined,
    estimated_shipping_date: undefined,
    payment_methods: {
      gcash: true,
      paymaya: false,
      bpi: false,
      bank_transfer: false
    },
    payment_instructions: ''
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  // Fetch user's country
  useEffect(() => {
    const fetchCountry = async () => {
      if (!user?.country_id) return;

      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .eq('id', user.country_id)
        .single();

      if (error) {
        console.error('Error fetching country:', error);
      } else {
        setCountry(data);
      }
    };

    fetchCountry();
  }, [user]);

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

  const handleSubmit = async (publish: boolean = false) => {
    if (!user) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          gom_id: user.id,
          title: orderData.title,
          description: orderData.description,
          images: orderData.images,
          price_per_item: orderData.price_per_item,
          currency_code: country?.currency_code || 'USD',
          minimum_orders: orderData.minimum_orders,
          closing_date: orderData.closing_date?.toISOString(),
          estimated_shipping_date: orderData.estimated_shipping_date?.toISOString(),
          payment_methods: orderData.payment_methods,
          payment_instructions: orderData.payment_instructions,
          is_published: publish
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
    { id: 1, title: "Product Details", description: "What are you selling?" },
    { id: 2, title: "Pricing", description: "Let's talk money" },
    { id: 3, title: "Timeline", description: "When does this adventure end?" },
    { id: 4, title: "Payment", description: "How can they pay you?" },
    { id: 5, title: "Launch", description: "Ready to go live?" }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return orderData.title && orderData.description;
      case 2:
        return orderData.price_per_item > 0 && orderData.minimum_orders > 0;
      case 3:
        return orderData.closing_date;
      case 4:
        return Object.values(orderData.payment_methods).some(method => method);
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

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price per Item</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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

                  {orderData.price_per_item > 0 && orderData.minimum_orders > 0 && (
                    <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Sparkles className="h-5 w-5 text-orange-600" />
                          <h3 className="font-semibold text-orange-800 dark:text-orange-200">Potential Earnings</h3>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">
                          {country?.currency_symbol || '$'}{calculatePotentialEarnings().toFixed(2)}
                        </p>
                        <p className="text-sm text-orange-700 dark:text-orange-300">
                          If you get {orderData.minimum_orders} orders, you could earn this much!
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {currentStep === 3 && (
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
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      💡 <strong>Pro tip:</strong> Give yourself buffer time! Suppliers usually take 3-4 weeks, 
                      so add extra time for unexpected delays.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Payment Methods (Select all that apply)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { key: 'gcash', label: 'GCash' },
                        { key: 'paymaya', label: 'PayMaya' },
                        { key: 'bpi', label: 'BPI' },
                        { key: 'bank_transfer', label: 'Bank Transfer' }
                      ].map(method => (
                        <div key={method.key} className="flex items-center space-x-2">
                          <Checkbox
                            id={method.key}
                            checked={orderData.payment_methods[method.key as keyof typeof orderData.payment_methods]}
                            onCheckedChange={(checked) => {
                              setOrderData(prev => ({
                                ...prev,
                                payment_methods: {
                                  ...prev.payment_methods,
                                  [method.key]: checked
                                }
                              }));
                            }}
                          />
                          <Label htmlFor={method.key}>{method.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Payment Instructions</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Add your payment details and instructions here..."
                      value={orderData.payment_instructions}
                      onChange={(e) => setOrderData(prev => ({ ...prev, payment_instructions: e.target.value }))}
                      rows={4}
                    />
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