import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, ChevronDown } from "lucide-react";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  logo: string;
  color: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Engineer Intern",
    company: "Google Summer of Code, Kubeflow",
    location: "Remote",
    period: "Jun 2025 - Oct 2025",
    logo: "https://avatars.githubusercontent.com/u/33164907?s=200&v=4",
    color: "primary",
    responsibilities: [
      "Developed production-grade Helm charts for 5 core Kubeflow components, enabling flexible one-command deployment of ML infrastructure and reducinreducing setup time by 80% for enterprise teams",
      "Designed and implemented end-to-end testing infrastructure for full Kubeflow AI reference paltform, automating integration tests across multiple components and improving development workflow efficiency",
      "Created automated diff validation system to maintain 100% parity between Helm and Kustomize deployments across 50+ scenarios, ensuring reliability and catching configuration drift early"
    ]
  },
  {
    title: "Software Engineer Mentee",
    company: "Linux Foundation, Cloud Native Computing Foundation (CNCF)",
    location: "Remote",
    period: "Mar 2025 - May 2025",
    logo: "https://avatars.githubusercontent.com/u/134407106?s=200&v=4",
    color: "secondary",
    responsibilities: [
      "Contributed 40+ merged pull requests to Kubestellar organization, significantly enhancing project functionality and improving user experience",
      "Developed end-to-end Binding Policy and automated cluster onboarding features with intuitive drag-and-drop interface",
      "Automated cluster onboarding of the kubestellar reference platform, reducing onboarding time by 70% for new users",
      "Gained expertise in multi-cluster workload assignment and management within Kubernetes environments"
    ]
  },
  {
    title: "Frontend Developer Intern",
    company: "EightGen AI (now juststock.ai)",
    location: "Remote",
    period: "Dec 2024 - Feb 2025",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQHdUlGLLjJrUQ/company-logo_100_100/company-logo_100_100/0/1710413613376/eightgen_logo?e=1762992000&v=beta&t=ZvJ0feKamddemFSiCxpGbt_oS-hLJl1pQI01S46LTGY",
    color: "accent",
    responsibilities: [
      "Developed complete frontend architecture for stock analysis web application using React and TypeScript and integrating it with the backend API. Optimized application performance and user experience handling large datasets and complex calculations",
      "Built comprehensive stock dashboard with CoPilot integration for automated annual report analysis",
      "Implemented responsive design using Shadcn UI components delivering seamless user experience",
    ]
  }
];

const ExperienceCard = ({ exp, index }: { exp: ExperienceItem; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <motion.div 
        whileHover={{ scale: 1.02, y: -5 }}
        className="p-6 rounded-xl backdrop-blur-md bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer group hover:shadow-hover shadow-elegant"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4">
          <div className={`p-4 rounded-lg ${exp.color === 'primary' ? 'border-2 border-primary' : exp.color === 'accent' ? 'border-2 border-accent' : 'border-2 border-secondary'} text-4xl shadow-elegant`}>
            <img src={exp.logo} alt={exp.company} className="w-10 h-10" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {exp.title}
                </h3>
                <p className="text-lg text-muted-foreground">{exp.company}</p>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {exp.location}
              </span>
              <span>{exp.period}</span>
            </div>

            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="space-y-3 mt-4">
                {exp.responsibilities.map((resp, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <p className="text-primary">▹</p>
                    <p>{resp}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="py-20 relative overflow-hidden">
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
              Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-secondary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            My journey as a software engineer and open source contributor
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
