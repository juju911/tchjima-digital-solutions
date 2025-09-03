import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, ExternalLink, Globe, Smartphone, Palette, Settings, TrendingUp, Users, Calendar } from "lucide-react";

const portfolioCategories = [
  {
    icon: Globe,
    title: "Développement Web & Mobile",
    color: "from-blue-500 to-purple-600",
    bgColor: "bg-blue-500/10",
    projects: [
      {
        name: "Plateforme E-commerce",
        description: "Site e-commerce complet avec paiement mobile et gestion de stock",
        tech: "React, Node.js, Stripe",
        result: "↗ +150% de ventes en ligne"
      },
      {
        name: "Application Mobile SaaS",
        description: "App de gestion d'entreprise avec tableaux de bord temps réel",
        tech: "Flutter, Firebase",
        result: "500+ utilisateurs actifs"
      },
      {
        name: "Site Vitrine Corporate",
        description: "Site web moderne avec CMS et optimisation SEO",
        tech: "React, TypeScript",
        result: "Position #1 Google"
      }
    ]
  },
  {
    icon: Palette,
    title: "UX/UI Design",
    color: "from-pink-500 to-orange-500", 
    bgColor: "bg-pink-500/10",
    projects: [
      {
        name: "Refonte UX Application Fintech",
        description: "Redesign complet d'une app de paiement mobile",
        tech: "Figma, Adobe XD",
        result: "↗ +40% engagement utilisateur"
      },
      {
        name: "Design System Startup",
        description: "Création d'un design system évolutif multi-produits",
        tech: "Figma, Storybook",
        result: "Temps de dev divisé par 3"
      },
      {
        name: "Maquettes E-learning",
        description: "Interface moderne pour plateforme de formation en ligne",
        tech: "Figma, Prototyping",
        result: "Taux de complétion +60%"
      }
    ]
  },
  {
    icon: Settings,
    title: "Gestion de Projet Digital",
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-500/10", 
    projects: [
      {
        name: "Digitalisation PME (15 employés)",
        description: "Migration complète vers des outils numériques collaboratifs",
        tech: "Jira, Slack, Google Workspace",
        result: "Productivité +35%"
      },
      {
        name: "Lancement Startup Tech",
        description: "Accompagnement MVP à la mise sur le marché en 4 mois",
        tech: "Agile, Scrum",
        result: "Délai respecté à 100%"
      },
      {
        name: "Projet Gouvernemental",
        description: "Coordination équipe de 12 dev sur plateforme citoyenne",
        tech: "Project Management",
        result: "50k+ utilisateurs lancés"
      }
    ]
  }
];

const PortfolioSection = () => {
  const handleViewProjects = () => {
    window.open('https://wa.me/2250566997785?text=Bonjour, je viens de votre portfolio et je souhaite discuter de mon projet.', '_blank');
  };

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 gradient-primary rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 gradient-accent rounded-full opacity-10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <FolderOpen className="h-4 w-4 mr-2" />
            Réalisations
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Découvrez quelques-unes de mes réalisations récentes et les résultats obtenus pour mes clients.
          </p>
        </div>
        
        <div className="space-y-12">
          {portfolioCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center mb-8">
                <div className={`p-3 rounded-2xl ${category.bgColor} mr-4`}>
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gradient">{category.title}</h3>
              </div>
              
              {/* Projects Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {category.projects.map((project, index) => (
                  <Card key={index} className="group hover-lift shadow-floating border-0 glass-card overflow-hidden relative">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    <CardHeader className="relative z-10">
                      <CardTitle className="text-lg font-bold mb-2">{project.name}</CardTitle>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="relative z-10">
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs font-medium text-muted-foreground mb-1">Technologies</div>
                          <div className="text-sm font-medium">{project.tech}</div>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-accent mr-2" />
                            <span className="text-sm font-medium text-accent">{project.result}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="inline-block glass-card border-0 shadow-floating max-w-2xl">
            <CardContent className="p-8">
              <FolderOpen className="h-12 w-12 mx-auto mb-4 text-primary opacity-80" />
              <h3 className="text-2xl font-bold mb-4 text-gradient">
                Vous voulez voir plus de détails ?
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Je serais ravi de vous présenter mes projets en détail et de discuter de la façon dont je peux vous aider à concrétiser vos idées.
              </p>
              <Button 
                onClick={handleViewProjects}
                className="gradient-primary text-white hover-glow px-8 py-4"
                size="lg"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Demander mes réalisations complètes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;