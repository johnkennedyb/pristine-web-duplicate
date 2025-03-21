
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  Building2, 
  ArrowLeft, 
  Home, 
  MapPin, 
  DollarSign, 
  Bed, 
  Bath, 
  Square, 
  Upload, 
  Plus, 
  X, 
  CheckCircle2,
  Circle,
  Check
} from "lucide-react";
import { propertyTypes } from "@/lib/data";

const AddProperty = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [status, setStatus] = useState("for-sale");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [featured, setFeatured] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const newImageUrls = fileArray.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImageUrls]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This would connect to Supabase in a real app
      // For now, just simulate a successful property creation
      
      const propertyData = {
        title,
        description,
        price: parseFloat(price),
        features: {
          propertyType,
          status,
          bedrooms: parseInt(bedrooms),
          bathrooms: parseInt(bathrooms),
          area: parseInt(area)
        },
        location: {
          street,
          city,
          state,
          zipCode
        },
        featured,
        images
      };
      
      console.log("Creating property:", propertyData);
      
      // Simulate API delay
      setTimeout(() => {
        toast({
          title: "Property Added",
          description: "Your property has been successfully listed."
        });
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error adding property:", error);
      toast({
        title: "Error",
        description: "There was a problem adding your property.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index} 
            className="flex items-center"
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index + 1 === currentStep
                  ? 'bg-black text-white'
                  : index + 1 < currentStep
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1 < currentStep ? (
                <Check size={16} />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            {index < totalSteps - 1 && (
              <div 
                className={`w-20 h-1 ${
                  index + 1 < currentStep ? 'bg-black' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const renderStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Basic Information";
      case 2:
        return "Property Details";
      case 3:
        return "Location";
      case 4:
        return "Property Images";
      case 5:
        return "Review and Submit";
      default:
        return "";
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g. Modern Apartment in Downtown"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Describe your property in detail..."
                className="min-h-32"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <Input 
                  id="price" 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  placeholder="e.g. 250000"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <select
                id="propertyType"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="">Select Type</option>
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Listing Status</Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Bed className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input 
                    id="bedrooms" 
                    type="number" 
                    value={bedrooms} 
                    onChange={(e) => setBedrooms(e.target.value)} 
                    placeholder="e.g. 3"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Bath className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input 
                    id="bathrooms" 
                    type="number" 
                    value={bathrooms} 
                    onChange={(e) => setBathrooms(e.target.value)} 
                    placeholder="e.g. 2"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Area (sq ft)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Square className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input 
                    id="area" 
                    type="number" 
                    value={area} 
                    onChange={(e) => setArea(e.target.value)} 
                    placeholder="e.g. 1500"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="featured" 
                  checked={featured} 
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <Label htmlFor="featured">Feature this property (shows in featured section)</Label>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input 
                id="street" 
                value={street} 
                onChange={(e) => setStreet(e.target.value)} 
                placeholder="e.g. 123 Main St"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  placeholder="e.g. New York"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input 
                  id="state" 
                  value={state} 
                  onChange={(e) => setState(e.target.value)} 
                  placeholder="e.g. NY"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input 
                  id="zipCode" 
                  value={zipCode} 
                  onChange={(e) => setZipCode(e.target.value)} 
                  placeholder="e.g. 10001"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="images"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <p className="mb-1 font-medium">Click to upload images</p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 10MB each)</p>
              </label>
            </div>
            
            {images.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Property image ${index + 1}`}
                      className="h-32 w-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Property Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Basic Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Title:</span>
                      <span className="font-medium">{title || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">${price || "0"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium capitalize">{status.replace('-', ' ') || "Not specified"}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Property Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">{propertyType || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bedrooms:</span>
                      <span className="font-medium">{bedrooms || "0"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bathrooms:</span>
                      <span className="font-medium">{bathrooms || "0"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Area:</span>
                      <span className="font-medium">{area || "0"} sq ft</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Location</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-medium">{street || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">City:</span>
                    <span className="font-medium">{city || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">State:</span>
                    <span className="font-medium">{state || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Zip Code:</span>
                    <span className="font-medium">{zipCode || "Not specified"}</span>
                  </div>
                </div>
              </div>
              
              {images.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Images</h4>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Property preview ${index + 1}`}
                        className="h-16 w-full object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center text-gray-500 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-xl font-semibold">Add New Property</h1>
          </div>
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-black" strokeWidth={2.5} />
            <span className="font-bold text-xl">FindHome</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">{renderStepTitle()}</h2>
          
          {renderStepIndicator()}
          
          <form onSubmit={currentStep === totalSteps ? handleSubmit : (e) => e.preventDefault()}>
            {renderStepContent()}
            
            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                >
                  Previous
                </Button>
              ) : (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
              )}
              
              {currentStep < totalSteps ? (
                <Button 
                  type="button" 
                  className="bg-black hover:bg-black/90 text-white"
                  onClick={nextStep}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="bg-black hover:bg-black/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Property"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
