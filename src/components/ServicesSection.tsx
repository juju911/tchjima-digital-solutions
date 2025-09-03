import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Palette, Settings, ArrowRight, Smartphone, Globe, Bot, Figma, Users, Calendar, Brain, CreditCard, Search, FileText, Layers, Monitor } from "lucide-react";

const services = [
  {
    icon: Code,
    color: "from-blue-500 to-purple-600",
    bgColor: "bg-blue-500/10",
    title: "Développement Web & Mobile",
    description: "Solutions complètes : sites vitrines, e-commerce, applications mobiles, logiciels SaaS",
    features: [
      { icon: Globe, text: "Sites vitrines & e-commerce" },
      { icon: Smartphone, text: "Applications mobiles (Flutter)" },
      { icon: Bot, text: "Logiciels SaaS personnalisés" },
      { icon: Search, text: "SEO & optimisation" },
      { icon: CreditCard, text: "Intégration de paiement" }
    ],
    languages: "HTML5, CSS3, JavaScript, ReactJS, TypeScript, Flutter",
    price: "À partir de 500k FCFA"
  },
  {
    icon: Brain,
    color: "from-purple-500 to-blue-600",
    bgColor: "bg-purple-500/10",
    title: "Intelligence Artificielle",
    description: "Chatbots intelligents, automatisation et analyse de données avancée",
    features: [
      { icon: Bot, text: "Chatbots conversationnels" },
      { icon: Settings, text: "Automatisation de processus" },
      { icon: FileText, text: "Analyse de données" },
      { icon: Smartphone, text: "WhatsApp Business API" },
      { icon: Brain, text: "Solutions IA personnalisées" }
    ],
    languages: "Python, TensorFlow, OpenAI API, Machine Learning",
    price: "À partir de 300k FCFA"
  },
  {
    icon: Palette,
    color: "from-pink-500 to-orange-500",
    bgColor: "bg-pink-500/10",
    title: "UX/UI Design",
    description: "Maquettes, prototypes interactifs et design systems modernes",
    features: [
      { icon: Figma, text: "Maquettes haute fidélité" },
      { icon: Layers, text: "Prototypes interactifs" },
      { icon: Users, text: "Expérience utilisateur" },
      { icon: Palette, text: "Design systems" },
      { icon: Monitor, text: "Interfaces adaptatives" }
    ],
    languages: "Adobe XD, Figma, Photoshop, InDesign",
    price: "À partir de 200k FCFA"
  },
  {
    icon: Settings,
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-500/10",
    title: "Gestion de projet digital",
    description: "Planification Agile, coordination d'équipes et suivi-évaluation complet",
    features: [
      { icon: Calendar, text: "Planification Agile" },
      { icon: Users, text: "Coordination d'équipes" },
      { icon: FileText, text: "Suivi-évaluation" },
      { icon: Settings, text: "Accompagnement complet" },
      { icon: ArrowRight, text: "Livraison dans les délais" }
    ],
    languages: "Jira, Trello, Microsoft Project, Pack Office",
    price: "Sur devis"
  }
];

const ServicesSection = () => {
  const handleDiscussProject = () => {
    window.open('https://wa.me/2250566997785?text=Bonjour, je viens de votre portfolio et je souhaite discuter de mon projet.', '_blank');
  };

  const handleCustomQuote = () => {
    window.open('https://wa.me/2250566997785?text=Bonjour, je souhaiterais obtenir un devis personnalisé pour mon projet.', '_blank');
  };

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 gradient-primary rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 gradient-accent rounded-full opacity-10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Settings className="h-4 w-4 mr-2" />
            Services Premium
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">Mes Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Une expertise complète au service de vos ambitions digitales. De la conception à la réalisation, je vous accompagne à chaque étape.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover-lift shadow-floating border-0 glass-card overflow-hidden relative"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <CardHeader className="text-center pb-6 relative z-10">
                <div className={`mx-auto mb-6 p-4 rounded-2xl ${service.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold mb-2">{service.title}</CardTitle>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="space-y-4 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center group/item">
                      <div className="p-2 rounded-lg bg-accent/10 mr-3 group-hover/item:bg-accent/20 transition-colors">
                        <feature.icon className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-sm font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-border/50">
                  <div className="mb-4">
                    <div className="text-xs font-medium text-muted-foreground mb-2">Technologies</div>
                    <div className="text-sm text-foreground leading-relaxed">{service.languages}</div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-lg text-gradient">{service.price}</span>
                  </div>
                  
                  <Button 
                    onClick={handleDiscussProject}
                    className="w-full group/btn hover-glow"
                    variant="outline"
                  >
                    <span>Discuter du projet</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="inline-block glass-card border-0 shadow-floating">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-gradient">Projet sur mesure ?</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Chaque projet est unique. Parlons de vos besoins spécifiques pour une solution parfaitement adaptée.
              </p>
              <Button onClick={handleCustomQuote} className="gradient-primary text-white hover-glow">
                <Bot className="h-4 w-4 mr-2" />
                Demander un devis personnalisé
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;