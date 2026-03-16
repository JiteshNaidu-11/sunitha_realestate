import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { blogs } from "@/data/mockData";
import BlogCard from "@/components/BlogCard";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";

const BlogDetail = () => {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);
  const relatedBlogs = blogs.filter((b) => b.slug !== slug).slice(0, 2);

  if (!blog) {
    return (
      <Layout>
        <div className="pt-32 pb-20 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Blog Not Found</h1>
          <Link to="/blogs" className="text-gold hover:underline mt-4 inline-block">Back to Blogs</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-24">
        <div className="h-[40vh] relative">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark/30" />
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/blogs" className="text-muted-foreground text-sm flex items-center gap-2 mb-6 hover:text-gold transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blogs
            </Link>

            <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4">{blog.category}</span>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{blog.title}</h1>

            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1"><User className="w-4 h-4" /> {blog.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(blog.date).toLocaleDateString()}</span>
            </div>

            <div
              className="prose prose-lg max-w-none mb-8 text-card-foreground/80 [&_h2]:font-display [&_h2]:text-foreground [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-4 [&_p]:leading-relaxed [&_p]:mb-4"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag) => (
                <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-3 pb-8 border-b border-border">
              <Share2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Share this article</span>
            </div>
          </motion.div>

          {/* Related */}
          {relatedBlogs.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedBlogs.map((b, i) => (
                  <BlogCard key={b.id} blog={b} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetail;
