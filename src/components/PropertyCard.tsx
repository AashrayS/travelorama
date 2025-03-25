
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  type: string;
  isFeatured?: boolean;
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  rating,
  image,
  type,
  isFeatured = false
}: PropertyCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <div className={cn(
      "group overflow-hidden rounded-xl transition-all duration-300",
      "hover:shadow-lg hover:-translate-y-1",
      isFeatured ? "col-span-1 md:col-span-2 lg:col-span-2" : ""
    )}>
      <Link to={`/property/${id}`} className="block h-full">
        <div className="relative h-56 overflow-hidden rounded-t-xl">
          <div className="fade-in-image h-full">
            <img
              src={image}
              alt={title}
              className={cn(
                "h-full w-full object-cover transition-transform duration-500",
                "group-hover:scale-105",
                isLoaded ? "loaded" : ""
              )}
              onLoad={() => setIsLoaded(true)}
            />
          </div>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white shadow-sm z-10 transition-colors"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={18} 
              className={cn(
                "transition-colors",
                isFavorite ? "fill-red-500 stroke-red-500" : "stroke-foreground"
              )} 
            />
          </button>
          
          {isFeatured && (
            <div className="absolute top-3 left-3 px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-full">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-4 bg-card">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-foreground line-clamp-1">{title}</h3>
            <div className="flex items-center text-sm">
              <Star size={14} className="fill-yellow-400 stroke-yellow-400 mr-1" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-1">{location}</p>
          <p className="text-sm text-muted-foreground mt-1">{type}</p>
          
          <div className="mt-3 pt-3 border-t border-border">
            <p className="font-semibold">
              ${price} <span className="text-sm font-normal text-muted-foreground">night</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
