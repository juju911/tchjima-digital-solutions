import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-5"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
            Je donne vie à vos projets digitaux !
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Développeur Web/Mobile, Designer UX/UI & Gestionnaire de projet basé à Abidjan
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="gradient-primary text-white px-8 py-4 text-lg hover:scale-105 transition-smooth shadow-elegant"
            >
              Demander un devis gratuit
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('https://wa.me/2250566997785?text=Bonjour, je viens de votre site et je souhaite discuter de mon projet.', '_blank')}
              className="px-8 py-4 text-lg hover:bg-primary hover:text-white transition-smooth"
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-primary" />
      </div>
    </section>
  );
};

export default HeroSection;