import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiCplusplus,
  SiC,
  SiJavascript,
  SiTypescript,
  SiGo,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiReactquery,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiDocker,
  SiKubernetes,
  SiHelm,
  SiArgo,
  SiGithubactions,
  SiRust,
  SiFramer,
  SiPostman,
  SiCloudflare,
  SiSupabase,
  SiVercel,
  SiClerk,
  SiIstio
} from "react-icons/si";
import type { IconType } from "react-icons";
import Cubes from "./Cubes";

interface Skill {
  name: string;
  icon: IconType | (() => React.JSX.Element);
  color: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { name: "Rust", icon: SiRust, color: "#E5C17A" },
      { name: "C", icon: SiC, color: "#A8B9CC" }

    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Shadcn UI", icon: SiShadcnui, color: "#000000" },
      { name: "React Query", icon: SiReactquery, color: "#FF4154" },
      {name:"Framer Motion", icon: SiFramer, color: "#06D6A0" },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#000000" },
      { name: "WebSockets", icon: SiSocketdotio, color: "#010101" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
      { name: "RESTful APIs", icon: SiPostman, color: "#FC6D26" },
      {name:"cloudflare", icon: SiCloudflare, color: "#F38020" },
      {name:"supabase", icon: SiSupabase, color: "#F02D34" },
      {name:"clerk", icon: SiClerk, color: "#4A4A4A" },

    ]
  },
  {
    title: "DevOps & Cloud",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      { name: "Helm", icon: SiHelm, color: "#0F1689" },
      { name: "Argo CD", icon: SiArgo, color: "#EF7B4D" },
      { name: "Github Actions", icon: SiGithubactions, color: "#2088FF" },
      {name:"vercel", icon: SiVercel, color: "#ffffff" },
      {name:"istio", icon: SiIstio, color: "#2088FF" },
      {name:"aws", icon: () => <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/640px-Amazon_Web_Services_Logo.svg.png" alt="aws" className="w-10 h-10" />, color: "#4A4A4A" },
    ]
  }
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getGridSize = (skillCount: number) => {
    return Math.ceil(Math.sqrt(skillCount));
  };

  return (
    <section id="skills" ref={ref} className="py-20 relative overflow-hidden">
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
              Skills & Technologies
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-secondary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <div className="space-y-8 max-w-7xl mx-auto  ">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="flex flex-col items-center "
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {category.title}
                </span>
              </h3>

              <div className="flex justify-center items-center w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.2 + 0.2 }}
                  style={{
                    height: `${getGridSize(category.skills.length) * 180}px`,
                    position: 'relative',
                    width: '100%',
                    maxWidth: `${getGridSize(category.skills.length) * 180}px`
                  }}
                >
                  <Cubes
                    gridSize={getGridSize(category.skills.length)}
                    maxAngle={60}
                    radius={3}
                    borderStyle="2px dashed rgba(16, 185, 129, 0.3)"
                    faceColor="rgba(15, 23, 42, 0.6)"
                    rippleColor="rgba(16, 185, 129, 0.8)"
                    rippleSpeed={1.5}
                    autoAnimate={true}
                    rippleOnClick={true}
                    skills={category.skills}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
