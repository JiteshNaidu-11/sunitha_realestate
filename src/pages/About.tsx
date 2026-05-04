import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { openWhatsApp } from "@/utils/whatsapp";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Clock, Shield, ArrowRight } from "lucide-react";
import heroVideo from "@/assets/realestate.mp4";

const pioneers = [
  {
    name: "Sunita Sharma",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    description: "Founder of Sunita Real Estate with a vision to bring transparency and trust to Navi Mumbai's property market. Her dedication to client satisfaction and ethical practices laid the cornerstone of our company's success.",
  },
  {
    name: "Rajesh Kumar",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    description: "Co-founder and strategic architect behind our expansion across Seawoods, Kharghar, and Vashi. His deep market insights and relationship-building approach have been instrumental in our growth.",
  },
  {
    name: "Priya Mehta",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
    description: "Pioneer of our customer-centric service model. Her focus on understanding client needs and delivering personalized solutions established the reputation we proudly carry today.",
  },
];

/** Toggle to show/hide the Team/Pioneers section until client shares data */
const SHOW_TEAM_SECTION = false;

/** Toggle to show the "Carrying The Baton..." heading, copy, and three leader cards */
const SHOW_CURRENT_LEADERS_SECTION = false;

// Data for Current Leaders (used when SHOW_CURRENT_LEADERS_SECTION is true)
const currentLeaders = [
  {
    name: "Amit Sharma",
    role: "Operations & Strategy",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    description: "Leading day-to-day operations with a focus on scaling our reach while maintaining the personal touch that defines Sunita Real Estate. Oversees property acquisitions and strategic partnerships.",
  },
  {
    name: "Neha Patel",
    role: "Client Relations & Sales",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop",
    description: "Driving our sales excellence and client satisfaction initiatives. Ensures every family finds their dream home through transparent dealings and dedicated support throughout the journey.",
  },
  {
    name: "Vikram Singh",
    role: "Legal & Compliance",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&h=500&fit=crop",
    description: "Managing RERA compliance and legal documentation. His expertise ensures every transaction is secure, transparent, and hassle-free for our clients.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero - matching homepage structure */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-dark/20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-gold font-body text-sm tracking-[0.3em] uppercase mb-4">About Us</span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Experiences as Exceptional
              <br />
              <span className="text-gold">as Your Dreams</span>
            </h1>
            <p className="text-primary-foreground/70 font-body text-lg md:text-xl max-w-2xl mx-auto mb-8">
              With over 15 years of experience in Navi Mumbai real estate, we've built a legacy of trust, transparency, and excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projects">
                <Button variant="hero" size="lg" className="text-base px-8">
                  View Projects <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="hero-outline" size="lg" className="text-base px-8" onClick={() => openWhatsApp("Hi, I'm interested in your properties")}>
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.img
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              src="/photo.jpeg"
              alt="Our Founder"
              className="w-full max-h-[320px] sm:max-h-[380px] lg:max-h-[460px] object-contain rounded-lg shadow-xl bg-muted"
            />
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Sunita Real Estate is a leading real estate consultancy firm based in Seawoods, Navi Mumbai. Founded with a vision to simplify property buying and selling, we have grown to become one of the most trusted names in the region.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team of experienced professionals understands the Navi Mumbai market inside out, helping clients make informed decisions about their most important investments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="bg-card p-8 rounded-lg shadow-md border border-border">
              <Target className="w-10 h-10 text-gold mb-4" />
              <h3 className="font-display text-2xl font-bold text-card-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the most trusted real estate partner in Navi Mumbai, known for integrity, innovation, and customer-centric service.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
              className="bg-card p-8 rounded-lg shadow-md border border-border">
              <Eye className="w-10 h-10 text-gold mb-4" />
              <h3 className="font-display text-2xl font-bold text-card-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide exceptional real estate services that help families and businesses find their perfect spaces while ensuring transparency at every step.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team / Leadership - Two-tier structure (hidden until client shares team info) */}
      {SHOW_TEAM_SECTION && (
        <section className="relative py-24 overflow-hidden bg-cream">
          <div
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')] bg-cover bg-center opacity-5"
            aria-hidden
          />
          <div className="container relative z-10 mx-auto px-4">
            {/* Pioneers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
                <div className="lg:col-span-5">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    The Pioneers Of Sunita Real Estate's Successful Legacy
                  </h2>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    The first generation of Sunita Real Estate's leaders, who laid the foundation over a decade ago, were visionary pioneers
                    who spearheaded our initial growth. Their bold leadership, innovative strategies, and unwavering commitment paved the way
                    for our emergence as a trusted name in Navi Mumbai real estate.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pioneers.map((person, i) => (
                  <motion.div
                    key={person.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="relative border-2 border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
                      <div className="absolute top-0 left-0 w-14 h-14 border-l-4 border-t-4 border-gold z-10" />
                      <div className="absolute top-0 right-0 w-14 h-14 border-r-4 border-t-4 border-gold z-10" />
                      <div className="absolute bottom-0 left-0 w-14 h-14 border-l-4 border-b-4 border-gold z-10" />
                      <div className="absolute bottom-0 right-0 w-14 h-14 border-r-4 border-b-4 border-gold z-10" />
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mt-5 mb-2">{person.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{person.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Current Leaders — set SHOW_CURRENT_LEADERS_SECTION to true to restore */}
            {SHOW_CURRENT_LEADERS_SECTION && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
                  <div className="lg:col-span-5">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                      Carrying The Baton Of Growth Into The Future
                    </h2>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      The current generation of Sunita Real Estate's visionaries, inheriting a legacy of innovation and success, further propel
                      our trajectory with forward-thinking approaches. Building upon the foundation laid by their predecessors, they embrace
                      emerging technologies and expand our market reach across Navi Mumbai.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {currentLeaders.map((person, i) => (
                    <motion.div
                      key={person.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <div className="relative border-2 border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
                        <div className="absolute top-0 left-0 w-14 h-14 border-l-4 border-t-4 border-gold z-10" />
                        <div className="absolute top-0 right-0 w-14 h-14 border-r-4 border-t-4 border-gold z-10" />
                        <div className="absolute bottom-0 left-0 w-14 h-14 border-l-4 border-b-4 border-gold z-10" />
                        <div className="absolute bottom-0 right-0 w-14 h-14 border-r-4 border-b-4 border-gold z-10" />
                        <div className="aspect-[4/5] overflow-hidden">
                          <img
                            src={person.image}
                            alt={person.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mt-5 mb-1">{person.name}</h3>
                      <p className="text-gold text-sm font-medium mb-2">({person.role})</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{person.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0b1220] via-[#1b2433] to-[#3a2a18]">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="container relative z-10 mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">Why Choose Sunita Real Estate</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "15+ Years", desc: "Industry experience in Navi Mumbai" },
              { icon: Users, title: "500+ Families", desc: "Successfully served happy families" },
              { icon: Clock, title: "Timely Delivery", desc: "We value your time and commitments" },
              { icon: Shield, title: "RERA Registered", desc: "All properties are RERA compliant" },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="rounded-2xl border border-primary-foreground/15 bg-white/[0.06] backdrop-blur-md p-7 text-center shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/70 hover:bg-white/[0.09]">
                <div className="mb-5 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
                    <item.icon className="w-8 h-8 text-gold" />
                  </div>
                </div>
                <h3 className="font-display text-2xl font-semibold text-primary-foreground mb-3">{item.title}</h3>
                <p className="text-primary-foreground/75 text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
