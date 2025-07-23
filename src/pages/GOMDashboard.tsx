import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign,
  Eye,
  Edit3,
  MoreHorizontal,
  LogOut
} from 'lucide-react';
import bearMascot from '@/assets/bear-mascot.png';

interface Order {
  id: string;
  title: string;
  images: string[];
  price_per_item: number;
  currency_code: string;
  minimum_orders: number;
  current_orders: number;
  closing_date: string;
  status: string;
  is_published: boolean;
  created_at: string;
}

interface DashboardStats {
  totalEarnings: number;
  activeOrders: number;
  totalCustomers: number;
  timesSaved: number;
  currencySymbol: string;
}

export default function GOMDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalEarnings: 0,
    activeOrders: 0,
    totalCustomers: 0,
    timesSaved: 0,
    currencySymbol: '$'
  });
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        // Fetch orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;

        // Fetch user's country for currency
        const { data: countryData } = await supabase
          .from('countries')
          .select('currency_symbol')
          .eq('id', user.country_id)
          .single();

        const currencySymbol = countryData?.currency_symbol || '$';

        // Calculate stats
        const activeOrders = ordersData?.filter(order => order.is_active).length || 0;
        const totalCustomers = 0; // Will implement when submissions system is working
        const timesSaved = (ordersData?.length || 0) * 20; // 20 hours saved per order

        setOrders(ordersData || []);
        setStats({
          totalEarnings: user.total_earnings || 0,
          activeOrders,
          totalCustomers,
          timesSaved,
          currencySymbol
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error loading dashboard",
          description: "Please try refreshing the page.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, toast]);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    } else {
      navigate('/');
    }
  };

  const getProgressPercentage = (current: number, minimum: number) => {
    return Math.min((current / minimum) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'closed': return 'bg-orange-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTimeLeft = (closingDate: string) => {
    const now = new Date();
    const closing = new Date(closingDate);
    const diff = closing.getTime() - now.getTime();
    
    if (diff <= 0) return 'Closed';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h left`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
              <img src={bearMascot} alt="GOMFLOW" className="h-8 w-8" />
              <h1 className="text-2xl font-bold text-foreground">GOMFLOW</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome back, {user?.full_name || 'GOM'}!
              </span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {stats.currencySymbol}{stats.totalEarnings.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Active Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.activeOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.activeOrders > 0 && (
                  <span className="text-green-600">● Live</span>
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Happy Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total orders processed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Time Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.timesSaved}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Hours automated
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Orders</h2>
          <Button asChild>
            <Link to="/create-order">
              <Plus className="h-4 w-4 mr-2" />
              Create New Order
            </Link>
          </Button>
        </div>

        {orders.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <img src={bearMascot} alt="No orders" className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-4">
                Your group order empire starts here! Create your first order and watch the magic happen.
              </p>
              <Button asChild>
                <Link to="/create-order">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Order
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-1">{order.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        {!order.is_published && (
                          <Badge variant="outline">Draft</Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Product Image */}
                  {order.images.length > 0 && (
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={order.images[0]} 
                        alt={order.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">
                        {order.current_orders}/{order.minimum_orders}
                      </span>
                    </div>
                    <Progress 
                      value={getProgressPercentage(order.current_orders, order.minimum_orders)} 
                      className="h-2"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Price</p>
                      <p className="font-medium">{stats.currencySymbol}{order.price_per_item}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Time Left</p>
                      <p className="font-medium">{formatTimeLeft(order.closing_date)}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link to={`/order/${order.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link to={`/manage/${order.id}`}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Manage
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}