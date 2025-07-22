import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import bearMascot from "@/assets/bear-mascot.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background/95 backdrop-blur border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={bearMascot} 
              alt="GOMFlow" 
              className="w-8 h-8 animate-bounce-gentle"
            />
            <span className="text-xl font-bold text-orange">GOMFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-orange ${
                isActive('/') ? 'text-orange' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/orders" 
              className={`text-sm font-medium transition-colors hover:text-orange ${
                isActive('/orders') ? 'text-orange' : 'text-muted-foreground'
              }`}
            >
              Browse Orders
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`text-sm font-medium transition-colors hover:text-orange ${
                    isActive('/dashboard') ? 'text-orange' : 'text-muted-foreground'
                  }`}
                >
                  My Orders
                </Link>
                <Link 
                  to="/gom-dashboard" 
                  className={`text-sm font-medium transition-colors hover:text-orange ${
                    isActive('/gom-dashboard') ? 'text-orange' : 'text-muted-foreground'
                  }`}
                >
                  GOM Dashboard
                </Link>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    {user.full_name || user.email}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="orange">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className={`text-sm font-medium ${
                  isActive('/') ? 'text-orange' : 'text-muted-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/orders" 
                className={`text-sm font-medium ${
                  isActive('/orders') ? 'text-orange' : 'text-muted-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Orders
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`text-sm font-medium ${
                      isActive('/dashboard') ? 'text-orange' : 'text-muted-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link 
                    to="/gom-dashboard" 
                    className={`text-sm font-medium ${
                      isActive('/gom-dashboard') ? 'text-orange' : 'text-muted-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    GOM Dashboard
                  </Link>
                  <div className="flex flex-col gap-2 pt-2 border-t">
                    <div className="text-sm text-muted-foreground">
                      {user.full_name || user.email}
                    </div>
                    <Button variant="outline" size="sm" onClick={handleSignOut} className="w-fit">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="orange" className="w-fit">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;