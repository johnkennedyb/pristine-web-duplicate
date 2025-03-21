
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Building2, 
  Plus, 
  Home, 
  Users, 
  Bell, 
  MessageSquare,
  Settings,
  LogOut,
  Heart,
  DollarSign,
  List,
  Activity,
  UserRound,
  Shield
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import BuyerDashboard from "@/components/dashboard/BuyerDashboard";
import OwnerDashboard from "@/components/dashboard/OwnerDashboard";
import AgentDashboard from "@/components/dashboard/AgentDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import SettingsPanel from "@/components/dashboard/SettingsPanel";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Default role to buyer if not authenticated
  const role = user?.role || "buyer";

  const renderDashboardContent = () => {
    if (activeTab === "settings") {
      return <SettingsPanel />;
    }
    
    switch (role) {
      case "buyer":
        return <BuyerDashboard activeTab={activeTab} />;
      case "owner":
        return <OwnerDashboard activeTab={activeTab} />;
      case "agent":
        return <AgentDashboard activeTab={activeTab} />;
      case "admin":
        return <AdminDashboard activeTab={activeTab} />;
      default:
        return <BuyerDashboard activeTab={activeTab} />;
    }
  };

  const handleLogout = () => {
    logout();
  };

  // Mock user data when no user is authenticated
  const mockUser = user || {
    name: "Guest User",
    role: "buyer",
    avatar: "https://res.cloudinary.com/dw7w2at8k/image/upload/v1736785538/ed060b47018885c4c6847048f8a83758_qgbypi.png"
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <Link to="/" className="flex items-center space-x-2">
              <img src="https://res.cloudinary.com/dw7w2at8k/image/upload/v1741631701/jugyahblack.5fadb514_sdcgzu.svg" alt="" />
            </Link>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <Link to="/profile" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src={mockUser.avatar || "https://via.placeholder.com/40"} 
                alt={mockUser.name} 
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h5 className="font-medium">{mockUser.name}</h5>
                <p className="text-xs text-gray-500 capitalize">{mockUser.role}</p>
              </div>
            </Link>
          </div>
          
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "overview" ? "bg-gray-100" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Overview
            </Button>
            
            {/* Add Property Link available to all users */}
            <Link to="/add-property" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Property
              </Button>
            </Link>
            
            {(role === "buyer" || !user) && (
              <>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === "favorites" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveTab("favorites")}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Favorites
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === "search" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveTab("search")}
                >
                  <List className="mr-2 h-5 w-5" />
                  Property Search
                </Button>
              </>
            )}
            
            {(role === "owner" || role === "agent") && (
              <>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === "properties" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveTab("properties")}
                >
                  <Home className="mr-2 h-5 w-5" />
                  My Properties
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === "listings" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveTab("listings")}
                >
                  <List className="mr-2 h-5 w-5" />
                  Listings
                </Button>
              </>
            )}
            
            {role === "agent" && (
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeTab === "clients" ? "bg-gray-100" : ""}`}
                onClick={() => setActiveTab("clients")}
              >
                <Users className="mr-2 h-5 w-5" />
                Clients
              </Button>
            )}
            
            {role === "admin" && (
              <>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === "users" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveTab("users")}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Users
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === "analytics" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveTab("analytics")}
                >
                  <Activity className="mr-2 h-5 w-5" />
                  Analytics
                </Button>
                <Link to="/admin" className="block">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    Admin Portal
                  </Button>
                </Link>
              </>
            )}
            
            <Link to="/messages" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Messages
              </Button>
            </Link>
            
            <Link to="/notifications" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </Button>
            </Link>
            
            <Link to="/profile" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <UserRound className="mr-2 h-5 w-5" />
                Profile
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "settings" ? "bg-gray-100" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            {user ? (
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign Out
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/login')}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Link to="/add-property">
              <Button className="bg-black hover:bg-black/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Property
              </Button>
            </Link>
          </div>
          
          {renderDashboardContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
