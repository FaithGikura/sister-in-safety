import { useState } from "react";
import { Shield, Phone, MapPin, Mic, Users, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AuthModal from "@/components/auth/AuthModal";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import React from 'react';
import logo from './src/images/logo.png'; // Adjust the path based on where your image is

const Header: React.FC = () => {
    return (
        <header>
            <img src={logo} alt="Logo" />
        </header>
    );
};

export default Header;


const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const handleAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Salama Dada
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => handleAuth("login")}>
              Login
            </Button>
            <Button variant="hero" onClick={() => handleAuth("signup")}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <Hero onGetStarted={() => handleAuth("signup")} />
      <Features />
      
      {/* Quick Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Emergency Response</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl font-bold text-accent mb-2">2</div>
              <div className="text-muted-foreground">Language Support</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl font-bold text-success mb-2">100%</div>
              <div className="text-muted-foreground">Privacy Protected</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 animate-slide-up">
            Your Safety is Our Priority
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Join thousands of women who trust Sister in Safety for their emergency needs.
          </p>
          <Button 
            variant="safe" 
            size="xl" 
            onClick={() => handleAuth("signup")}
            className="animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Shield className="w-6 h-6 mr-2" />
            Start Your Safety Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Sister in Safety. Empowering women through technology.</p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </div>
  );
};

export default Index;
