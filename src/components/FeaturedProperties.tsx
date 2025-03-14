
import { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import PropertyCard from './PropertyCard';
import { Link } from 'react-router-dom';
import { getFeaturedProperties } from '@/lib/data';

const FeaturedProperties = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const featuredProperties = getFeaturedProperties();

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="section bg-estate-light py-16 md:py-24">
      <div className="container">
        <div 
          className={cn(
            "mb-12 transition-all duration-1000 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <span className="inline-block px-3 py-1 bg-estate-primary/10 text-estate-primary rounded-full mb-2 text-sm font-medium">
                Featured Properties
              </span>
              <h2 className="section-title">Discover Our Featured Listings</h2>
              <p className="section-subtitle">
                Explore our handpicked selection of premium properties that stand out for their exceptional features and prime locations.
              </p>
            </div>
            <Link to="/properties">
              <Button variant="outline" className="border-estate-primary text-estate-primary hover:bg-estate-primary hover:text-white gap-2">
                View All Properties
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProperties.map((property, index) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
