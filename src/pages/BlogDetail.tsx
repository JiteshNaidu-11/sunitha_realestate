import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { blogs } from "@/data/mockData";
import BlogCard from "@/components/BlogCard";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";

const BlogDetail = () => {
  const { slug } = useParams();

  const blog = blogs.find((b) => b.slug === slug);

  const relatedBlogs = blogs
    .filter((b) => b.slug !== slug)
    .slice(0, 2);

  if (!blog) {
    return (
      <Layout>
        <div className="pt-32 pb-20 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Blog Not Found
          </h1>

          <Link
            to="/blogs"
            className="text-gold hover:underline mt-4 inline-block"
          >
            Back to Blogs
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-24 bg-[#F6F1E8]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/blogs"
                className="text-muted-foreground text-sm flex items-center gap-2 mb-8 hover:text-gold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
              </Link>

              <span className="inline-flex items-center bg-gold text-white text-xs tracking-[0.18em] uppercase font-semibold px-4 py-2 rounded-full mb-6">
                {blog.category}
              </span>

              <h1 className="font-display text-4xl md:text-5xl leading-[1.15] font-bold text-black mb-8">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-10">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {blog.author}
                </span>

                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(blog.date).toLocaleDateString()}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white border border-black/5 text-black text-xs px-4 py-2 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[350px] md:h-[500px] object-cover rounded-[32px] shadow-xl"
              />

              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Article */}
      <section className="bg-[#F6F1E8] pb-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[28px] border border-black/5 shadow-sm overflow-hidden"
          >

            <div className="px-6 md:px-12 lg:px-16 py-12">

              <div
                className="
                  prose
                  prose-neutral
                  max-w-none

                  [&_p]:text-[16px]
                  md:[&_p]:text-[17px]
                  [&_p]:leading-8
                  [&_p]:text-[#444]
                  [&_p]:mb-6

                  [&_h2]:font-display
                  [&_h2]:text-2xl
                  md:[&_h2]:text-3xl
                  [&_h2]:font-bold
                  [&_h2]:text-black
                  [&_h2]:mt-14
                  [&_h2]:mb-6
                  [&_h2]:leading-tight

                  [&_ul]:my-8
                  [&_ul]:pl-5

                  [&_li]:text-[16px]
                  [&_li]:leading-8
                  [&_li]:mb-2

                  [&_blockquote]:border-l-4
                  [&_blockquote]:border-gold
                  [&_blockquote]:bg-[#FAF7F2]
                  [&_blockquote]:rounded-r-2xl
                  [&_blockquote]:px-6
                  [&_blockquote]:py-5
                  [&_blockquote]:my-10
                  [&_blockquote]:text-[18px]
                  [&_blockquote]:leading-8
                  [&_blockquote]:italic
                  [&_blockquote]:font-medium
                  [&_blockquote]:text-black

                  [&_strong]:text-black
                  [&_strong]:font-semibold
                "
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Share */}
              <div className="flex items-center gap-3 pt-10 mt-10 border-t border-black/5">
                <Share2 className="w-4 h-4 text-muted-foreground" />

                <span className="text-sm text-muted-foreground">
                  Share this article
                </span>
              </div>

            </div>
          </motion.div>

          {/* Related Blogs */}
          {relatedBlogs.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-3xl font-bold text-foreground mb-10">
                Related Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedBlogs.map((b, i) => (
                  <BlogCard
                    key={b.id}
                    blog={b}
                    index={i}
                  />
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