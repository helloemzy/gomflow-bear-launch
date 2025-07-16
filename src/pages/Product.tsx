import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Clock, Shield, Check, Star, MessageCircle, CreditCard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import bearMascot from "@/assets/bear-mascot.png";
import newjeansAlbum from "@/assets/newjeans-album.jpg";

const Product = () => {
  const { id } = useParams();
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 15, seconds: 30 });
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [whatsappUpdates, setWhatsappUpdates] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const product = {
    id: id || "sample",
    title: "NewJeans - 'Get Up' Special Album",
    subtitle: "Limited Edition with Exclusive Photocard Set",
    price: "$28.00",
    originalPrice: "$35.00",
    savings: "$7.00",
    image: newjeansAlbum,
    progress: 85,
    ordersNeeded: 50,
    ordersFilled: 42,
    ordersLeft: 8,
    gom: {
      name: "KpopCollectorSG",
      rating: 4.9,
      completedOrders: 127,
      verified: true,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332b355?w=100&h=100&fit=crop&crop=face"
    },
    features: [
      "Exclusive photocard set (5 cards)",
      "Limited edition packaging",
      "Guaranteed authentic merchandise",
      "Free shipping within Singapore",
      "WhatsApp order updates"
    ],
    orderSteps: [
      { step: 1, title: "Join Order", completed: false, current: true },
      { step: 2, title: "Payment Confirmed", completed: false, current: false },
      { step: 3, title: "Order Processed", completed: false, current: false },
      { step: 4, title: "Ready for Pickup", completed: false, current: false }
    ]
  };

  const handleJoinOrder = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const formatTime = (time: number) => String(time).padStart(2, '0');

  const calculateTotal = () => {
    const basePrice = parseFloat(product.price.replace('$', ''));
    return (basePrice * orderQuantity).toFixed(2);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="card-gomflow max-w-md mx-4">
          <CardContent className="text-center p-8">
            <img 
              src={bearMascot} 
              alt="Success Bear" 
              className="w-32 h-32 mx-auto mb-6 animate-bounce-gentle"
            />
            <h2 className="text-2xl font-bold text-gomflow-success mb-4">
              Order Confirmed! 🎉
            </h2>
            <p className="text-muted-foreground mb-6">
              You've successfully joined the group order! You'll receive payment instructions via WhatsApp shortly.
            </p>
            <Button 
              onClick={() => setShowSuccess(false)}
              variant="orange"
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Image and Info */}
          <div className="lg:col-span-2">
            <Card className="card-product">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-80 object-cover rounded-lg mb-6"
                />
                <div className="absolute top-4 right-4 badge-trending">
                  TRENDING
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {product.subtitle}
              </p>

              {/* GOM Info */}
              <div className="flex items-center gap-4 p-4 bg-gomflow-gray-light rounded-lg mb-6">
                <img 
                  src={product.gom.avatar} 
                  alt={product.gom.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{product.gom.name}</span>
                    {product.gom.verified && (
                      <Badge className="badge-verified">
                        <Shield className="w-3 h-3 mr-1" />
                        VERIFIED
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-orange text-orange" />
                      <span>{product.gom.rating}</span>
                    </div>
                    <span>{product.gom.completedOrders} orders completed</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">What's Included:</h3>
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-gomflow-success" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Order Form */}
          <div className="space-y-6">
            {/* Timer */}
            <Card className="card-gomflow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange" />
                  Order Closes In
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-orange">
                  <span>{formatTime(timeLeft.hours)}</span>
                  <span>:</span>
                  <span>{formatTime(timeLeft.minutes)}</span>
                  <span>:</span>
                  <span>{formatTime(timeLeft.seconds)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card className="card-gomflow">
              <CardHeader>
                <CardTitle>Order Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>{product.ordersFilled} of {product.ordersNeeded} orders</span>
                    <span>{product.ordersLeft} spots left</span>
                  </div>
                  <div className="progress-orange h-3">
                    <div 
                      className="progress-orange-fill h-full"
                      style={{ width: `${product.progress}%` }}
                    />
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    {product.progress}% Complete
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Form */}
            <Card className="card-gomflow">
              <CardHeader>
                <CardTitle>Join Group Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg">Price per item:</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-orange">{product.price}</span>
                      <div className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gomflow-success/10 p-3 rounded-lg">
                    <div className="text-sm font-medium text-gomflow-success">
                      You save {product.savings} per item!
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                    >
                      -
                    </Button>
                    <Input 
                      id="quantity"
                      type="number" 
                      value={orderQuantity}
                      onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setOrderQuantity(orderQuantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="whatsapp"
                    checked={whatsappUpdates}
                    onCheckedChange={(checked) => setWhatsappUpdates(checked === true)}
                  />
                  <Label htmlFor="whatsapp" className="text-sm">
                    Get WhatsApp updates for this order
                  </Label>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-orange">${calculateTotal()}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleJoinOrder}
                  variant="orange"
                  size="lg"
                  className="w-full text-lg py-6"
                >
                  Join Group Order
                </Button>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CreditCard className="w-4 h-4" />
                    <span>Secure payment via PayNow/GrabPay</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    <span>Real-time order updates</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>100% authentic merchandise guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Status Tracker */}
            <Card className="card-gomflow">
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {product.orderSteps.map((step, index) => (
                    <div key={step.step} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        step.completed ? 'bg-gomflow-success text-white' :
                        step.current ? 'bg-orange text-orange-foreground' :
                        'bg-gomflow-gray-medium text-muted-foreground'
                      }`}>
                        {step.completed ? <Check className="w-4 h-4" /> : step.step}
                      </div>
                      <span className={`${
                        step.current ? 'font-semibold text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;