import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import TestimonialCard from "@/components/TestimonialCard";
import { properties, testimonials, services } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Building, TrendingUp, FileText, ArrowRight, CheckCircle } from "lucide-react";
// import heroBg from "@/assets/hero-bg.jpg";
import heroVideo from "@/assets/realestate.mp4";
import Layout from "@/components/layout/Layout";
import { buildAbsoluteUrl, useSeo } from "@/lib/seo";
import type { Property } from "@/data/types";

/** Homepage featured grid order (must match slugs in `mockData`). */
const FEATURED_PROJECT_SLUGS = [
  "aatman-balaji-palm-beach",
  "cadbury-junction-thane-west",
  "codename-panoramic-cbd-belapur",
  "mayuresh-planet-cbd-belapur",
  "9pbr-adani-realty",
  "elysium-platinum",
] as const;

function getFeaturedProperties(all: Property[]): Property[] {
  return FEATURED_PROJECT_SLUGS.map((slug) => all.find((p) => p.slug === slug)).filter(
    (p): p is Property => p != null
  );
}

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-8 h-8" />,
  Building: <Building className="w-8 h-8" />,
  TrendingUp: <TrendingUp className="w-8 h-8" />,
  FileText: <FileText className="w-8 h-8" />,
};

const heroHeadings = [
  { line1: "Find Your Dream", highlight: "Property", line2: "in Navi Mumbai" },
  { line1: "Where Dreams", highlight: "Meet Reality", line2: "in Navi Mumbai" },
  { line1: "Your Trusted", highlight: "Real Estate", line2: "Partner" },
];

const Index = () => {
  const [activeHeading, setActiveHeading] = useState(0);

  useSeo({
    title: "Real Estate in Navi Mumbai - Residential and Commercial Projects",
    description:
      "Explore verified real estate projects in Navi Mumbai with Sunita Real Estate. Discover homes and commercial properties in Nerul, Seawoods, Kharghar, Juinagar, and CBD Belapur.",
    path: "/",
    keywords: [
      "real estate in navi mumbai",
      "navi mumbai property consultant",
      "projects in nerul navi mumbai",
      "projects in seawoods",
      "kharghar properties",
      "commercial property navi mumbai",
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: "Sunita Real Estate",
      url: buildAbsoluteUrl("/"),
      telephone: "+91-7738384100",
      email: "sunitaestate@gmail.com",
      areaServed: ["Navi Mumbai", "Nerul", "Seawoods", "Kharghar", "Juinagar", "CBD Belapur", "Airoli"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shop No - 5, Madhushree CHS, Plot No - 33, Sector 40",
        addressLocality: "Seawoods, Navi Mumbai",
        addressRegion: "Maharashtra",
        postalCode: "400706",
        addressCountry: "IN",
      },
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeading((prev) => (prev + 1) % heroHeadings.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Hero pictures (commented out - using video background instead)
  // const heroSlides = [
  //   heroBg,
  //   "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1920&q=80",
  //   "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1920&q=80",
  // ];
  // const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  // useEffect(() => {
  //   const timer = window.setInterval(() => {
  //     setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
  //   }, 5000);

  //   return () => window.clearInterval(timer);
  // }, [heroSlides.length]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Hero pictures (commented out)
        {heroSlides.map((slide, index) => (
          <div
            key={slide}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${slide})`,
              opacity: index === activeHeroSlide ? 1 : 0,
            }}
          />
        ))}
        */}
        <div className="absolute inset-0 bg-dark/20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
              Premium Real Estate in Navi Mumbai
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight min-h-[4.5rem] md:min-h-[6rem] lg:min-h-[7rem] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeHeading}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="block text-center"
                >
                  {heroHeadings[activeHeading].line1}
                  <br />
                  <span className="text-gold">{heroHeadings[activeHeading].highlight}</span>{" "}
                  {heroHeadings[activeHeading].line2}
                </motion.span>
              </AnimatePresence>
            </h1>
            <p className="text-primary-foreground/70 font-body text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Sunita Real Estate brings you the finest residential and commercial properties across Navi Mumbai with complete transparency and trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projects">
                <Button variant="hero" size="lg" className="text-base px-8">
                  View Projects <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="hero-outline" size="lg" className="text-base px-8">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-gold text-sm tracking-[0.2em] uppercase font-semibold">Our Portfolio</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              Featured Properties
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFeaturedProperties(properties).map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/projects">
              <Button variant="gold" size="lg">View All Projects</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-gold text-sm tracking-[0.2em] uppercase font-semibold">About Us</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Your Trusted Partner in<br />Navi Mumbai Real Estate
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                With over a decade of experience, Sunita Real Estate has helped thousands of families find their dream homes. We specialize in residential and commercial properties across Navi Mumbai, offering transparent dealings and personalized service.
              </p>
              <div className="space-y-3 mb-8">
                {["15+ Years of Experience", "500+ Happy Families", "Transparent Dealings", "RERA Registered"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gold" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about">
                <Button variant="gold">Learn More About Us</Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
                alt="Modern luxury home"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
                <p className="font-display text-3xl font-bold">15+</p>
                <p className="text-sm">Years Experience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1f2937] to-[#3b2f1f]">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px]" />
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-gold text-sm tracking-[0.2em] uppercase font-semibold">What We Offer</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-2">Our Services</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-primary-foreground/15 bg-white/[0.06] backdrop-blur-md p-7 text-center shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/70 hover:bg-white/[0.09]"
              >
                <div className="mb-5 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-gold/10 text-gold">
                  {iconMap[service.icon] || <Home className="w-8 h-8" />}
                  </div>
                </div>
                <h3 className="font-display text-2xl font-semibold text-primary-foreground mb-3">{service.title}</h3>
                <p className="text-primary-foreground/75 text-base leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-gold text-sm tracking-[0.2em] uppercase font-semibold">Testimonials</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">What Our Clients Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-gold">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Find Your Dream Home Today
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Let our experts help you find the perfect property in Navi Mumbai. Get in touch with us today.
            </p>
            <Link to="/contact">
              <Button variant="hero-outline" size="lg" className="text-base px-10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Contact Us Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
