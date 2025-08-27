import { Mail, MessageCircle, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start">
                <Mail className="h-4 w-4 text-primary mr-2" />
                <a 
                  href="mailto:arnaservicesandcreatives@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  arnaservicesandcreatives@gmail.com
                </a>
              </div>
              
              <div className="flex items-center justify-center md:justify-start">
                <MessageCircle className="h-4 w-4 text-primary mr-2" />
                <a 
                  href="https://wa.me/2250566997785"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  +225 05 66 99 77 85
                </a>
              </div>
              
              <div className="flex items-center justify-center md:justify-start">
                <MapPin className="h-4 w-4 text-primary mr-2" />
                <span className="text-muted-foreground">
                  Abidjan, Côte d'Ivoire
                </span>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="hover:text-primary transition-smooth cursor-pointer">
                Développement Web & Mobile
              </li>
              <li className="hover:text-primary transition-smooth cursor-pointer">
                Design & UX/UI
              </li>
              <li className="hover:text-primary transition-smooth cursor-pointer">
                Gestion de projet digital
              </li>
              <li className="hover:text-primary transition-smooth cursor-pointer">
                Intégration IA & Chatbot
              </li>
            </ul>
          </div>
          
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">Tchjima KONE</h3>
            <p className="text-muted-foreground leading-relaxed">
              Freelance digital passionné par l'innovation technologique et le design. 
              Je transforme vos idées en solutions digitales performantes et modernes.
            </p>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Tchjima KONE - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;