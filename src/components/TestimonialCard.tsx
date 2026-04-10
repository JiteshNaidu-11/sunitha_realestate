import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/data/types";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

const TestimonialCard = ({ testimonial, index = 0 }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
    >
      <Quote className="w-8 h-8 text-gold/30 mb-4" />
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < testimonial.rating ? "fill-gold text-gold" : "text-muted"}`}
          />
        ))}
      </div>
      <p className="text-card-foreground/80 text-sm leading-relaxed mb-4">
        "{testimonial.text}"
      </p>
      <p className="font-display font-semibold text-card-foreground">{testimonial.name}</p>
    </motion.div>
  );
};

export default TestimonialCard;
