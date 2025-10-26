import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiMedium, SiX } from "react-icons/si";

interface Blog {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  mediumUrl: string;
  thumbnail?: string;
  gradient?: string;
}

const blogs: Blog[] = [
  {
    title: "My GSoC Journey: Deploying Kubeflow with Helm Charts",
    description: "How I deployed Kubeflow with Helm Charts during my Google Summer of Code experience.",
    date: "2025-10-12",
    readTime: "7 min read",
    tags: ["GSoC", "Kubernetes", "Helm", "Deployment"],
    mediumUrl: "https://medium.com/@kunalD02/my-gsoc-journey-deploying-kubeflow-with-helm-charts-e7f9dea7b56e",
    thumbnail: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*M4w5GH48fSRyrBiCuOxoQw.png",
  },
  {
    title: "How I Got Selected for GSoC 2025 in Less Than a Month: A Kubeflow Journey",
    description: "How I got selected for Google Summer of Code 2025 in less than a month and my journey with Kubeflow before selection.",
    date: "2025-09-08",
    readTime: "4 min read",
    tags: ["GSoC", "CI/CD", "Best Practices", "Open Source", "Motivation"],
    mediumUrl: "https://medium.com/@kunalD02/how-i-got-selected-for-gsoc-2025-in-less-than-a-month-a-kubeflow-journey-ef66f66ab297",
    thumbnail: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*LUbCO0lwu57xz8PqlVjkrA.png",
  },
];

const BlogCard = ({ blog, index }: { blog: Blog; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="group relative"
    >
      <div className="rounded-xl backdrop-blur-md bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full flex flex-col shadow-elegant hover:shadow-hover overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${blog.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

        {blog.thumbnail && (
          <div className="relative w-full h-48 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${blog.gradient} opacity-30`} />
            <img
              src={blog.thumbnail}
              alt={`${blog.title} thumbnail`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-sm border border-white/20">
              <span className="text-xs font-semibold text-white flex items-center gap-1">
             <SiMedium className="h-4 w-4" />
                Medium
              </span>
            </div>
          </div>
        )}

        <div className="relative z-10 flex-1 p-6 flex flex-col">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(blog.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="mb-4 flex-1">
            <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">
              {blog.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {blog.description}
            </p>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Read More Button */}
          <div className="mt-auto">
            <Button
              size="sm"
              className="w-full bg-gradient-primary hover:shadow-hover transition-all duration-300 group/btn"
              asChild
            >
              <a href={blog.mediumUrl} target="_blank" rel="noopener noreferrer">
                <SiMedium className="mr-2 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                Read on Medium
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Blogs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blogs" ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Blog & Articles
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Sharing my experiences, learnings, and insights from open source and software development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.title} blog={blog} index={index} />
          ))}
        </div>

        {/* Follow Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="rounded-xl backdrop-blur-md bg-card/50 border border-border/50 p-8 shadow-elegant">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                Follow Me for More
              </h3>
              <p className="text-muted-foreground">
                Stay updated with my latest tech blogs, DevOps insights, and open source contributions
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-primary hover:shadow-hover transition-all duration-300 group min-w-[200px]"
                asChild
              >
                <a href="https://medium.com/@kunalD02" target="_blank" rel="noopener noreferrer">
                  <svg className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                  Follow on Medium
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10 hover:shadow-hover transition-all duration-300 group min-w-[200px]"
                asChild
              >
                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                  <SiX className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Follow on Twitter
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blogs;
