
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, Star, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyHeaderProps {
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const PropertyHeader = ({
  title,
  location,
  rating,
  reviewCount,
  isFavorite,
  onToggleFavorite
}: PropertyHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="sm" asChild className="flex items-center">
          <Link to="/listings">
            <ArrowLeft size={16} className="mr-1" />
            Back to listings
          </Link>
        </Button>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="flex items-center">
            <Share2 size={16} className="mr-1" />
            Share
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center"
            onClick={onToggleFavorite}
          >
            <Heart 
              size={16} 
              className={cn(
                "mr-1 transition-colors",
                isFavorite ? "fill-red-500 stroke-red-500" : ""
              )} 
            />
            {isFavorite ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
      
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center">
          <Star size={16} className="fill-yellow-400 stroke-yellow-400 mr-1" />
          <span className="font-medium">{rating}</span>
          <span className="mx-1 text-muted-foreground">·</span>
          <span className="text-muted-foreground">{reviewCount} reviews</span>
        </div>
        
        <div className="flex items-center">
          <MapPin size={16} className="text-muted-foreground mr-1" />
          <span>{location}</span>
        </div>
      </div>
    </>
  );
};

export default PropertyHeader;
