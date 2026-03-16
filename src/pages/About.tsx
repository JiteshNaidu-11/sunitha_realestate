import Layout from "@/components/layout/Layout";
import AnimatedPageBanner from "@/components/AnimatedPageBanner";
import { motion } from "framer-motion";
import { CheckCircle, Target, Eye, Award, Users, Clock, Shield } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-dark">
        <AnimatedPageBanner />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-gold text-sm tracking-[0.2em] uppercase font-semibold">About Us</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-2 mb-4">
              Experiences as Exceptional<br />as Your Dreams
            </h1>
            <p className="text-primary-foreground/60 max-w-2xl mx-auto">
              With over 15 years of experience in Navi Mumbai real estate, we've built a legacy of trust, transparency, and excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.img
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800" alt="Our Team" className="rounded-lg shadow-xl"
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
