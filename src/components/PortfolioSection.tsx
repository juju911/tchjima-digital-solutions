import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, ExternalLink, Globe, Smartphone, Palette, Settings, TrendingUp, Users, Calendar } from "lucide-react";

// Import portfolio images - Real projects
import projectAgrichain from "@/assets/project-agrichain.jpg";
import projectCihabitat from "@/assets/project-cihabitat.jpg";
import projectFupa from "@/assets/project-fupa.jpg";
import projectFoire from "@/assets/project-foire.jpg";
import projectSeka from "@/assets/project-seka.jpg";
import projectOasis from "@/assets/project-oasis.jpg";

const portfolioCategories = [
  {
    icon: Settings,
    title: "Applications SaaS",
    color: "from-blue-500 to-purple-600",
    bgColor: "bg-blue-500/10",
    projects: [
      {
        name: "AgriChain+",
        description: "Plateforme SaaS de gestion agricole avec IA pour prévoir la demande et gérer les stocks",
        tech: "React, Node.js, Intelligence Artificielle",
        result: "↗ Réduction de 30% des pertes",
        image: projectAgrichain,
        url: "https://agrichain.konetchjima.com"
      },
      {
        name: "Site École et Gestion",
        description: "Plateforme éducative avec système d'inscription et gestion des formations",
        tech: "Vue.js, Laravel, Base de données",
        result: "2000+ étudiants inscrits",
        image: projectFupa,
        url: "https://ecole.konetchjima.com"
      }
    ]
  },
  {
    icon: Globe,
    title: "Sites Vitrines", 
    color: "from-pink-500 to-orange-500", 
    bgColor: "bg-pink-500/10",
    projects: [
      {
        name: "Agence Immobilière CI Habitat",
        description: "Site vitrine corporate pour entreprise immobilière avec gestion de projets intégrée",
        tech: "React, CMS, Design Responsive",
        result: "↗ 50+ projets présentés",
        image: projectCihabitat,
        url: "https://cihabitat.konetchjima.com"
      },
      {
        name: "Oasis de la Maternité",
        description: "Site vitrine pour clinique de maternité avec suivi médical complet et prise de rendez-vous",
        tech: "React, Node.js, Design UX/UI",
        result: "500+ mamans accompagnées",
        image: projectOasis,
        url: "https://oasismaternite.konetchjima.com"
      }
    ]
  },
  {
    icon: Palette,
    title: "Landing Pages",
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-500/10", 
    projects: [
      {
        name: "La Foire aux Écoles",
        description: "Site événementiel avec système d'inscription et compte à rebours interactif",
        tech: "HTML5, CSS3, JavaScript",
        result: "Événement organisé avec succès",
        image: projectFoire,
        url: "https://foire.konetchjima.com"
      },
      {
        name: "Seka C. Vanessa",
        description: "Landing page élégante pour créatrice de mode traditionnelle africaine",
        tech: "Design UX/UI, Photographie",
        result: "Art vestimentaire sublimé",
        image: projectSeka,
        url: "https://sekavanessa.konetchjima.com"
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
                    
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    </div>
                    
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
                        
                        {project.url && (
                          <Button 
                            onClick={() => window.open(project.url, '_blank')}
                            className="w-full mt-4"
                            variant="outline"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Voir le site
                          </Button>
                        )}
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