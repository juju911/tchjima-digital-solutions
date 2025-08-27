import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Zap, Globe, Users } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Freelance réactif et disponible",
    description: "Réponse rapide et flexibilité dans les horaires"
  },
  {
    icon: Users,
    title: "Polyvalence technique + design + gestion",
    description: "Une expertise complète pour vos projets"
  },
  {
    icon: Globe,
    title: "Solutions modernes et évolutives",
    description: "Technologies actuelles et architecture scalable"
  },
  {
    icon: CheckCircle,
    title: "Disponible à Abidjan et à distance",
    description: "Flexibilité géographique selon vos besoins"
  }
];

const WhySection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pourquoi travailler avec moi ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Les avantages d'une collaboration avec un freelance expérimenté
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover-lift shadow-elegant group text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 p-3 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-smooth w-fit">
                  <benefit.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2 text-sm leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;