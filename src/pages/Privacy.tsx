import Layout from "@/components/layout/Layout";
import AnimatedPageBanner from "@/components/AnimatedPageBanner";
import { motion } from "framer-motion";
import { useSeo } from "@/lib/seo";

const Privacy = () => {
  useSeo({
    title: "Privacy Policy",
    description: "How Sunita Real Estate handles information you share through our website and enquiries.",
    path: "/privacy",
  });

  return (
    <Layout>
      <section className="relative pt-32 pb-16 bg-dark">
        <AnimatedPageBanner />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">Privacy Policy</h1>
            <p className="text-primary-foreground/60 mt-3 max-w-xl mx-auto text-sm">
              We respect your privacy. This summary explains typical practices; replace or extend with counsel-approved policy as needed.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-muted-foreground leading-relaxed">
            When you contact us by form, phone, email, or WhatsApp, we may collect your name, contact details, and message
            content to respond to your enquiry and follow up on property-related services. We do not sell your personal data.
            Information may be shared only as needed with developers or partners involved in your requested transaction, or when
            required by law.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Website analytics or third-party embeds (e.g. maps) may collect technical data according to their own policies. For
            questions or deletion requests, write to{" "}
            <a href="mailto:sunitaestate@gmail.com" className="text-gold hover:underline">
              sunitaestate@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
