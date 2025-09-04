import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budgetRange: string;
  description: string;
  timeline: string;
}

const QuoteForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budgetRange: "",
    description: "",
    timeline: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof QuoteFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
      const { error } = await supabase
        .from('quotes')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          project_type: formData.projectType,
          budget_range: formData.budgetRange,
          description: formData.description,
          timeline: formData.timeline,
          source: 'website'
        });

      if (error) throw error;

      // Send email notification via edge function
      try {
        const { error: emailError } = await supabase.functions.invoke('send-quote-notification', {
          body: formData
        });
        
        if (emailError) {
          console.log('Email notification failed:', emailError);
        }
      } catch (emailError) {
        console.log('Email notification failed:', emailError);
      }

      // Construct WhatsApp message
      const message = `Nouvelle demande de devis:
📝 Nom: ${formData.name}
📧 Email: ${formData.email}
📱 Téléphone: ${formData.phone}
🏢 Entreprise: ${formData.company}
🎯 Type de projet: ${formData.projectType}
💰 Budget: ${formData.budgetRange}
⏰ Délai: ${formData.timeline}

📋 Description:
${formData.description}`;

      // Open WhatsApp
      const whatsappUrl = `https://wa.me/2250747225488?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Demande envoyée avec succès !",
        description: "Votre devis a été enregistré et envoyé par email sécurisé. Je vous recontacterai rapidement.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        budgetRange: "",
        description: "",
        timeline: ""
      });

    } catch (error) {
      console.error('Error submitting quote:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-card border-0 shadow-floating">
      <CardHeader className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-4 mx-auto">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gradient">Demande de devis gratuit</CardTitle>
        <p className="text-muted-foreground">
          Parlez-moi de votre projet et recevez un devis personnalisé sous 24h
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Votre nom et prénom"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+225 XX XX XX XX XX"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Entreprise</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                placeholder="Nom de votre entreprise"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectType">Type de projet *</Label>
              <Select onValueChange={(value) => handleChange("projectType", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="site-vitrine">Site vitrine</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="application-mobile">Application mobile</SelectItem>
                  <SelectItem value="ux-ui-design">UX/UI Design</SelectItem>
                  <SelectItem value="cybersecurite">Cybersécurité</SelectItem>
                  <SelectItem value="gestion-projet">Gestion de projet IT</SelectItem>
                  <SelectItem value="seo">SEO & Référencement</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget estimé</Label>
              <Select onValueChange={(value) => handleChange("budgetRange", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Votre budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="moins-500k">Moins de 500k FCFA</SelectItem>
                  <SelectItem value="500k-1m">500k - 1M FCFA</SelectItem>
                  <SelectItem value="1m-2m">1M - 2M FCFA</SelectItem>
                  <SelectItem value="2m-5m">2M - 5M FCFA</SelectItem>
                  <SelectItem value="plus-5m">Plus de 5M FCFA</SelectItem>
                  <SelectItem value="a-definir">À définir</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline">Délai souhaité</Label>
            <Select onValueChange={(value) => handleChange("timeline", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Quand souhaitez-vous livrer ?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Urgent (moins d'1 mois)</SelectItem>
                <SelectItem value="1-2-mois">1-2 mois</SelectItem>
                <SelectItem value="3-6-mois">3-6 mois</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description du projet *</Label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Décrivez votre projet, vos objectifs, fonctionnalités souhaitées..."
              className="min-h-[120px]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 gradient-primary text-white hover-glow"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Envoyer la demande
                </>
              )}
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <MessageCircle className="h-4 w-4 inline mr-1" />
            Votre demande sera envoyée par email sécurisé. WhatsApp s'ouvrira également pour une discussion directe.
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuoteForm;