import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Code2 } from "lucide-react";
import ParticleSystem from "./ParticleSystem";
import tchijimaPortrait from "@/assets/tchjima-kone-portrait.jpg";

const HeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-mesh"></div>
      <ParticleSystem />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <Code2 className="h-16 w-16 text-primary floating-animation" style={{ animationDelay: '0s' }} />
      </div>
      <div className="absolute top-40 right-16 opacity-20">
        <Sparkles className="h-12 w-12 text-accent floating-animation" style={{ animationDelay: '2s' }} />
      </div>
      <div className="absolute bottom-40 left-20 opacity-20">
        <Sparkles className="h-10 w-10 text-primary floating-animation" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Freelance Digital Expert
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-gradient leading-tight">
              Je donne vie à vos projets digitaux !
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Développeur Web/Mobile, Designer UX/UI & Gestionnaire de projet basé à Abidjan
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="gradient-primary text-white px-8 py-4 text-lg hover-glow pulse-glow group"
              >
                <Sparkles className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                Demander un devis gratuit
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open('https://wa.me/2250566997785?text=Bonjour, je viens de votre site et je souhaite discuter de mon projet.', '_blank')}
                className="px-8 py-4 text-lg glass-card hover:bg-primary hover:text-white transition-bounce"
              >
                WhatsApp
              </Button>
            </div>
          </div>
          
          {/* Image Content */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Glowing background */}
              <div className="absolute inset-0 gradient-primary rounded-full blur-3xl opacity-20 scale-110"></div>
              
              {/* Image container */}
              <div className="relative z-10 p-1 rounded-full gradient-primary">
                <div className="bg-background rounded-full p-2">
                  <img 
                    src={tchijimaPortrait}
                    alt="Tchjima KONE - Freelance Digital Expert"
                    className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-floating hover-lift"
                    onError={(e) => {
                      console.log('Image loading error');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass-card rounded-full px-4 py-2 floating-animation">
                <span className="text-sm font-semibold text-primary">UX/UI</span>
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card rounded-full px-4 py-2 floating-animation" style={{ animationDelay: '1s' }}>
                <span className="text-sm font-semibold text-accent">Dev</span>
              </div>
              <div className="absolute top-1/2 -right-8 glass-card rounded-full px-3 py-1 floating-animation" style={{ animationDelay: '2s' }}>
                <span className="text-xs font-semibold">PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-xs text-muted-foreground mb-2">Découvrir</span>
          <ArrowDown className="h-6 w-6 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;