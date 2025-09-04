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

  // Knowledge base complète basée sur RAG et toutes les informations du site
  const knowledgeBase = {
    profile: {
      name: "Kiragniry Tchjima KONE",
      profession: "Freelance Digital Expert",
      location: "Abidjan, Yopougon maroc (RCI)",
      experience: "8 ans d'expérience diversifiée",
      phone: "+225 07 47 225 488 / +225 05 66 997 785",
      email: "arnaservicesandcreatives@gmail.com",
      whatsapp: "0566997785",
      permis: "Permis BCE délivré le 17/10/2013",
      situation: "Marié - 2 Enfants",
      bio: "Dynamique professionnel avec 8 ans d'expérience diversifiée, principalement dans le secteur du numérique mais également dans la sécurité privée et le transport. Capable de m'adapter rapidement à de nouveaux environnements, reconnu pour mon esprit d'analyse, ma rigueur et ma capacité à travailler efficacement en équipe."
    },
    
    education: {
      master: "MASTER EN GENIE LOGICIEL & Réseaux Informatiques (2017) - Groupe EDHEC, Cocody, Abidjan",
      licence: "Licence Professionnelle, Génie Logiciel et Réseaux informatiques (2015) - Groupe EDHEC",
      dut: "DUT, Diplôme Universitaire de Technologie (2014) - HEC la Roche, Cocody, Abidjan",
      bac: "Terminale C (2012)",
      formations: [
        "Configuration avancée sur la haute disponibilité sur les équipements CISCO (2016)",
        "Configuration Call Manager Express (2015)",
        "Câblage Réseaux et Adressage IP (2013)"
      ]
    },

    certifications: [
      "MASTER EN GENIE LOGICIEL & Réseaux Informatiques (2017)",
      "CSCU (Certified Secure Computer User) By EC-Council",
      "Certificat en 10 Compétences en Intelligence Artificielle By NYS AFRICA",
      "Certificat en Suivi-évaluation de projets de développement By CAMPUS GROUPE AFD",
      "Formation : Défendre les droits humains à l'ère de l'intelligence artificielle By NYS AFRICA"
    ],

    experience: [
      {
        role: "Responsable des Opérations",
        company: "JAFA SECURITY",
        period: "Février 2023 — Février 2025",
        achievements: [
          "Encadrement et supervision d'une équipe de 72 agents de sécurité",
          "Gestion complète du suivi des prestations, planification et contrôle qualité",
          "Responsable de l'édition et transmission des factures avec taux de recouvrement de 85%",
          "Mise en place de l'architecture de fonctionnement entre différents secteurs",
          "Gestion des stocks avec réduction des pertes d'environ 90%"
        ]
      },
      {
        role: "UX/UI Designer – Devs. FrontEnd – Gestion de Projet",
        company: "DIGIN FACTORY",
        period: "Fev. 2021 — Déc. 2022",
        achievements: [
          "Conçu l'interface utilisateur de logiciels métiers pour SODECI, AAE, Sanlam",
          "Développé et intégré des vues avec HTML5, CSS, optimisation du temps de chargement",
          "Géré une équipe de 6 développeurs, respect des délais et budget"
        ]
      },
      {
        role: "Responsable Informatique",
        company: "IBP-Holding",
        period: "Janv. 2020 — Déc. 2020",
        achievements: [
          "Géré un parc informatique d'une vingtaine de postes",
          "Résolution des problèmes techniques réseau et matériel",
          "Supervisé une équipe de 3 techniciens informatiques",
          "Mis en place un document de suivi des tâches"
        ]
      }
    ],

    services: [
      {
        name: "Développement Web & Mobile",
        description: "Solutions complètes : sites vitrines, e-commerce, applications mobiles, logiciels SaaS",
        technologies: "HTML5, CSS3, JavaScript, ReactJS, TypeScript, Flutter, PHP, MySQL, Laravel, Bootstrap",
        price: "À partir de 500k FCFA",
        features: [
          "Sites vitrines & e-commerce",
          "Applications mobiles (Flutter)",
          "Logiciels SaaS personnalisés",
          "SEO & optimisation",
          "Intégration de paiement",
          "Responsive design",
          "Maintenance et support"
        ]
      },
      {
        name: "Intelligence Artificielle",
        description: "Chatbots intelligents, automatisation et analyse de données avancée",
        technologies: "Python, TensorFlow, OpenAI API, Machine Learning, RAG, NLP",
        price: "À partir de 300k FCFA",
        features: [
          "Chatbots conversationnels",
          "Automatisation de processus",
          "Analyse de données",
          "WhatsApp Business API",
          "Solutions IA personnalisées",
          "RAG et Knowledge Base",
          "Intégration API IA"
        ]
      },
      {
        name: "UX/UI Design",
        description: "Maquettes, prototypes interactifs et design systems modernes",
        technologies: "Adobe XD, Figma, Photoshop, InDesign, Adobe Illustrator",
        price: "À partir de 200k FCFA",
        features: [
          "Maquettes haute fidélité",
          "Prototypes interactifs",
          "Expérience utilisateur",
          "Design systems",
          "Interfaces adaptatives",
          "Recherche utilisateur",
          "Tests d'usabilité"
        ]
      },
      {
        name: "Gestion de projet digital",
        description: "Planification Agile, coordination d'équipes et suivi-évaluation complet",
        technologies: "MS Project, Trello, Jira, MS Office (Word, Excel, PowerPoint)",
        price: "Sur devis",
        features: [
          "Planification Agile",
          "Coordination d'équipes",
          "Suivi-évaluation",
          "Accompagnement complet",
          "Livraison dans les délais",
          "Gestion des risques",
          "Reporting détaillé"
        ]
      },
      {
        name: "Création graphique & Montage",
        description: "Création de contenus visuels et montage vidéo professionnel",
        technologies: "Adobe Photoshop, Adobe Premiere Pro, Adobe InDesign, Adobe Illustrator",
        price: "Sur devis",
        features: [
          "Création de logos",
          "Supports de communication",
          "Montage vidéo",
          "Retouche photo",
          "Identité visuelle",
          "Flyers et plaquettes"
        ]
      }
    ],

    portfolio: {
      webDev: [
        {
          name: "Plateforme E-commerce Moderne",
          description: "Site e-commerce avec +150% d'augmentation des ventes",
          technologies: "React, Node.js, MongoDB, Stripe",
          impact: "+150% de ventes"
        },
        {
          name: "Application Mobile SaaS",
          description: "App mobile avec 500+ utilisateurs actifs",
          technologies: "Flutter, Firebase, REST API",
          impact: "500+ utilisateurs actifs"
        },
        {
          name: "Site Corporate",
          description: "Site corporate avec position #1 sur Google",
          technologies: "React, TypeScript, SEO optimisé",
          impact: "Position #1 Google"
        }
      ],
      design: [
        {
          name: "Refonte UX App Fintech",
          description: "Amélioration de l'engagement utilisateur de 40%",
          impact: "+40% engagement",
          tools: "Figma, Adobe XD"
        },
        {
          name: "Design System Startup",
          description: "Réduction du temps de développement par 3",
          impact: "Temps de dev ÷3",
          tools: "Figma, Storybook"
        },
        {
          name: "Interface E-learning",
          description: "Augmentation du taux de complétion de 60%",
          impact: "+60% complétion",
          tools: "Adobe XD, Photoshop"
        }
      ],
      projectManagement: [
        {
          name: "Digitalisation PME",
          description: "Amélioration de la productivité de 35%",
          impact: "+35% productivité",
          scope: "Équipe de 15 personnes"
        },
        {
          name: "Lancement Startup",
          description: "100% des délais respectés",
          impact: "100% délais respectés",
          scope: "Projet de 6 mois"
        },
        {
          name: "Projet Gouvernemental",
          description: "Plateforme pour 50k+ utilisateurs",
          impact: "50k+ utilisateurs",
          scope: "Équipe de 20 personnes"
        }
      ]
    },

    competences: {
      transversales: [
        "Gestion de projet",
        "Esprit d'équipe",
        "Rigueur",
        "Adaptabilité",
        "Apprentissage rapide",
        "Sens de l'organisation",
        "Communication"
      ],
      techniques: [
        "HTML5, CSS3, JavaScript",
        "ReactJS, TypeScript",
        "Flutter, PHP, MySQL",
        "Laravel, Bootstrap",
        "Adobe Creative Suite",
        "MS Office Suite",
        "Outils de gestion de projet"
      ]
    },

    contact: {
      whatsapp: "0566997785",
      phone1: "07 47 225 488",
      phone2: "05 66 997 785",
      email: "arnaservicesandcreatives@gmail.com",
      location: "Abidjan, Yopougon maroc (RCI)",
      disponibilite: "Disponible pour projets freelance"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fonction RAG avancée pour générer des réponses intelligentes
  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Système de détection d'intentions plus avancé
    const detectIntent = (msg: string) => {
      const intents = {
        greeting: ['bonjour', 'salut', 'hello', 'bonsoir', 'hey'],
        services: ['service', 'que fait', 'compétence', 'offre', 'spécialité'],
        webDev: ['développement', 'web', 'mobile', 'site', 'application', 'app', 'flutter', 'react'],
        ai: ['ia', 'intelligence artificielle', 'chatbot', 'automatisation', 'machine learning', 'rag'],
        design: ['design', 'ux', 'ui', 'maquette', 'prototype', 'figma', 'adobe'],
        projectManagement: ['gestion', 'projet', 'agile', 'management', 'coordination', 'équipe'],
        graphicDesign: ['graphique', 'logo', 'montage', 'photoshop', 'vidéo', 'identité visuelle'],
        pricing: ['prix', 'tarif', 'coût', 'combien', 'devis', 'budget'],
        contact: ['contact', 'téléphone', 'email', 'whatsapp', 'appel', 'joindre'],
        education: ['formation', 'diplôme', 'master', 'université', 'études', 'école'],
        certification: ['certification', 'certifié', 'cscu', 'ec-council'],
        experience: ['expérience', 'parcours', 'carrière', 'poste', 'entreprise'],
        portfolio: ['portfolio', 'réalisation', 'projet', 'exemple', 'travail'],
        about: ['qui es', 'présent', 'profil', 'tchjima', 'à propos'],
        availability: ['disponible', 'libre', 'temps', 'délai', 'quand'],
        location: ['où', 'localisation', 'abidjan', 'côte d\'ivoire', 'lieu']
      };
      
      for (const [intent, keywords] of Object.entries(intents)) {
        if (keywords.some(keyword => msg.includes(keyword))) {
          return intent;
        }
      }
      return 'unknown';
    };

    const intent = detectIntent(message);

    // Réponses basées sur les intentions détectées
    switch (intent) {
      case 'greeting':
        return `Bonjour ! 👋 Je suis l'assistant virtuel de **${knowledgeBase.profile.name}**.

Je peux vous aider à découvrir :
• Ses **5 services** (Dev Web/Mobile, IA, UX/UI, Gestion projet, Création graphique)
• Son **expérience** de ${knowledgeBase.profile.experience}
• Ses **certifications** et formations
• Comment le **contacter** pour votre projet

Que souhaitez-vous savoir ? 🤔`;

      case 'services':
        return `🚀 **Services de ${knowledgeBase.profile.name}** :

${knowledgeBase.services.map((service, index) => 
  `${index + 1}. **${service.name}** (${service.price})
   ${service.description}`
).join('\n\n')}

💡 Quel service vous intéresse le plus ? Je peux vous donner plus de détails !`;

      case 'webDev':
        const webService = knowledgeBase.services[0];
        return `🌐 **${webService.name}**

${webService.description}

**🛠️ Technologies maîtrisées :**
${webService.technologies}

**✨ Services inclus :**
${webService.features.map(f => `• ${f}`).join('\n')}

**💰 Tarif :** ${webService.price}

**🎯 Exemples de réalisations :**
${knowledgeBase.portfolio.webDev.map(project => 
  `• ${project.name} - ${project.impact}`
).join('\n')}

Prêt à lancer votre projet web/mobile ? 📱`;

      case 'ai':
        const aiService = knowledgeBase.services[1];
        return `🧠 **${aiService.name}**

${aiService.description}

**🛠️ Technologies utilisées :**
${aiService.technologies}

**✨ Solutions proposées :**
${aiService.features.map(f => `• ${f}`).join('\n')}

**💰 Tarif :** ${aiService.price}

Tchjima a une certification en **10 Compétences en Intelligence Artificielle** et maîtrise les dernières technologies IA. 

Votre projet IA m'intéresse ! Parlons-en ? 🤖`;

      case 'design':
        const designService = knowledgeBase.services[2];
        return `🎨 **${designService.name}**

${designService.description}

**🛠️ Outils maîtrisés :**
${designService.technologies}

**✨ Services créatifs :**
${designService.features.map(f => `• ${f}`).join('\n')}

**💰 Tarif :** ${designService.price}

**🎯 Réalisations design :**
${knowledgeBase.portfolio.design.map(project => 
  `• ${project.name} - ${project.impact}`
).join('\n')}

Créons ensemble une expérience utilisateur exceptionnelle ! ✨`;

      case 'projectManagement':
        const pmService = knowledgeBase.services[3];
        return `⚙️ **${pmService.name}**

${pmService.description}

**🛠️ Outils utilisés :**
${pmService.technologies}

**✨ Expertise en :**
${pmService.features.map(f => `• ${f}`).join('\n')}

**💰 Tarif :** ${pmService.price}

**📊 Succès récents :**
${knowledgeBase.portfolio.projectManagement.map(project => 
  `• ${project.name} - ${project.impact}`
).join('\n')}

Tchjima a managé des équipes jusqu'à 72 personnes ! 👥`;

      case 'graphicDesign':
        const graphicService = knowledgeBase.services[4];
        return `🎨 **${graphicService.name}**

${graphicService.description}

**🛠️ Logiciels maîtrisés :**
${graphicService.technologies}

**✨ Créations proposées :**
${graphicService.features.map(f => `• ${f}`).join('\n')}

**💰 Tarif :** ${graphicService.price}

Tchjima a créé des identités visuelles pour de nombreuses entreprises. Votre marque mérite le meilleur ! 🚀`;

      case 'pricing':
        return `💰 **Grille tarifaire complète :**

${knowledgeBase.services.map(service => 
  `• **${service.name}** : ${service.price}`
).join('\n')}

📋 **Important :** Les tarifs varient selon :
• Complexité du projet
• Délais souhaités  
• Fonctionnalités demandées
• Accompagnement requis

🎯 **Pour un devis précis et personnalisé :**
${generateContactInfo()}`;

      case 'contact':
        return generateContactInfo();

      case 'education':
        return `🎓 **Formation de ${knowledgeBase.profile.name} :**

**🏆 Diplômes :**
• ${knowledgeBase.education.master}
• ${knowledgeBase.education.licence}
• ${knowledgeBase.education.dut}
• ${knowledgeBase.education.bac}

**📚 Formations techniques :**
${knowledgeBase.education.formations.map(f => `• ${f}`).join('\n')}

Une formation solide pour des projets réussis ! 📖`;

      case 'certification':
        return `🏆 **Certifications de ${knowledgeBase.profile.name} :**

${knowledgeBase.certifications.map(cert => `• ${cert}`).join('\n')}

Ces certifications garantissent une expertise technique de haut niveau et une approche professionnelle de vos projets ! ✅`;

      case 'experience':
        return `💼 **Parcours professionnel de ${knowledgeBase.profile.name} :**

${knowledgeBase.experience.map(exp => 
  `**${exp.role}** - ${exp.company}
${exp.period}
${exp.achievements.slice(0, 2).map(a => `• ${a}`).join('\n')}`
).join('\n\n')}

**🎯 Compétences transversales :**
${knowledgeBase.competences.transversales.join(' • ')}

${knowledgeBase.profile.experience} dans le digital ! 🚀`;

      case 'portfolio':
        return `🚀 **Portfolio de réalisations :**

**💻 Développement Web/Mobile :**
${knowledgeBase.portfolio.webDev.map(p => `• ${p.name} (${p.impact})`).join('\n')}

**🎨 Design UX/UI :**
${knowledgeBase.portfolio.design.map(p => `• ${p.name} (${p.impact})`).join('\n')}

**⚙️ Gestion de projet :**
${knowledgeBase.portfolio.projectManagement.map(p => `• ${p.name} (${p.impact})`).join('\n')}

Envie de voir plus de détails ? Contactons Tchjima ! 📞`;

      case 'about':
        return `👨‍💻 **${knowledgeBase.profile.name}**

${knowledgeBase.profile.bio}

📍 **Localisation :** ${knowledgeBase.profile.location}
💍 **Situation :** ${knowledgeBase.profile.situation}
🚗 **Mobilité :** ${knowledgeBase.profile.permis}

**🎯 Expertise principale :**
${knowledgeBase.profile.profession} avec ${knowledgeBase.profile.experience}

Tchjima combine technique et créativité pour donner vie à vos projets ! ✨`;

      case 'availability':
        return `⏰ **Disponibilité de Tchjima :**

${knowledgeBase.contact.disponibilite} ! 

**📱 Contact immédiat :**
• WhatsApp : +225 ${knowledgeBase.contact.whatsapp}
• Appel : +225 ${knowledgeBase.contact.phone1}
• Email : ${knowledgeBase.contact.email}

Les délais dépendent de la complexité du projet. Pour une estimation précise, contactons-le directement ! 🚀`;

      case 'location':
        return `📍 **Localisation de Tchjima :**

${knowledgeBase.contact.location}

Basé à Abidjan, Tchjima intervient :
• 🏢 En présentiel (Abidjan et environs)
• 💻 En distanciel (partout dans le monde)
• 🚀 Suivi de projet 24h/7j

La distance n'est pas un obstacle pour vos projets digitaux ! 🌍`;

      default:
        // Fallback intelligent : recherche de mots-clés dans la knowledge base
        const searchKeywords = message.split(' ').filter(word => word.length > 3);
        const relevantInfo = searchInKnowledgeBase(searchKeywords);
        
        if (relevantInfo.length > 0) {
          return `🔍 **Voici ce que j'ai trouvé :**

${relevantInfo.join('\n\n')}

Besoin de plus de précisions ? 💬`;
        }

        // Si aucune information trouvée, redirection vers contact
        return `🤔 **Je n'ai pas trouvé d'information spécifique sur votre question.**

Mais ne vous inquiétez pas ! Tchjima peut répondre à toutes vos questions directement :

${generateContactInfo()}

Ou reformulez votre question, je ferai de mon mieux pour vous aider ! 😊`;
    }
  };

  // Fonction auxiliaire pour générer les informations de contact
  const generateContactInfo = (): string => {
    return `📞 **Contactez ${knowledgeBase.profile.name} :**

**📱 WhatsApp (Recommandé) :**
+225 ${knowledgeBase.contact.whatsapp}
[Ouvrir WhatsApp](https://wa.me/225${knowledgeBase.contact.whatsapp}?text=Bonjour,%20je%20viens%20de%20votre%20portfolio%20et%20je%20souhaite%20discuter%20de%20mon%20projet.)

**☎️ Appel direct :**
+225 ${knowledgeBase.contact.phone1} ou +225 ${knowledgeBase.contact.phone2}

**✉️ Email :**
${knowledgeBase.contact.email}

**📍 Localisation :**
${knowledgeBase.contact.location}

Tchjima vous répondra rapidement ! ⚡`;
  };

  // Fonction de recherche dans la knowledge base
  const searchInKnowledgeBase = (keywords: string[]): string[] => {
    const results: string[] = [];
    const knowledgeText = JSON.stringify(knowledgeBase).toLowerCase();
    
    keywords.forEach(keyword => {
      if (knowledgeText.includes(keyword)) {
        // Recherche contextuelle basique
        if (keyword.includes('web') || keyword.includes('site')) {
          results.push(`🌐 Tchjima développe des sites web et applications mobiles avec ${knowledgeBase.services[0].technologies}`);
        }
        if (keyword.includes('design') || keyword.includes('ux')) {
          results.push(`🎨 Expert en UX/UI Design avec ${knowledgeBase.services[2].technologies}`);
        }
        if (keyword.includes('gestion') || keyword.includes('manage')) {
          results.push(`⚙️ Gestion de projet digital avec ${knowledgeBase.services[3].technologies}`);
        }
      }
    });
    
    return [...new Set(results)]; // Supprime les doublons
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