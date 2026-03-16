import { useState } from "react";
import Layout from "@/components/layout/Layout";
import AnimatedPageBanner from "@/components/AnimatedPageBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setName(""); setEmail(""); setSubject(""); setMessage("");
  };

  return (
    <Layout>
      <section className="relative pt-32 pb-20 bg-dark">
        <AnimatedPageBanner />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-gold text-sm tracking-[0.2em] uppercase font-semibold">Get in Touch</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-2 mb-4">Contact Us</h1>
            <p className="text-primary-foreground/60 max-w-xl mx-auto">Have questions? We'd love to hear from you.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-card/95 border border-border/80 shadow-xl rounded-2xl p-8 space-y-6"
            >
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-2xl font-bold text-card-foreground">Send a Message</h2>
                <p className="text-sm text-muted-foreground">
                  Share a few details and we&apos;ll get back to you within one business day.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Full Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="h-11 bg-secondary/70 border-transparent focus-visible:border-primary focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Email</label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="h-11 bg-secondary/70 border-transparent focus-visible:border-primary focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Subject</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What would you like to discuss?"
                  required
                  className="h-11 bg-secondary/70 border-transparent focus-visible:border-primary focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Message</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Tell us a bit more about your requirement..."
                  required
                  className="bg-secondary/70 border-transparent resize-none focus-visible:border-primary focus-visible:ring-primary"
                />
              </div>

              <Button variant="gold" type="submit" className="w-full h-11 text-base font-semibold shadow-md hover:shadow-lg">
                Send Message
              </Button>
            </motion.form>

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Contact Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <a href="tel:+917738384100" className="text-muted-foreground hover:text-gold transition-colors">+91 77383 84100</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a href="mailto:sunitaestate@gmail.com" className="text-muted-foreground hover:text-gold transition-colors">sunitaestate@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Address</p>
                      <p className="text-muted-foreground">
                        Shop No - 5, Madhushree CHS<br />
                        Plot No - 33, Sector 40<br />
                        Seawoods, Navi Mumbai<br />
                        Maharashtra 400706
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { icon: Instagram, href: "https://instagram.com" },
                    { icon: Facebook, href: "https://facebook.com" },
                    { icon: MessageCircle, href: "https://wa.me/917738384100" },
                    { icon: Twitter, href: "https://twitter.com" },
                    { icon: Linkedin, href: "https://linkedin.com" },
                  ].map(({ icon: Icon, href }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Google Map */}
          <div className="mt-16 max-w-5xl mx-auto rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5!2d73.02!3d19.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAxJzEyLjAiTiA3M8KwMDEnMTIuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy"
              title="Sunita Real Estate Office Location"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
