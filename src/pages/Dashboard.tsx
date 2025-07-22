import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users, 
  Package, 
  MessageSquare,
  Download,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trophy,
  Calendar,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import bearMascot from "@/assets/bear-mascot.png";
import newjeansAlbum from "@/assets/newjeans-album.jpg";
import btsLightstick from "@/assets/bts-lightstick.jpg";
import twicePhotobook from "@/assets/twice-photobook.jpg";

const Dashboard = () => {
  const [todaysEarnings, setTodaysEarnings] = useState(285.50);
  const [monthlyEarnings, setMonthlyEarnings] = useState(2150.75);
  const [activeOrders, setActiveOrders] = useState(7);
  const [completedOrders, setCompletedOrders] = useState(127);

  useEffect(() => {
    const interval = setInterval(() => {
      setTodaysEarnings(prev => prev + (Math.random() * 10));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const activeOrdersData = [
    {
      id: 1,
      title: "NewJeans - 'Get Up' Special Album",
      image: newjeansAlbum,
      progress: 85,
      ordersNeeded: 50,
      ordersFilled: 42,
      timeLeft: "2h 15m",
      earnings: "$1,176.00",
      status: "active",
      isClosingSoon: true
    },
    {
      id: 2,
      title: "BTS Official Light Stick Ver. 4",
      image: btsLightstick,
      progress: 92,
      ordersNeeded: 25,
      ordersFilled: 23,
      timeLeft: "45m",
      earnings: "$920.00",
      status: "active",
      isClosingSoon: true
    },
    {
      id: 3,
      title: "TWICE - Formula of Love Photobook",
      image: twicePhotobook,
      progress: 67,
      ordersNeeded: 30,
      ordersFilled: 20,
      timeLeft: "1d 6h",
      earnings: "$600.00",
      status: "active",
      isClosingSoon: false
    }
  ];

  const paymentData = [
    { name: "Sarah L.", status: "paid", amount: "$28.00", method: "PayNow", time: "2m ago" },
    { name: "Mike C.", status: "pending", amount: "$56.00", method: "GrabPay", time: "15m ago" },
    { name: "Lisa K.", status: "paid", amount: "$28.00", method: "PayNow", time: "1h ago" },
    { name: "David W.", status: "failed", amount: "$84.00", method: "Card", time: "2h ago" },
    { name: "Emma T.", status: "paid", amount: "$28.00", method: "PayNow", time: "3h ago" },
    { name: "James R.", status: "pending", amount: "$56.00", method: "GrabPay", time: "4h ago" },
    { name: "Anna S.", status: "paid", amount: "$28.00", method: "PayNow", time: "5h ago" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-gomflow-success text-white">Paid</Badge>;
      case "pending":
        return <Badge className="bg-gomflow-warning text-white">Pending</Badge>;
      case "failed":
        return <Badge className="bg-destructive text-white">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4 text-gomflow-success" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-gomflow-warning" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange to-orange-hover">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src={bearMascot} 
                alt="GOMFlow Bear" 
                className="w-16 h-16 animate-bounce-gentle"
              />
              <div>
                <h1 className="text-3xl font-bold text-orange-foreground">
                  My Orders Dashboard
                </h1>
                <p className="text-orange-foreground/80">
                  Welcome back! 👋
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/auth">
                <Button variant="orange" size="lg" className="bg-gradient-to-r from-orange to-orange-hover font-bold shadow-lg transform hover:scale-105 transition-all duration-500">
                  <Plus className="w-4 h-4 mr-2" />
                  Become a GOM
                </Button>
              </Link>
              <Link to="/orders">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Browse Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="card-dashboard">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Today's Earnings</p>
                      <p className="text-2xl font-bold text-orange">
                        ${todaysEarnings.toFixed(2)}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-orange" />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-dashboard">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">This Month</p>
                      <p className="text-2xl font-bold text-foreground">
                        ${monthlyEarnings.toFixed(2)}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-gomflow-success" />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-dashboard">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Orders</p>
                      <p className="text-2xl font-bold text-foreground">{activeOrders}</p>
                    </div>
                    <Package className="w-8 h-8 text-orange" />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-dashboard">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold text-foreground">{completedOrders}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-gomflow-success" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* My Orders */}
            <Card className="card-gomflow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>My Joined Orders</span>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {activeOrdersData.map((order) => (
                    <Card key={order.id} className="card-gomflow hover-lift">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <img 
                            src={order.image} 
                            alt={order.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm leading-tight mb-1">
                              {order.title}
                            </h3>
                            {order.isClosingSoon && (
                              <div className="badge-hot text-xs">
                                CLOSING SOON
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{order.ordersFilled}/{order.ordersNeeded}</span>
                              <span>{order.progress}%</span>
                            </div>
                            <div className="progress-orange h-2">
                              <div 
                                className="progress-orange-fill h-full"
                                style={{ width: `${order.progress}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{order.timeLeft}</span>
                            </div>
                            <div className="font-semibold text-orange">{order.earnings}</div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Link to={`/order/${order.id}`}>
                    <Button size="sm" variant="orange">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Tracker */}
            <Card className="card-gomflow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Payment Tracker</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" variant="orange">
                      Send Reminders
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentData.map((payment, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{payment.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(payment.status)}
                              {getStatusBadge(payment.status)}
                            </div>
                          </TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell className="text-muted-foreground">{payment.time}</TableCell>
                          <TableCell>
                            {payment.status === "pending" && (
                              <Button size="sm" variant="outline">
                                Remind
                              </Button>
                            )}
                            {payment.status === "failed" && (
                            <Button size="sm" variant="orange">
                              Retry
                            </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-orange" />
                  Your Ranking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange mb-2">#12</div>
                  <div className="text-sm text-muted-foreground">
                    Top GOM in Singapore
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time Saved */}
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gomflow-success" />
                  Time Saved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gomflow-success mb-2">
                    127h
                  </div>
                  <div className="text-sm text-muted-foreground">
                    This month
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-gomflow-success rounded-full"></div>
                    <span>New order: NewJeans album</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-orange rounded-full"></div>
                    <span>Payment received: $28.00</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-gomflow-warning rounded-full"></div>
                    <span>Order closing soon</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-gomflow-success rounded-full"></div>
                    <span>BTS order completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/gom-dashboard">
                  <Button variant="orange" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Become a GOM
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Updates
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Link to="/">
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View Public Page
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;