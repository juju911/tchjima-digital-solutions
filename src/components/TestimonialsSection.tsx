import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Adama TRAORE",
    role: "CEO, TechStart Abidjan",
    company: "Startup Fintech",
    rating: 5,
    text: "Tchjima a transformé notre idée en une application mobile performante. Son expertise technique et sa capacité à respecter les délais sont remarquables. Nous avons gagné 6 mois sur notre mise sur le marché !",
    project: "Application de paiement mobile"
  },
  {
    name: "Marie KOUADIO",
    role: "Directrice Marketing",
    company: "Groupe SANIA",
    rating: 5,
    text: "Le redesign de notre site e-commerce a dépassé nos attentes. Les ventes en ligne ont augmenté de 150% en 3 mois. Tchjima comprend vraiment les enjeux business derrière chaque projet.",
    project: "Refonte site e-commerce"
  },
  {
    name: "Jean-Baptiste KONE",
    role: "Fondateur",
    company: "EduTech CI",
    rating: 5,
    text: "Accompagnement exceptionnel de A à Z. Tchjima nous a aidés à structurer notre projet, gérer l'équipe de développement et livrer dans les temps. Un vrai chef de projet digital !",
    project: "Plateforme e-learning"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 right-20 w-32 h-32 gradient-primary rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 left-20 w-40 h-40 gradient-accent rounded-full opacity-10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Quote className="h-4 w-4 mr-2" />
            Témoignages Clients
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
            Ce que disent mes clients
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            La satisfaction client est au cœur de mon travail. Voici quelques retours de mes collaborations récentes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group hover-lift shadow-floating border-0 glass-card overflow-hidden relative"
            >
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="h-12 w-12 text-primary" />
              </div>
              
              <CardContent className="p-6 relative z-10">
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Testimonial text */}
                <blockquote className="text-sm leading-relaxed text-foreground mb-6">
                  "{testimonial.text}"
                </blockquote>
                
                {/* Project tag */}
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                  {testimonial.project}
                </div>
                
                {/* Client info */}
                <div className="pt-4 border-t border-border/50">
                  <div className="font-bold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs font-medium text-accent">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;