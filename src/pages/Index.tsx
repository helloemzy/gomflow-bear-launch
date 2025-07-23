import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, Shield, Star, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import newjeansAlbum from "@/assets/newjeans-album.jpg";
import btsLightstick from "@/assets/bts-lightstick.jpg";
import twicePhotobook from "@/assets/twice-photobook.jpg";

interface Order {
  id: string;
  title: string;
  price_per_item: number;
  minimum_orders: number;
  current_orders: number;
  closing_date: string;
  currency_code: string;
  images: string[];
  gom_id: string;
}

const Index = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for now since we don't have orders yet
  const mockOrders = [
    {
      id: "1",
      title: "NewJeans - 'Get Up' Special Album",
      price_per_item: 28.00,
      minimum_orders: 50,
      current_orders: 42,
      closing_date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      currency_code: "SGD",
      images: [newjeansAlbum],
      gom_id: "gom1",
      gom_name: "KpopCollectorSG",
      verified: true,
      rating: 4.9
    },
    {
      id: "2", 
      title: "BTS Official Light Stick Ver. 4",
      price_per_item: 40.00,
      minimum_orders: 25,
      current_orders: 23,
      closing_date: new Date(Date.now() + 45 * 60 * 1000).toISOString(), // 45 minutes from now
      currency_code: "SGD",
      images: [btsLightstick],
      gom_id: "gom2",
      gom_name: "ArmyMalaysia",
      verified: true,
      rating: 4.8
    },
    {
      id: "3",
      title: "TWICE - Formula of Love Photobook",
      price_per_item: 30.00,
      minimum_orders: 30,
      current_orders: 20,
      closing_date: new Date(Date.now() + 6.5 * 60 * 60 * 1000).toISOString(), // 6.5 hours from now
      currency_code: "SGD",
      images: [twicePhotobook],
      gom_id: "gom3",
      gom_name: "OncePH",
      verified: false,
      rating: 4.6
    }
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching orders:', error);
          // Use mock data as fallback
          setOrders(mockOrders as any);
        } else {
          setOrders(data || mockOrders as any);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders(mockOrders as any);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getProgressPercentage = (current: number, minimum: number) => {
    return Math.min((current / minimum) * 100, 100);
  };

  const formatTimeLeft = (closingDate: string) => {
    const now = new Date();
    const closing = new Date(closingDate);
    const diff = closing.getTime() - now.getTime();
    
    if (diff <= 0) return 'Closed';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m left`;
  };

  const isClosingSoon = (closingDate: string) => {
    const now = new Date();
    const closing = new Date(closingDate);
    const diff = closing.getTime() - now.getTime();
    return diff <= 60 * 60 * 1000; // Less than 1 hour
  };

  const filteredOrders = orders.filter(order =>
    order.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Live Group Orders
          </h1>
          <p className="text-xl text-muted-foreground">
            Join active group orders and save money on your favorite merchandise
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search for merchandise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order: any) => (
            <Card key={order.id} className="card-gomflow hover-lift">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <img 
                    src={order.images[0] || newjeansAlbum}
                    alt={order.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  {isClosingSoon(order.closing_date) && (
                    <div className="badge-hot">HOT</div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg mb-2">{order.title}</CardTitle>
                
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-gomflow-success" />
                  <span className="text-sm text-muted-foreground">
                    {order.gom_name || 'GOM'}
                  </span>
                  {order.verified && (
                    <div className="badge-verified">VERIFIED</div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-orange">
                      ${order.price_per_item}
                    </span>
                    <div className="text-sm text-muted-foreground">
                      {order.minimum_orders - order.current_orders} spots left
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{getProgressPercentage(order.current_orders, order.minimum_orders).toFixed(0)}% filled</span>
                      <span>{order.current_orders}/{order.minimum_orders}</span>
                    </div>
                    <div className="progress-orange h-2">
                      <div 
                        className="progress-orange-fill h-full"
                        style={{ width: `${getProgressPercentage(order.current_orders, order.minimum_orders)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{formatTimeLeft(order.closing_date)}</span>
                    </div>
                    <Link to={`/order/${order.id}`}>
                      <Button size="sm" variant="orange">
                        Join Order
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search terms' : 'No active orders at the moment'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;