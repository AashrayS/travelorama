
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransportCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  type: string;
  seats: number;
  transmission: string;
}

const TransportCard = ({
  id,
  title,
  location,
  price,
  rating,
  image,
  type,
  seats,
  transmission,
}: TransportCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="group overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/transport/${id}`} className="block h-full">
        <div className="relative h-48 overflow-hidden rounded-t-xl">
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
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <h3 className="font-semibold text-white text-shadow">{title}</h3>
          </div>
        </div>
        
        <div className="p-4 bg-card">
          <div className="flex justify-between items-start">
            <p className="text-sm text-muted-foreground">{location}</p>
            <div className="flex items-center text-sm">
              <Star size={14} className="fill-yellow-400 stroke-yellow-400 mr-1" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground">
              {type}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground">
              <Users size={12} className="mr-1" />
              {seats} seats
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground">
              {transmission}
            </span>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border">
            <p className="font-semibold">
              ${price} <span className="text-sm font-normal text-muted-foreground">day</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TransportCard;
