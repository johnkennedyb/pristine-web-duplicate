
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Property, formatPrice } from '@/lib/data';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const getStatusColor = () => {
    switch (property.features.status) {
      case 'for-sale':
        return 'bg-estate-primary text-white';
      case 'for-rent':
        return 'bg-estate-secondary text-estate-dark';
      case 'sold':
        return 'bg-red-500 text-white';
      case 'pending':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-estate-primary text-white';
    }
  };

  const getStatusText = () => {
    switch (property.features.status) {
      case 'for-sale':
        return 'For Sale';
      case 'for-rent':
        return 'For Rent';
      case 'sold':
        return 'Sold';
      case 'pending':
        return 'Pending';
      default:
        return 'For Sale';
    }
  };

  return (
    <div 
      ref={cardRef}
      className={cn(
        "property-card h-full overflow-hidden rounded-xl transition-all duration-500 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16",
        `transition-delay-${index * 100 > 500 ? 500 : index * 100}`,
        "hover:shadow-md"
      )}
      style={{ 
        transitionDelay: `${Math.min(index * 75, 500)}ms`,
      }}
    >
      <Link to={`/property/${property.id}`} className="group flex flex-col h-full">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <div 
            className={cn(
              "blur-load",
              isImageLoaded && "loaded"
            )}
            style={{ backgroundImage: `url(${property.images[0]}?blur=200&w=50)` }}
          >
            <img 
              src={property.images[0]} 
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              onLoad={handleImageLoad}
            />
          </div>
          
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <span className={cn("tag", getStatusColor())}>
              {getStatusText()}
            </span>
            {property.featured && (
              <span className="tag bg-estate-secondary text-estate-dark">
                Featured
              </span>
            )}
          </div>
          
          <button 
            onClick={toggleFavorite}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full transition-colors",
              isFavorite ? "bg-red-500 text-white" : "bg-white text-gray-500 hover:text-red-500"
            )}
          >
            <Heart size={18} fill={isFavorite ? "white" : "none"} />
          </button>
          
          <div className="absolute bottom-3 left-3">
            <span className="tag bg-black/70 text-white">
              {property.features.propertyType.charAt(0).toUpperCase() + property.features.propertyType.slice(1)}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center gap-1 text-estate-gray mb-2">
            <MapPin size={16} />
            <span className="text-sm truncate">
              {property.location.city}, {property.location.state}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 line-clamp-1 group-hover:text-estate-primary transition-colors">
            {property.title}
          </h3>
          
          <p className="text-estate-gray text-sm mb-4 line-clamp-2 flex-grow">
            {property.description}
          </p>
          
          <div className="flex items-center justify-between border-t border-estate-lightGray pt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-estate-gray">
                <Bed size={16} />
                <span className="text-sm">{property.features.bedrooms} BHK</span>
              </div>
              <div className="flex items-center gap-1 text-estate-gray">
                <Bath size={16} />
                <span className="text-sm">{property.features.bathrooms}</span>
              </div>
              <div className="flex items-center gap-1 text-estate-gray">
                <Square size={16} />
                <span className="text-sm">{property.features.area} sq ft</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="font-semibold text-lg text-estate-primary">
              {formatPrice(property.price)}
            </div>
            <Button variant="outline" size="sm" className="text-xs border-estate-primary text-estate-primary hover:bg-estate-primary hover:text-white">
              View Details
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
