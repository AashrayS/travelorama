
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Home, Car, Building, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
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
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">Masterplan</span>
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
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
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
              <Link to="/account" className="flex items-center p-3 rounded-lg hover:bg-secondary">
                <User className="mr-3" size={20} />
                Account
              </Link>
            </div>
            
            <div className="pt-4 flex flex-col space-y-3">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
