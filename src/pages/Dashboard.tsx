import { useState, useEffect } from "react";
import { Shield, Phone, MapPin, Mic, Users, Settings, AlertTriangle, Plus, Edit, Trash2, MicIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VoiceRecognition from "@/components/emergency/VoiceRecognition";
import EmergencyContacts from "@/components/emergency/EmergencyContacts";
import SafeMap from "@/components/emergency/SafeMap";
import EmergencyAlert from "@/components/emergency/EmergencyAlert";

const Dashboard = () => {
  const [isListening, setIsListening] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const emergencyStats = {
    contactsCount: 3,
    nearbyPlaces: 12,
    voiceEnabled: true,
    lastActivity: "2 days ago"
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Shield },
    { id: "contacts", label: "Emergency Contacts", icon: Phone },
    { id: "map", label: "Safe Locations", icon: MapPin },
    { id: "voice", label: "Voice Settings", icon: Mic },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Salama Dada
                </h1>
                <p className="text-sm text-muted-foreground">Stay safe, stay connected</p>
              </div>
            </div>
            
            {/* Emergency Button */}
            <Button
              variant="emergency"
              size="emergency"
              className="pulse-on-active"
              onClick={() => setEmergencyActive(true)}
            >
              <AlertTriangle className="w-8 h-8" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <tab.icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Emergency Contacts</span>
                  <Badge variant="secondary">{emergencyStats.contactsCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Nearby Safe Places</span>
                  <Badge variant="secondary">{emergencyStats.nearbyPlaces}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Voice Recognition</span>
                  <Badge variant={emergencyStats.voiceEnabled ? "default" : "destructive"}>
                    {emergencyStats.voiceEnabled ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <Card className="bg-gradient-hero text-white">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-2">Welcome to Your Safety Dashboard</h2>
                    <p className="text-white/90 mb-4">
                      Your voice-activated emergency system is ready. Say "help", "emergency", or "nisaidieni" to activate.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="safe" onClick={() => setActiveTab("voice")}>
                        <MicIcon className="w-4 h-4 mr-2" />
                        Test Voice Recognition
                      </Button>
                      <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                        View Tutorial
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Voice Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mic className="w-5 h-5" />
                        Voice Recognition Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <VoiceRecognition 
                        isListening={isListening}
                        onListeningChange={setIsListening}
                        onEmergencyTrigger={() => setEmergencyActive(true)}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Nearby Safe Locations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">🚓 Police Stations</span>
                          <Badge>3 nearby</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">🏥 Hospitals</span>
                          <Badge>5 nearby</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">🛡️ Safe Spaces</span>
                          <Badge>4 nearby</Badge>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => setActiveTab("map")}>
                          View Full Map
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "contacts" && <EmergencyContacts />}
            {activeTab === "map" && <SafeMap />}
            
            {activeTab === "voice" && (
              <Card>
                <CardHeader>
                  <CardTitle>Voice Recognition Settings</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Configure your voice triggers and test the recognition system.
                  </p>
                </CardHeader>
                <CardContent>
                  <VoiceRecognition 
                    isListening={isListening}
                    onListeningChange={setIsListening}
                    onEmergencyTrigger={() => setEmergencyActive(true)}
                    showSettings
                  />
                </CardContent>
              </Card>
            )}

            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Language Preferences</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">English</Button>
                        <Button variant="outline" className="w-full justify-start">Kiswahili</Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Privacy Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        Your location and emergency contacts are only shared during active emergencies.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Alert Modal */}
      {emergencyActive && (
        <EmergencyAlert 
          isActive={emergencyActive}
          onDeactivate={() => setEmergencyActive(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
