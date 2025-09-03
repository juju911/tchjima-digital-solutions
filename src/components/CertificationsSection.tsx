import { Card, CardContent } from "@/components/ui/card";
import { Award, Shield, Brain, Users } from "lucide-react";

const certifications = [
  {
    icon: Award,
    title: "MASTER EN GENIE LOGICIEL",
    issuer: "Formation Universitaire",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-500/10",
    description: "Formation approfondie en ingénierie logicielle"
  },
  {
    icon: Shield,
    title: "CSCU (Certified Secure Computer User)",
    issuer: "EC-Council",
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-500/10",
    description: "Certification en sécurité informatique"
  },
  {
    icon: Brain,
    title: "10 Compétences en Intelligence Artificielle",
    issuer: "NYS AFRICA", 
    color: "from-blue-500 to-purple-600",
    bgColor: "bg-blue-500/10",
    description: "Maîtrise des technologies IA modernes"
  },
  {
    icon: Users,
    title: "Suivi-évaluation de projets de développement",
    issuer: "CAMPUS GROUPE AFD",
    color: "from-green-500 to-teal-500", 
    bgColor: "bg-green-500/10",
    description: "Gestion et évaluation de projets"
  },
  {
    icon: Award,
    title: "Défendre les droits humains à l'ère de l'IA",
    issuer: "NYS AFRICA",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    description: "Éthique et IA responsable"
  }
];

const CertificationsSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 right-10 w-32 h-32 gradient-accent rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 gradient-primary rounded-full opacity-10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Award className="h-4 w-4 mr-2" />
            Certifications & Formations
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
            Expertise Certifiée
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Une formation continue pour rester à la pointe des technologies et offrir des solutions d'excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {certifications.map((cert, index) => (
            <Card 
              key={index}
              className="group hover-lift shadow-floating border-0 glass-card overflow-hidden relative text-center"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <CardContent className="p-6 relative z-10">
                <div className={`mx-auto mb-4 p-3 rounded-2xl ${cert.bgColor} group-hover:scale-110 transition-transform duration-300 w-fit`}>
                  <cert.icon className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="font-bold text-lg mb-2 leading-tight">
                  {cert.title}
                </h3>
                
                <div className="text-sm font-medium text-accent mb-3">
                  {cert.issuer}
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>
                
                <div className="mt-4 p-2 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-center justify-center">
                    <Award className="h-4 w-4 text-primary mr-1" />
                    <span className="text-xs font-medium text-primary">Certifié</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;