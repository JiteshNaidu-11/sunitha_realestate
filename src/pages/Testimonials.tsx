import Layout from "@/components/layout/Layout";
import AnimatedPageBanner from "@/components/AnimatedPageBanner";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/data/mockData";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <Layout>
      <section className="relative pt-32 pb-20 bg-dark">
        <AnimatedPageBanner />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-gold text-sm tracking-[0.2em] uppercase font-semibold">Testimonials</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-2 mb-4">What Our Clients Say</h1>
            <p className="text-primary-foreground/60 max-w-xl mx-auto">Real experiences from families who trusted us with their biggest investment.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
