import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "EMI Calculator", path: "/emi-calculator" },
  { label: "Services", path: "/services" },
  { label: "Blogs", path: "/blogs" },
  // { label: "Contact", path: "/contact" }, // duplicate of gold CTA — use main Contact button instead
];

const scrollWindowToTop = () => window.scrollTo(0, 0);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-dark/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="inline-flex items-center" onClick={scrollWindowToTop}>
            <img
              src="/sunita%20real%20estate%20logo.png"
              alt="Sunita Real Estate"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={scrollWindowToTop}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                  location.pathname === link.path
                    ? "text-gold"
                    : "text-primary-foreground/80 hover:text-gold"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" onClick={scrollWindowToTop}>
              <Button variant="gold" size="sm" className="ml-4 gap-2">
                <Phone className="w-4 h-4" />
                Contact
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-primary-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-dark/95 backdrop-blur-md border-t border-gold/20 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={scrollWindowToTop}
                className={cn(
                  "block px-4 py-3 text-sm font-medium transition-colors",
                  location.pathname === link.path
                    ? "text-gold"
                    : "text-primary-foreground/80 hover:text-gold"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Link to="/contact" onClick={scrollWindowToTop}>
                <Button variant="gold" size="sm" className="w-full gap-2">
                  <Phone className="w-4 h-4" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
