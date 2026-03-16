import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { Blog } from "@/data/types";
import { motion } from "framer-motion";

interface BlogCardProps {
  blog: Blog;
  index?: number;
}

const BlogCard = ({ blog, index = 0 }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            {blog.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-card-foreground mb-2 line-clamp-2 group-hover:text-gold transition-colors">
          {blog.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{blog.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1"><User className="w-3 h-3" />{blog.author}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(blog.date).toLocaleDateString()}</span>
        </div>
        <Link
          to={`/blogs/${blog.slug}`}
          className="text-sm font-semibold text-gold hover:underline"
        >
          Read More →
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
