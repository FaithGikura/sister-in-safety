import { useState, useEffect } from "react";
import { MapPin, Navigation, Shield, Phone, Building2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SafeLocation {
  id: string;
  name: string;
  type: "police" | "hospital" | "safe_space";
  address: string;
  distance: string;
  phone?: string;
  isVerified: boolean;
  hours: string;
}

const SafeMap = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Mock safe locations data
  const safeLocations: SafeLocation[] = [
    {
      id: "1",
      name: "Central Police Station",
      type: "police",
      address: "123 Main Street, Downtown",
      distance: "0.5 km",
      phone: "+1-555-POLICE",
      isVerified: true,
      hours: "24/7"
    },
    {
      id: "2", 
      name: "City General Hospital",
      type: "hospital",
      address: "456 Health Avenue",
      distance: "1.2 km",
      phone: "+1-555-HOSPITAL",
      isVerified: true,
      hours: "24/7"
    },
    {
      id: "3",
      name: "Women's Shelter & Support Center",
      type: "safe_space",
      address: "789 Safety Street",
      distance: "0.8 km",
      phone: "+1-555-SHELTER",
      isVerified: true,
      hours: "24/7 Hotline"
    },
    {
      id: "4",
      name: "Community Safety Center",
      type: "safe_space", 
      address: "321 Community Lane",
      distance: "1.5 km",
      phone: "+1-555-COMMUNITY",
      isVerified: true,
      hours: "8 AM - 10 PM"
    },
    {
      id: "5",
      name: "North District Hospital",
      type: "hospital",
      address: "654 North Road",
      distance: "2.1 km",
      phone: "+1-555-NORTH",
      isVerified: true,
      hours: "24/7"
    }
  ];

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "police": return "🚓";
      case "hospital": return "🏥";
      case "safe_space": return "🛡️";
      default: return "📍";
    }
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case "police": return "text-blue-600";
      case "hospital": return "text-red-600";
      case "safe_space": return "text-green-600";
      default: return "text-muted-foreground";
    }
  };

  const filteredLocations = selectedFilter === "all" 
    ? safeLocations 
    : safeLocations.filter(location => location.type === selectedFilter);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const callLocation = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const getDirections = (address: string) => {
    const query = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/${query}`, '_blank');
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Safe Locations Near You</CardTitle>
              <p className="text-sm text-muted-foreground">
                Find nearby police stations, hospitals, and verified safe spaces
              </p>
            </div>
            <Button onClick={requestLocation} variant="outline">
              <Navigation className="w-4 h-4 mr-2" />
              Update Location
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("all")}
            >
              <Filter className="w-4 h-4 mr-2" />
              All Locations
            </Button>
            <Button
              variant={selectedFilter === "police" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("police")}
            >
              🚓 Police
            </Button>
            <Button
              variant={selectedFilter === "hospital" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("hospital")}
            >
              🏥 Hospitals
            </Button>
            <Button
              variant={selectedFilter === "safe_space" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("safe_space")}
            >
              🛡️ Safe Spaces
            </Button>
          </div>

          {/* Mock Map Area */}
          <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10" />
            <div className="text-center z-10">
              <MapPin className="w-12 h-12 mx-auto mb-2 text-primary" />
              <p className="text-muted-foreground">Interactive Map View</p>
              <p className="text-sm text-muted-foreground">
                {userLocation ? "Location updated" : "Click 'Update Location' to enable map"}
              </p>
            </div>
            
            {/* Mock location pins */}
            <div className="absolute top-1/4 left-1/4 text-2xl animate-bounce">🚓</div>
            <div className="absolute top-1/3 right-1/3 text-2xl animate-bounce" style={{ animationDelay: "0.5s" }}>🏥</div>
            <div className="absolute bottom-1/3 left-1/2 text-2xl animate-bounce" style={{ animationDelay: "1s" }}>🛡️</div>
          </div>

          {/* Locations List */}
          <div className="space-y-3">
            {filteredLocations.map((location) => (
              <Card key={location.id} className="transition-all hover:shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-2xl">{getLocationIcon(location.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{location.name}</h3>
                          {location.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{location.address}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>📍 {location.distance}</span>
                          <span>🕒 {location.hours}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {location.phone && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => callLocation(location.phone!)}
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => getDirections(location.address)}
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Instructions */}
      <Card className="bg-emergency/5 border-emergency/20">
        <CardContent className="p-4">
          <h3 className="font-medium text-emergency mb-2">🚨 In Case of Emergency</h3>
          <div className="text-sm space-y-1">
            <p>• Call local emergency services first (911, 999, etc.)</p>
            <p>• Use the nearest safe location as a meeting point for help</p>
            <p>• Share your location with trusted contacts</p>
            <p>• If safe to do so, head to the nearest verified location</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafeMap;