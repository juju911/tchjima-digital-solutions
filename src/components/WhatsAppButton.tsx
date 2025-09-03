import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    const message = "Bonjour, je viens de votre site et je souhaite discuter de mon projet.";
    const whatsappUrl = `https://wa.me/2250566997785?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Pulse animation ring */}
      <div className="absolute inset-0 rounded-full animate-ping bg-green-500 opacity-20"></div>
      
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-foreground text-background text-sm rounded-lg whitespace-nowrap shadow-lg animate-fade-in">
          Discutons de votre projet !
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
        </div>
      )}
      
      <Button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 shadow-floating hover:scale-110 transition-bounce p-0 group pulse-glow"
        aria-label="Contacter via WhatsApp"
      >
        <MessageCircle className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
        
        {/* Notification badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">1</span>
        </div>
      </Button>
    </div>
  );
};

export default WhatsAppButton;