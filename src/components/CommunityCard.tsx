
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommunityCardProps {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  author: {
    name: string;
    avatar: string;
  };
}

const CommunityCard = ({
  id,
  title,
  location,
  description,
  image,
  upvotes,
  downvotes,
  comments,
  author,
}: CommunityCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [voted, setVoted] = useState<'up' | 'down' | null>(null);
  const [voteCount, setVoteCount] = useState({ up: upvotes, down: downvotes });
  
  const handleVote = (e: React.MouseEvent, type: 'up' | 'down') => {
    e.preventDefault();
    
    if (voted === type) {
      setVoted(null);
      setVoteCount({
        ...voteCount,
        [type]: voteCount[type] - 1
      });
    } else {
      if (voted) {
        setVoteCount({
          up: voted === 'up' ? voteCount.up - 1 : type === 'up' ? voteCount.up + 1 : voteCount.up,
          down: voted === 'down' ? voteCount.down - 1 : type === 'down' ? voteCount.down + 1 : voteCount.down,
        });
      } else {
        setVoteCount({
          ...voteCount,
          [type]: voteCount[type] + 1
        });
      }
      setVoted(type);
    }
  };
  
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="relative h-48 md:h-full overflow-hidden">
          <div className="fade-in-image h-full">
            <img
              src={image}
              alt={title}
              className={cn(
                "h-full w-full object-cover",
                isLoaded ? "loaded" : ""
              )}
              onLoad={() => setIsLoaded(true)}
            />
          </div>
        </div>
        
        <div className="p-4 col-span-2">
          <Link to={`/place/${id}`} className="block">
            <h3 className="font-semibold text-lg hover:text-primary transition-colors">{title}</h3>
          </Link>
          
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <MapPin size={14} className="mr-1" />
            <span>{location}</span>
          </div>
          
          <p className="mt-3 text-sm line-clamp-3">{description}</p>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={author.avatar} 
                alt={author.name}
                className="w-8 h-8 rounded-full object-cover mr-2 border border-border"
              />
              <span className="text-sm font-medium">{author.name}</span>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={(e) => handleVote(e, 'up')}
                className={cn(
                  "flex items-center text-sm",
                  voted === 'up' ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <ThumbsUp size={14} className={cn("mr-1", voted === 'up' && "fill-primary")} />
                {voteCount.up}
              </button>
              
              <button 
                onClick={(e) => handleVote(e, 'down')}
                className={cn(
                  "flex items-center text-sm",
                  voted === 'down' ? "text-destructive" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <ThumbsDown size={14} className={cn("mr-1", voted === 'down' && "fill-destructive")} />
                {voteCount.down}
              </button>
              
              <Link to={`/place/${id}`} className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                <MessageSquare size={14} className="mr-1" />
                {comments}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
