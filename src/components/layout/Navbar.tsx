import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, Bell, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import SearchBar from "@/components/SearchBar";
import GlobalSearch from "@/components/GlobalSearch";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className={`w-full transition-colors duration-300 z-10 ${isHome ? "absolute" : "bg-background border-b"}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`text-2xl font-bold ${isHome ? "text-white" : "text-foreground"}`}>StayBeyond</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <GlobalSearch />
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {user ? (
              <>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/saved">
                    <Heart size={20} />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell size={20} />
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/account">My Account</Link>
                </Button>
                <Button variant="default" onClick={handleSignOut}>Sign Out</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth?tab=register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Search on Home */}
        {isHome && isMobile && (
          <div className="mt-4">
            <SearchBar isHero={true} />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <GlobalSearch />
              
              <Link to="/listings" className="p-2 hover:bg-accent rounded">
                All Listings
              </Link>
              <Link to="/transport-listings" className="p-2 hover:bg-accent rounded">
                Transport
              </Link>
              <Link to="/community" className="p-2 hover:bg-accent rounded">
                Community
              </Link>
              
              {user ? (
                <>
                  <Link to="/account" className="p-2 hover:bg-accent rounded flex items-center">
                    <User size={18} className="mr-2" />
                    My Account
                  </Link>
                  <Link to="/saved" className="p-2 hover:bg-accent rounded flex items-center">
                    <Heart size={18} className="mr-2" />
                    Saved Items
                  </Link>
                  <Button className="w-full" onClick={handleSignOut}>Sign Out</Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/auth?tab=register">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
