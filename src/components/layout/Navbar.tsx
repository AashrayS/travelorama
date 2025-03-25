
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, Home, Car, Building, MapPin, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">StayBeyond</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              <span className="flex items-center gap-1.5"><Home size={18} /> Home</span>
            </Link>
            <Link to="/listings" className={`nav-link ${isActive('/listings') ? 'active' : ''}`}>
              <span className="flex items-center gap-1.5"><Building size={18} /> Stays</span>
            </Link>
            <Link to="/transport-listings" className={`nav-link ${isActive('/transport-listings') ? 'active' : ''}`}>
              <span className="flex items-center gap-1.5"><Car size={18} /> Transport</span>
            </Link>
            <Link to="/community" className={`nav-link ${isActive('/community') ? 'active' : ''}`}>
              <span className="flex items-center gap-1.5"><MapPin size={18} /> Discover</span>
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback>{getInitials(user.user_metadata?.display_name || user.email?.split('@')[0] || 'U')}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.user_metadata?.display_name || user.email?.split('@')[0]}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/account')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">Log in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth?tab=signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>
          
          <button 
            className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass animate-slide-in">
          <div className="px-4 py-6 space-y-4">
            <Link 
              to="/" 
              className={`flex items-center p-3 rounded-lg ${isActive('/') ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
            >
              <Home className="mr-3" size={20} />
              Home
            </Link>
            <Link 
              to="/listings" 
              className={`flex items-center p-3 rounded-lg ${isActive('/listings') ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
            >
              <Building className="mr-3" size={20} />
              Stays
            </Link>
            <Link 
              to="/transport-listings" 
              className={`flex items-center p-3 rounded-lg ${isActive('/transport-listings') ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
            >
              <Car className="mr-3" size={20} />
              Transport
            </Link>
            <Link 
              to="/community" 
              className={`flex items-center p-3 rounded-lg ${isActive('/community') ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
            >
              <MapPin className="mr-3" size={20} />
              Discover
            </Link>
            
            <div className="pt-4 border-t border-border">
              {user ? (
                <>
                  <Link to="/account" className="flex items-center p-3 rounded-lg hover:bg-secondary">
                    <User className="mr-3" size={20} />
                    Profile
                  </Link>
                  <button 
                    onClick={handleSignOut} 
                    className="flex items-center p-3 rounded-lg w-full text-left hover:bg-secondary"
                  >
                    <LogOut className="mr-3" size={20} />
                    Log out
                  </button>
                </>
              ) : (
                <div className="pt-4 flex flex-col space-y-3">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/auth">Log in</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/auth?tab=signup">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
