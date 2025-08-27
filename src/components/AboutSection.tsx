import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <User className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Qui suis-je ?</h2>
          </div>
          
          <Card className="shadow-elegant hover-lift">
            <CardContent className="p-8 md:p-12">
              <div className="text-lg leading-relaxed text-muted-foreground space-y-6">
                <p>
                  Je suis <span className="text-primary font-semibold">Tchjima KONE</span>, freelance digital basé à Abidjan, passionné par l'innovation technologique et le design.
                </p>
                
                <p>
                  Mon parcours m'a permis d'évoluer à la fois comme développeur web/mobile, designer UX/UI et gestionnaire de projet digital, ce qui me donne une vision globale et polyvalente des besoins numériques.
                </p>
                
                <p>
                  J'ai accompagné plusieurs entrepreneurs, startups et entreprises dans la mise en place de solutions modernes : sites vitrines, e-commerce, applications mobiles, maquettes interactives et projets intégrant chatbot et IA.
                </p>
                
                <p className="text-primary font-medium">
                  Mon objectif est clair : créer des outils digitaux qui ne sont pas seulement beaux, mais surtout utiles, performants et alignés sur vos objectifs business.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;