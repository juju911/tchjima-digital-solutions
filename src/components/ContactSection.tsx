import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Send, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Sauvegarder le contact dans la base de données
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subject: 'Demande de devis depuis le site'
        });

      if (dbError) {
        console.error('Erreur sauvegarde DB:', dbError);
        throw new Error('Erreur lors de la sauvegarde');
      }

      // Envoyer l'email via la fonction SMTP
      const { data, error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subject: 'Nouvelle demande de devis depuis le site'
        }
      });

      if (emailError) {
        console.error('Erreur envoi email:', emailError);
        throw new Error('Erreur lors de l\'envoi de l\'email');
      }

      // Afficher le message de succès
      toast({
        title: "Message envoyé avec succès !",
        description: "Votre demande a bien été transmise. Je vous recontacterai rapidement.",
      });

      // Optionnel: Ouvrir WhatsApp comme méthode alternative
      const whatsappMessage = `Nouvelle demande de devis depuis le site:
      
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}
Message: ${formData.message}`;

      const whatsappUrl = `https://wa.me/2250566997785?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Proposer WhatsApp en complément
      setTimeout(() => {
        if (window.confirm("Voulez-vous également m'envoyer un message WhatsApp ?")) {
          window.open(whatsappUrl, '_blank');
        }
      }, 1000);

      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
      
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur lors de l'envoi",
        description: "Une erreur s'est produite. Merci de réessayer ou de me contacter directement.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Discutons de votre projet
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Prêt à donner vie à vos idées ? Contactez-moi pour un devis gratuit
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Demander un devis gratuit</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+225 XX XX XX XX XX"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Décrivez votre projet</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Parlez-moi de votre projet, vos besoins, vos objectifs..."
                    rows={4}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full gradient-primary text-white hover:scale-105 transition-smooth shadow-elegant"
                  disabled={isSubmitting}
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Votre message sera envoyé par email sécurisé. Vous recevrez optionnellement une redirection vers WhatsApp.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;