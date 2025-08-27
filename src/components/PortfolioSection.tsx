import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, ExternalLink } from "lucide-react";

const PortfolioSection = () => {
  const handleViewProjects = () => {
    window.open('https://wa.me/2250566997785?text=Bonjour, je souhaite voir vos réalisations et discuter de mon projet.', '_blank');
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <FolderOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez mes réalisations récentes
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-elegant hover-lift gradient-primary text-white">
            <CardContent className="p-8 md:p-12 text-center">
              <FolderOpen className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">
                Demandez mes réalisations
              </h3>
              <p className="text-lg opacity-90 mb-8 leading-relaxed">
                Je serais ravi de vous présenter mes projets récents et de discuter de la façon dont je peux vous aider à concrétiser vos idées.
              </p>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={handleViewProjects}
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg hover:scale-105 transition-smooth"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Voir mes projets
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;