import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Linkedin, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 */}
          <div>
            <Link to="/" className="inline-flex items-center mb-4">
              <img
                src="/sunita%20real%20estate%20logo.png"
                alt="Sunita Real Estate"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Delivering quality spaces built on trust and innovation. Your trusted partner in Navi Mumbai real estate since 2010.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://www.instagram.com/sunita_real_estate/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/sunitaestatenavimumbai" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://x.com/NithinSonawalee" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/nitin-pandit-sonawale-1251bb37/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Projects", path: "/projects" },
                { label: "Testimonials", path: "/testimonials" },
                { label: "EMI Calculator", path: "/emi-calculator" },
                { label: "Services", path: "/services" },
                { label: "Blogs", path: "/blogs" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-gold">Help Center</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm text-primary-foreground/60 hover:text-gold transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-sm text-primary-foreground/60 hover:text-gold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-gold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                <p className="text-sm text-primary-foreground/60">
                  Shop No - 5, Madhushree CHS<br />
                  Plot No - 33, Sector 40<br />
                  Seawoods, Navi Mumbai<br />
                  Maharashtra 400706
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+917738384100" className="text-sm text-primary-foreground/60 hover:text-gold transition-colors">+91 77383 84100</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:sunitaestate@gmail.com" className="text-sm text-primary-foreground/60 hover:text-gold transition-colors">sunitaestate@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-6">
        <p className="text-center text-sm text-primary-foreground/40">
          Copyright © 2026 Sunita Real Estate
        </p>
      </div>
    </footer>
  );
};

export default Footer;
