import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiGithub as GithubIcon } from "react-icons/si";

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github?: string;
  demo?: string;
  preview?: string;
  thumbnail: string;
  gradient?: string;
}

const projects: Project[] = [
  {
    title: "BeatWave",
    description: "Full-stack music streaming platform with real-time chat",
    longDescription: "Developed full-stack music streaming web application with seamless playback experience and user-friendly interface. Integrated real-time chat functionality using WebSockets enabling social interaction between users during music sessions. Deployed using Docker containerization and Kubernetes orchestration ensuring scalability and reliability.",
    tech: ["Express.js", "TypeScript", "React.js", "WebSocket", "Docker", "Kubernetes", "Helm", "Argo CD"],
    github: "https://github.com/kunal-511/beatwave",
    preview: "https://beatwave-ncb1.onrender.com/",
    thumbnail: "/projects/beatwave.png",
  },
  {
    title: "Twitter Clone",
    description: "Comprehensive social media platform with MERN stack",
    longDescription: "Built comprehensive Twitter clone using MERN stack implementing core features including user authentication, post creation, and real-time updates. Designed and deployed RESTful APIs with Node.js and Express.js utilizing React, Material-UI, and React Query for responsive modern UI. Integrated JWT authentication and Cloudinary media storage with MongoDB data management.",
    tech: ["Express.js", "Node.js", "MongoDB", "Docker", "Kubernetes", "React.js", "Material-UI", "React Query", "Tailwind CSS"],
    github: "https://github.com/kunal-511/twitter",
    preview: "https://twitter-o0cr.onrender.com/",
    thumbnail: "/projects/twitter.png",
  },
  {
    title: "Weekendly",
    description: "Weekend planning application with intelligent features and seamless integrations",
    longDescription: "A comprehensive weekend planning application that helps users discover, plan, and share their perfect weekend itineraries with intelligent features and seamless integrations.",
    tech: ["Next.js", "Typescript", "Tailwind CSS", "Shadcn UI", "DND kit", "Indexed DB","React Context", "Google Maps API" ],
    github: "https://github.com/kunal-511/weekendly",
    preview: "https://weekendly-ecru.vercel.app/",
    thumbnail: "/projects/weekendly.png",
  },
  {
    title: "GitIntel",
    description: "Analyze and compare open source projects instantly.",
    longDescription: "A Next.js application for analyzing competition in open source GitHub projects. GitIntel helps you discover, compare, and analyze GitHub repositories to understand the competitive landscape in any technology domain. ",
    tech: ["Next.js", "Typescript", "Prisma", "PostgreSQL", "Zod","NextAuth", "Tailwind CSS", "Shadcn UI", "Resend", "Recharts" ],
    github: "https://github.com/kunal-511/gitintel",
    preview: "https://git-intel-kappa.vercel.app/",
    thumbnail: "/projects/gitintel.png",
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

        {project.thumbnail && (
          <div className="relative w-full h-48 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
            <img
              src={project.thumbnail}
              alt={`${project.title} thumbnail`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}

        <div className="relative z-10 flex-1 p-6">
          <div className="mb-4">
            <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground">
              {project.description}
            </p>
          </div>

          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {project.longDescription}
          </p>

          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3 text-foreground">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-auto">
            {project.github && (
              <Button
                variant="outline"
                size="sm"
                className="border-primary/50 text-foreground hover:bg-primary/10 hover:shadow-hover transition-all duration-300"
                asChild
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
            )}
            {project.preview && (
              <Button
                size="sm"
                className="bg-gradient-primary hover:shadow-hover transition-all duration-300"
                asChild
              >
                <a href={project.preview} target="_blank" rel="noopener noreferrer">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </a>
              </Button>
            )}
            {project.demo && (
              <Button
                size="sm"
                variant="outline"
                className="border-secondary/50 text-foreground hover:bg-secondary/10 hover:shadow-hover transition-all duration-300"
                asChild
              >
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="py-20 relative overflow-hidden">
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
              Featured Projects
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A showcase of my best work in software development and cloud-native technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
