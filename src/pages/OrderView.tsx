import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Clock, 
  Users, 
  Star, 
  Shield, 
  ArrowLeft,
  Heart,
  Share2,
  ShoppingCart,
  MessageCircle,
  CheckCircle,
  Calendar,
  CreditCard
} from 'lucide-react';
import { format } from 'date-fns';
import bearMascot from '@/assets/bear-mascot.png';

interface Order {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  min_orders: number;
  deadline: string;
  payment_methods: any;
  is_active: boolean;
  created_at: string;
  user_id: string;
}

export default function OrderView() {
  const { orderId } = useParams<{ orderId: string }>();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .eq('is_active', true)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            toast({
              title: "Order not found",
              description: "This order doesn't exist or is no longer available.",
              variant: "destructive"
            });
          } else {
            throw error;
          }
        } else {
          setOrder(data as any);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        toast({
          title: "Error loading order",
          description: "Please try refreshing the page.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, toast]);

  const getProgressPercentage = () => {
    if (!order) return 0;
    // Using min_orders from actual schema, current_orders will be 0 for now
    return Math.min((0 / (order.min_orders || 1)) * 100, 100);
  };

  const getTimeLeft = () => {
    if (!order) return 'Loading...';
    const now = new Date();
    const closing = new Date(order.deadline);
    const diff = closing.getTime() - now.getTime();
    
    if (diff <= 0) return 'Closed';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getSpotsLeft = () => {
    if (!order) return 0;
    return Math.max(0, (order.min_orders || 1) - 0); // current_orders is 0 for now
  };

  const getPaymentMethodsList = () => {
    if (!order?.payment_methods) return [];
    return Object.entries(order.payment_methods)
      .filter(([_, enabled]) => enabled)
      .map(([method, _]) => method.replace('_', ' ').toUpperCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <img src={bearMascot} alt="Not found" className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
            <p className="text-muted-foreground mb-4">
              This order doesn't exist or is no longer available.
            </p>
            <Button asChild>
              <Link to="/">Go Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <img src={bearMascot} alt="GOMFLOW" className="h-6 w-6" />
                <span className="font-semibold text-primary">GOMFLOW</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Images */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <img src={bearMascot} alt="Product placeholder" className="h-16 w-16 opacity-50" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{order.title}</CardTitle>
                  <CardDescription>
                    {order.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Price per item</p>
                      <p className="text-2xl font-bold text-primary">
                        {order.currency === 'PHP' ? '₱' : '$'}{order.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Deadline</p>
                      <p className="font-medium">
                        {format(new Date(order.deadline), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Payment Methods</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getPaymentMethodsList().map((method) => (
                        <Badge key={method} variant="secondary">
                          <CreditCard className="h-3 w-3 mr-1" />
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* GOM Profile - Simplified for now */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span>Trusted GOM</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>GM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">Group Order Manager</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          5.0 rating
                        </div>
                        <div>Verified GOM</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">
                      0/{order.min_orders || 1}
                    </span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {getSpotsLeft()} spots left
                    </Badge>
                  </div>
                  
                  <Progress value={getProgressPercentage()} className="h-3" />
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {getTimeLeft()} left
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      0 joined
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Join Order Button */}
              <div className="sticky top-4">
                <Button 
                  size="lg" 
                  className="w-full text-lg font-semibold py-6"
                  asChild
                >
                  <Link to={`/join/${order.id}`}>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Join This Order
                  </Link>
                </Button>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Closes on</span>
                    <span className="font-medium">
                      {format(new Date(order.deadline), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Estimated shipping</span>
                    <span className="font-medium">
                      TBD
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Secured by GOMFLOW
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}