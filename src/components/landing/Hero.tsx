import { Shield, Mic, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-white" />
            <span className="text-white/90 text-sm">Trusted by women worldwide</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
            Your Voice,
            <br />
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Your Safety
            </span>
          </h1>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Emergency help activated by your voice in English or Swahili. 
            Instant alerts, live location sharing, and nearby safe spaces.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button 
              variant="safe" 
              size="xl" 
              onClick={onGetStarted}
              className="shadow-glow"
            >
              <Shield className="w-6 h-6 mr-2" />
              Get Protected Now
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Mic className="w-6 h-6 mr-2" />
              Try Voice Demo
            </Button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-center gap-3 text-white/90">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </div>
              <span>Voice Activation</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white/90">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <span>Live Location</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white/90">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <span>Instant Alerts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;