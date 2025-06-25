
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { HoverButton } from "@/components/ui/hover-button";

const Profile = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch neighborhoods from the database
  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        // Get unique neighborhoods from both sales and rental tables
        const [salesResponse, rentalsResponse] = await Promise.all([
          supabase
            .from('undervalued_sales')
            .select('neighborhood')
            .not('neighborhood', 'is', null),
          supabase
            .from('undervalued_rentals')
            .select('neighborhood')
            .not('neighborhood', 'is', null)
        ]);

        const allNeighborhoods = new Set<string>();
        
        if (salesResponse.data) {
          salesResponse.data.forEach(item => {
            if (item.neighborhood) allNeighborhoods.add(item.neighborhood);
          });
        }
        
        if (rentalsResponse.data) {
          rentalsResponse.data.forEach(item => {
            if (item.neighborhood) allNeighborhoods.add(item.neighborhood);
          });
        }

        setNeighborhoods(Array.from(allNeighborhoods).sort());
      } catch (error) {
        console.error('Error fetching neighborhoods:', error);
      }
    };

    fetchNeighborhoods();
  }, []);

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    
    setIsResettingPassword(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/`,
      });
      
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Password reset email sent",
          description: "Check your email for password reset instructions.",
        });
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleNeighborhood = (neighborhood: string) => {
    setSelectedNeighborhoods(prev => 
      prev.includes(neighborhood) 
        ? prev.filter(n => n !== neighborhood)
        : [...prev, neighborhood]
    );
  };

  const filteredNeighborhoods = neighborhoods.filter(neighborhood =>
    neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user || !userProfile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 tracking-tighter">
            Profile
          </h1>
          <p className="text-gray-400 text-lg tracking-tight">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-8">
          {/* Account Information */}
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
            <h2 className="text-2xl font-semibold mb-6 tracking-tight">Account Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 tracking-tight">
                  Name
                </label>
                <div className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-full text-white tracking-tight text-lg">
                  {userProfile.name}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 tracking-tight">
                  Email Address
                </label>
                <div className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-full text-white tracking-tight text-lg">
                  {user.email}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 tracking-tight">
                  Password
                </label>
                <div className="relative">
                  <div className="w-full px-4 py-4 pr-12 bg-gray-800/50 border-2 border-gray-700 rounded-full text-white tracking-tight text-lg">
                    {showPassword ? "password123" : "••••••••"}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <button
                  onClick={handlePasswordReset}
                  disabled={isResettingPassword}
                  className="mt-2 text-blue-400 hover:text-blue-300 transition-colors text-sm tracking-tight"
                >
                  {isResettingPassword ? "Sending..." : "Reset Password"}
                </button>
              </div>
            </div>
          </div>

          {/* Email Preferences */}
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
            <h2 className="text-2xl font-semibold mb-6 tracking-tight">Email Preferences</h2>
            <p className="text-gray-400 mb-6 tracking-tight">
              Select the neighborhoods you want to receive deal alerts for:
            </p>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Search neighborhoods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-full text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all tracking-tight"
              />
            </div>

            <div className="max-h-60 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {filteredNeighborhoods.map((neighborhood) => (
                  <button
                    key={neighborhood}
                    onClick={() => toggleNeighborhood(neighborhood)}
                    className={`px-4 py-2 rounded-full text-sm tracking-tight transition-all ${
                      selectedNeighborhoods.includes(neighborhood)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {neighborhood}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Subscription Plan */}
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
            <h2 className="text-2xl font-semibold mb-6 tracking-tight">Subscription Plan</h2>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium tracking-tight capitalize">
                  {userProfile.subscription_plan || 'Free'} Plan
                </p>
                <p className="text-gray-400 text-sm tracking-tight">
                  {userProfile.subscription_plan === 'unlimited' 
                    ? 'Access to all deals and features' 
                    : 'Limited to 3 deals per day'
                  }
                </p>
              </div>
              
              <Link to="/pricing">
                <HoverButton className="text-white font-semibold tracking-tight">
                  Manage Subscription
                </HoverButton>
              </Link>
            </div>
          </div>

          {/* Sign Out */}
          <div className="flex justify-center pt-8">
            <button
              onClick={handleSignOut}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium tracking-tight transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
