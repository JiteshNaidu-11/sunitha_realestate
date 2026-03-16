import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const botResponses: Record<string, string> = {
  "properties": "We have premium properties across Navi Mumbai including Kharghar, Seawoods, Panvel, Vashi, Nerul, and Ulwe. Visit our Projects page to explore!",
  "2bhk": "We have excellent 2BHK options starting from ₹55 Lakhs in Ulwe to ₹1.5 Cr in Vashi. Would you like to know more about a specific location?",
  "3bhk": "Our 3BHK offerings range from ₹85 Lakhs to ₹3.2 Cr across premium locations. Check our Projects page for details!",
  "services": "We offer Buy/Sell/Rent services, Investment Advisory, Legal & Documentation assistance, and Rental Management. Visit our Services page to learn more!",
  "location": "Our office is at Shop No - 5, Madhushree CHS, Plot No - 33, Sector 40, Seawoods, Navi Mumbai, Maharashtra 400706.",
  "contact": "You can reach us at +91 77383 84100 or email sunitaestate@gmail.com. We'd love to hear from you!",
  "default": "Thank you for your interest! For detailed information, please visit our Projects page or Contact us at +91 77383 84100. How else can I help you?",
};

const getResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  if (lower.includes("propert") || lower.includes("flat") || lower.includes("home") || lower.includes("house")) return botResponses.properties;
  if (lower.includes("2bhk") || lower.includes("2 bhk")) return botResponses["2bhk"];
  if (lower.includes("3bhk") || lower.includes("3 bhk")) return botResponses["3bhk"];
  if (lower.includes("service")) return botResponses.services;
  if (lower.includes("location") || lower.includes("office") || lower.includes("address") || lower.includes("where")) return botResponses.location;
  if (lower.includes("contact") || lower.includes("phone") || lower.includes("call") || lower.includes("email")) return botResponses.contact;
  return botResponses.default;
};

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hello! Welcome to Sunita Real Estate. How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { text: userMsg, isBot: false }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: getResponse(userMsg), isBot: true }]);
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 bg-card rounded-xl shadow-2xl overflow-hidden z-50 border border-border"
          >
            <div className="gradient-gold p-4 flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-primary-foreground text-sm">Sunita Real Estate</h3>
                <p className="text-primary-foreground/80 text-xs">We typically reply instantly</p>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                      msg.isBot
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-secondary text-secondary-foreground text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary"
              />
              <Button size="icon" variant="gold" onClick={handleSend}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 gradient-gold rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-50"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </button>
    </>
  );
};

export default FloatingChatbot;
