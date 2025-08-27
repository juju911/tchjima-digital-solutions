import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Palette, Settings } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Développement Web & Mobile",
    description: "Sites vitrines, e-commerce, applications mobiles, intégration IA, chatbot, WhatsApp Business",
    features: ["Sites web responsifs", "Applications mobiles", "E-commerce", "Intégration IA & Chatbot"]
  },
  {
    icon: Palette,
    title: "Design & UX/UI",
    description: "Interfaces modernes, maquettes interactives, expérience utilisateur optimisée",
    features: ["Design d'interface", "Maquettes interactives", "Expérience utilisateur", "Prototypage"]
  },
  {
    icon: Settings,
    title: "Gestion de projet digital",
    description: "Planification Agile, coordination technique, accompagnement complet",
    features: ["Méthode Agile", "Coordination technique", "Suivi de projet", "Accompagnement complet"]
  }
];

const ServicesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mes Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une approche complète pour tous vos besoins digitaux
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover-lift shadow-elegant group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-smooth">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="h-2 w-2 rounded-full bg-accent mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;