import Layout from "@/components/layout/Layout";
import AnimatedPageBanner from "@/components/AnimatedPageBanner";
import { motion } from "framer-motion";
import { useSeo } from "@/lib/seo";

const Terms = () => {
  useSeo({
    title: "Terms & Conditions",
    description: "Terms and conditions for using the Sunita Real Estate website and services.",
    path: "/terms",
  });

  return (
    <Layout>
      <section className="relative pt-32 pb-16 bg-dark">
        <AnimatedPageBanner />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">Terms & Conditions</h1>
            <p className="text-primary-foreground/60 mt-3 max-w-xl mx-auto text-sm">
              Please review these terms before using our website. Final legal text should be confirmed with your counsel.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-muted-foreground leading-relaxed">
            This website is operated by Sunita Real Estate for informational purposes about real estate projects in Navi Mumbai
            and surrounding areas. Project details, pricing, availability, and amenities may change without notice and should be
            verified directly with our team or the developer. Nothing on this site constitutes legal, financial, or investment
            advice. Use of this site is at your own risk; we are not liable for decisions based on its content.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            For the full, binding terms of engagement for property advisory services, please request the latest agreement or
            disclosure documents from our office.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
