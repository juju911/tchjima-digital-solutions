import { Card, CardContent } from "@/components/ui/card";
import { User, Target, Lightbulb, Award } from "lucide-react";

const stats = [
  { icon: Target, value: "50+", label: "Projets réalisés en Côte d'Ivoire" },
  { icon: Award, value: "100%", label: "Satisfaction client" },
  { icon: Lightbulb, value: "8+", label: "Ans d'expérience IT" },
];

const AboutSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 gradient-mesh opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary mb-6 shadow-glow">
              <User className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Qui suis-je ?</h2>
            <div className="w-24 h-1 gradient-accent mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Card className="glass-card shadow-floating hover-lift border-0">
                <CardContent className="p-8 md:p-12">
                  <div className="text-lg leading-relaxed space-y-6">
                    <p className="text-2xl font-light text-foreground">
                      Je suis <span className="text-gradient font-bold">Tchjima KONE</span>, développeur web freelance Côte d'Ivoire basé à Abidjan, passionné par l'innovation technologique et expert en cybersécurité.
                    </p>
                    
                    <p className="text-muted-foreground">
                      Avec <strong>8 ans d'expérience</strong> dans le développement web & mobile Abidjan, le design UX/UI freelance et la gestion de projet IT, j'accompagne les entreprises ivoiriennes dans leur transformation digitale. Certifié <strong>CSCU (Certified Secure Computer User)</strong>, <strong>CND (Computer Network Defense)</strong> et <strong>SOC (Security Operations Center)</strong>, actuellement en formation <strong>PMP (Project Management Professional)</strong>.
                    </p>
                    
                    <p className="text-muted-foreground">
                      Spécialisé en SEO et intégration paiement en ligne Abidjan, j'ai accompagné plusieurs entrepreneurs et startups en Côte d'Ivoire : sites vitrines optimisés, plateformes e-commerce avec mobile money, applications mobiles performantes et projets intégrant chatbot IA.
                    </p>
                    
                    <div className="p-6 rounded-2xl gradient-primary text-white mt-8">
                      <p className="font-medium text-lg">
                        Mon objectif : créer des solutions digitales performantes, sécurisées et adaptées aux besoins spécifiques des entreprises ivoiriennes, tout en respectant les standards internationaux de cybersécurité et de gestion de projet.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Stats sidebar */}
            <div className="space-y-6">
              {stats.map((stat, index) => (
                <Card key={index} className="glass-card hover-lift border-0 shadow-glass">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mb-4">
                      <stat.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Call to action card */}
              <Card className="gradient-accent text-white hover-glow border-0">
                <CardContent className="p-6 text-center">
                  <Lightbulb className="h-8 w-8 mx-auto mb-4 opacity-90" />
                  <p className="font-semibold mb-2">Une idée de projet ?</p>
                  <p className="text-sm opacity-90">Discutons-en ensemble !</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;