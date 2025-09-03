import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, MessageCircle, X, Minimize2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Salut ! Je suis l'assistant virtuel de Tchjima KONE. Je peux vous aider à découvrir ses services en développement web/mobile, IA, UX/UI design et gestion de projet. Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Knowledge base basée sur les informations du site
  const knowledgeBase = {
    services: [
      {
        name: "Développement Web & Mobile",
        description: "Solutions complètes : sites vitrines, e-commerce, applications mobiles, logiciels SaaS",
        technologies: "HTML5, CSS3, JavaScript, ReactJS, TypeScript, Flutter",
        price: "À partir de 500k FCFA",
        features: ["Sites vitrines & e-commerce", "Applications mobiles (Flutter)", "Logiciels SaaS personnalisés", "SEO & optimisation", "Intégration de paiement"]
      },
      {
        name: "Intelligence Artificielle",
        description: "Chatbots intelligents, automatisation et analyse de données avancée",
        technologies: "Python, TensorFlow, OpenAI API, Machine Learning",
        price: "À partir de 300k FCFA",
        features: ["Chatbots conversationnels", "Automatisation de processus", "Analyse de données", "WhatsApp Business API", "Solutions IA personnalisées"]
      },
      {
        name: "UX/UI Design",
        description: "Maquettes, prototypes interactifs et design systems modernes",
        technologies: "Adobe XD, Figma, Photoshop, InDesign",
        price: "À partir de 200k FCFA",
        features: ["Maquettes haute fidélité", "Prototypes interactifs", "Expérience utilisateur", "Design systems", "Interfaces adaptatives"]
      },
      {
        name: "Gestion de projet digital",
        description: "Planification Agile, coordination d'équipes et suivi-évaluation complet",
        technologies: "Jira, Trello, Microsoft Project, Pack Office",
        price: "Sur devis",
        features: ["Planification Agile", "Coordination d'équipes", "Suivi-évaluation", "Accompagnement complet", "Livraison dans les délais"]
      }
    ],
    certifications: [
      "CSCU (Certified Secure Computer User) By EC-Council",
      "Certificat en 10 Compétences en Intelligence Artificielle By NYS AFRICA",
      "Certificat en Suivi-évaluation de projets de développement By CAMPUS GROUPE AFD",
      "Formation : Défendre les droits humains à l'ère de l'intelligence artificielle By NYS AFRICA"
    ],
    contact: {
      whatsapp: "0566997785",
      email: "arnaservicesandcreatives@gmail.com",
      location: "Abidjan, Côte d'Ivoire"
    },
    about: "Tchjima KONE est un freelance basé à Abidjan, spécialisé en IA, développement web/mobile, UX/UI design et gestion de projet digital."
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Salutations
    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return "Bonjour ! Je suis ravi de vous aider. Tchjima KONE propose 4 services principaux : Développement Web/Mobile, Intelligence Artificielle, UX/UI Design, et Gestion de projet digital. Quel service vous intéresse ?";
    }
    
    // Questions sur les services
    if (message.includes('service') || message.includes('que fait')) {
      return `Tchjima KONE propose 4 services principaux :

🌐 **Développement Web & Mobile** (à partir de 500k FCFA)
- Sites vitrines, e-commerce, apps mobiles
- Technologies: React, Flutter, TypeScript

🧠 **Intelligence Artificielle** (à partir de 300k FCFA)  
- Chatbots, automatisation, analyse de données
- Technologies: Python, TensorFlow, OpenAI API

🎨 **UX/UI Design** (à partir de 200k FCFA)
- Maquettes, prototypes, design systems
- Outils: Figma, Adobe XD, Photoshop

⚙️ **Gestion de projet digital** (sur devis)
- Planification Agile, coordination d'équipes
- Outils: Jira, Trello, Microsoft Project

Quel service vous intéresse le plus ?`;
    }

    // Questions spécifiques par service
    if (message.includes('développement') || message.includes('web') || message.includes('mobile') || message.includes('site')) {
      const service = knowledgeBase.services[0];
      return `🌐 **Développement Web & Mobile**

${service.description}

**Technologies utilisées:** ${service.technologies}

**Services inclus:**
${service.features.map(f => `• ${f}`).join('\n')}

**Tarif:** ${service.price}

Voulez-vous discuter de votre projet ? Je peux vous mettre en contact directement avec Tchjima !`;
    }

    if (message.includes('ia') || message.includes('intelligence artificielle') || message.includes('chatbot') || message.includes('automatisation')) {
      const service = knowledgeBase.services[1];
      return `🧠 **Intelligence Artificielle**

${service.description}

**Technologies utilisées:** ${service.technologies}

**Services inclus:**
${service.features.map(f => `• ${f}`).join('\n')}

**Tarif:** ${service.price}

Je peux vous aider à définir votre projet IA. Contactez Tchjima pour plus de détails !`;
    }

    if (message.includes('design') || message.includes('ux') || message.includes('ui') || message.includes('maquette')) {
      const service = knowledgeBase.services[2];
      return `🎨 **UX/UI Design**

${service.description}

**Outils utilisés:** ${service.technologies}

**Services inclus:**
${service.features.map(f => `• ${f}`).join('\n')}

**Tarif:** ${service.price}

Prêt à créer une expérience utilisateur exceptionnelle ? Parlons de votre projet !`;
    }

    if (message.includes('gestion') || message.includes('projet') || message.includes('agile') || message.includes('management')) {
      const service = knowledgeBase.services[3];
      return `⚙️ **Gestion de projet digital**

${service.description}

**Outils utilisés:** ${service.technologies}

**Services inclus:**
${service.features.map(f => `• ${f}`).join('\n')}

**Tarif:** ${service.price}

Besoin d'accompagnement pour votre projet ? Tchjima peut vous aider à le mener à bien !`;
    }

    // Questions sur les prix
    if (message.includes('prix') || message.includes('tarif') || message.includes('coût') || message.includes('combien')) {
      return `💰 **Tarification des services:**

• **Développement Web/Mobile:** À partir de 500k FCFA
• **Intelligence Artificielle:** À partir de 300k FCFA  
• **UX/UI Design:** À partir de 200k FCFA
• **Gestion de projet:** Sur devis

Les tarifs peuvent varier selon la complexité du projet. Contactez Tchjima pour un devis personnalisé !`;
    }

    // Questions contact
    if (message.includes('contact') || message.includes('téléphone') || message.includes('email') || message.includes('whatsapp')) {
      return `📞 **Contactez Tchjima KONE:**

• **WhatsApp:** +225 ${knowledgeBase.contact.whatsapp}
• **Email:** ${knowledgeBase.contact.email}
• **Localisation:** ${knowledgeBase.contact.location}

Je peux vous rediriger directement vers WhatsApp pour discuter de votre projet !`;
    }

    // Questions sur les certifications
    if (message.includes('certification') || message.includes('formation') || message.includes('diplôme')) {
      return `🏆 **Certifications de Tchjima:**

${knowledgeBase.certifications.map(cert => `• ${cert}`).join('\n')}

Ces certifications attestent de son expertise technique et de sa capacité à mener des projets complexes.`;
    }

    // Questions sur l'expérience/portfolio
    if (message.includes('expérience') || message.includes('portfolio') || message.includes('projet') || message.includes('réalisation')) {
      return `🚀 **Exemples de réalisations:**

**Développement:**
• Plateforme E-commerce (+150% de ventes)
• App Mobile SaaS (500+ utilisateurs actifs)
• Site Corporate (Position #1 Google)

**Design:**
• Refonte UX App Fintech (+40% engagement)
• Design System Startup (Temps de dev ÷3)
• Interface E-learning (+60% complétion)

**Gestion:**
• Digitalisation PME (+35% productivité)
• Lancement Startup (100% délais respectés)
• Projet Gouvernemental (50k+ utilisateurs)

Voulez-vous voir plus de détails sur ces projets ?`;
    }

    // Devis/rdv
    if (message.includes('devis') || message.includes('rendez-vous') || message.includes('rdv') || message.includes('discuter')) {
      return `🤝 **Prêt à démarrer votre projet ?**

Je peux vous mettre en contact avec Tchjima dès maintenant ! 

Cliquez sur ce lien pour ouvrir WhatsApp avec un message pré-rempli :
https://wa.me/2250566997785?text=Bonjour, je viens de votre portfolio et je souhaite discuter de mon projet.

Ou préférez-vous que je vous aide à préparer votre demande d'abord ?`;
    }

    // Réponse par défaut
    return `Je suis là pour vous aider ! Je peux vous renseigner sur :

• Les **services** de Tchjima (dev, IA, design, gestion)
• Les **tarifs** et devis
• Ses **certifications** et expérience
• Comment le **contacter**
• Ses **réalisations** passées

Que souhaitez-vous savoir ? 🤔`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simule un délai de réponse
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-24 right-6 z-30">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full gradient-primary text-white shadow-floating hover-glow group animate-bounce"
          size="icon"
        >
          <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-2 -right-2 h-6 w-6 bg-accent rounded-full flex items-center justify-center">
            <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </Button>
        
        {/* Tooltip */}
        <div className="absolute bottom-20 right-0 bg-foreground text-background px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          Posez-moi vos questions !
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 z-30">
      <Card className={cn(
        "w-96 h-[500px] shadow-2xl border-0 glass-card overflow-hidden transition-all duration-300",
        isMinimized ? "h-16" : "h-[500px]"
      )}>
        {/* Header */}
        <CardHeader className="pb-3 border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background"></div>
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">Assistant Tchjima</CardTitle>
                <p className="text-xs text-muted-foreground">En ligne</p>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="p-0 flex-1">
              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.sender === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div className={cn(
                        "flex items-start space-x-2 max-w-[80%]",
                        message.sender === 'user' ? "flex-row-reverse space-x-reverse" : ""
                      )}>
                        <div className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                          message.sender === 'user' 
                            ? "bg-primary text-primary-foreground" 
                            : "gradient-primary text-white"
                        )}>
                          {message.sender === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>
                        <div className={cn(
                          "rounded-2xl px-3 py-2 text-sm whitespace-pre-line",
                          message.sender === 'user'
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        )}>
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-muted rounded-2xl rounded-bl-sm px-3 py-2">
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="gradient-primary text-white hover-glow"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default ChatBot;