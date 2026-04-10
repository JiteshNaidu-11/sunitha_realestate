import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedPageBanner from "@/components/AnimatedPageBanner";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

const Admin = () => {
  return (
    <Layout>
      <section className="relative pt-32 pb-20 bg-dark min-h-screen flex items-center">
        <AnimatedPageBanner />
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-xl"
          >
            <div className="text-center mb-6">
              <Lock className="w-12 h-12 text-gold mx-auto mb-4" />
              <h1 className="font-display text-2xl font-bold text-card-foreground">Admin Login</h1>
              <p className="text-muted-foreground text-sm mt-2">Sign in to manage your real estate platform</p>
            </div>
            <div className="space-y-4">
              <input placeholder="Email" type="email" className="w-full bg-secondary text-secondary-foreground rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" />
              <input placeholder="Password" type="password" className="w-full bg-secondary text-secondary-foreground rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" />
              <Button variant="gold" className="w-full">Sign In</Button>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-6">
              Admin panel requires backend setup with supabase Cloud.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
