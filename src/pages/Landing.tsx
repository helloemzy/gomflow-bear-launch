import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, CheckCircle, TrendingUp, Star, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import bearMascot from "@/assets/bear-mascot.png";
import newjeansAlbum from "@/assets/newjeans-album.jpg";
import btsLightstick from "@/assets/bts-lightstick.jpg";
import twicePhotobook from "@/assets/twice-photobook.jpg";

const Landing = () => {
  const [ordersProcessed, setOrdersProcessed] = useState(12847);
  const [timeSaved, setTimeSaved] = useState(2569);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrdersProcessed(prev => prev + Math.floor(Math.random() * 3));
      setTimeSaved(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const trendingOrders = [
    {
      id: 1,
      title: "NewJeans - 'Get Up' Special Album",
      gom: "KpopCollectorSG",
      progress: 85,
      ordersLeft: 3,
      timeLeft: "2h 15m",
      isHot: true,
      image: newjeansAlbum
    },
    {
      id: 2,
      title: "BTS Official Light Stick Ver. 4",
      gom: "ArmyMalaysia",
      progress: 92,
      ordersLeft: 2,
      timeLeft: "45m",
      isHot: true,
      image: btsLightstick
    },
    {
      id: 3,
      title: "TWICE - Formula of Love Photobook",
      gom: "OncePH",
      progress: 67,
      ordersLeft: 8,
      timeLeft: "6h 30m",
      isHot: false,
      image: twicePhotobook
    }
  ];

  const testimonials = [
    {
      name: "Sarah - KpopCollectorSG",
      earnings: "$2,150",
      quote: "From spending 20 hours on spreadsheets to 10 minutes on GOMFlow. I've earned $2,150 this month while helping fellow fans get their merch!"
    },
    {
      name: "Mike - ArmyMalaysia",
      earnings: "$1,890",
      quote: "The automated payment tracking changed everything. No more chasing payments or losing track of orders."
    },
    {
      name: "Lisa - OncePH",
      earnings: "$3,200",
      quote: "My highest earning month yet! GOMFlow made it so easy to scale my group orders."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              AUTOMATING THE MANUAL CHAOS OF
              <span className="text-orange"> GROUP ORDER PURCHASING</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              From 20 hours of spreadsheet hell to 10 minutes of simplicity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/auth">
                <Button variant="orange" size="lg" className="text-lg px-8 py-4">
                  Start Free
                </Button>
              </Link>
              <Link to="/orders">
                <Button variant="orange-ghost" size="lg" className="text-lg px-8 py-4">
                  See Live Orders
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <img 
                src={bearMascot} 
                alt="GOMFlow Bear Mascot" 
                className="w-64 h-64 md:w-80 md:h-80 animate-float"
              />
              <div className="absolute -top-4 -right-4 badge-hot animate-bounce-gentle">
                HOT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Counter Section */}
      <section className="bg-gomflow-gray-light py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-around items-center gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange">{ordersProcessed.toLocaleString()}</div>
              <div className="text-muted-foreground">Orders Processed Today</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange">{timeSaved.toLocaleString()}</div>
              <div className="text-muted-foreground">Hours Saved This Month</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange">98.5%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Orders Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            #gomflowTRENDING
          </h2>
          <p className="text-xl text-muted-foreground">
            Live feed of hottest group orders right now
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingOrders.map((order) => (
            <Card key={order.id} className="card-gomflow hover-lift">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <img 
                    src={order.image} 
                    alt={order.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  {order.isHot && (
                    <div className="badge-hot">HOT</div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg mb-2">{order.title}</CardTitle>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-gomflow-success" />
                  <span className="text-sm text-muted-foreground">{order.gom}</span>
                  <div className="badge-verified">VERIFIED</div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{order.progress}% filled</span>
                      <span>{order.ordersLeft} spots left</span>
                    </div>
                    <div className="progress-orange h-2">
                      <div 
                        className="progress-orange-fill h-full"
                        style={{ width: `${order.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{order.timeLeft} left</span>
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
      </section>

      {/* Before/After Comparison */}
      <section className="bg-gomflow-gray-light py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              The Old Way vs The GOMFlow Way
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before */}
            <Card className="card-gomflow">
              <CardHeader>
                <CardTitle className="text-2xl text-destructive">Before: Spreadsheet Hell</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <span>20+ hours per order managing spreadsheets</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <span>Chasing payments through multiple platforms</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <span>Manual inventory tracking and mistakes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <span>Lost orders and angry customers</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* After */}
            <Card className="card-gomflow">
              <CardHeader>
                <CardTitle className="text-2xl text-gomflow-success">After: GOMFlow Magic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gomflow-success" />
                    <span>10 minutes to set up automated order</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gomflow-success" />
                    <span>Automatic payment tracking and reminders</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gomflow-success" />
                    <span>Real-time inventory and progress updates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gomflow-success" />
                    <span>Happy customers and higher earnings</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            GOM Success Stories
          </h2>
          <p className="text-xl text-muted-foreground">
            Real earnings from real Group Order Managers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-gomflow hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-orange text-orange" />
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange">{testimonial.earnings}</div>
                    <div className="text-sm text-muted-foreground">This month</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange to-orange-hover py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-orange-foreground mb-4">
                Ready to Transform Your Group Orders?
              </h2>
              <p className="text-xl text-orange-foreground/80 mb-6">
                Join thousands of GOMs who've automated their business
              </p>
              <Link to="/auth">
                <Button variant="orange" size="lg" className="bg-gradient-to-r from-orange to-orange-hover font-bold px-8 py-4 shadow-lg transform hover:scale-105 transition-all duration-500">
                  Start Your Free Trial
                </Button>
              </Link>
            </div>
            <div className="flex-shrink-0">
              <img 
                src={bearMascot} 
                alt="GOMFlow Bear" 
                className="w-32 h-32 md:w-48 md:h-48 animate-bounce-gentle"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;