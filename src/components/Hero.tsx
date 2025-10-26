import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, ChevronDown } from "lucide-react";
import { SiGithub, SiLinkedin, SiGmail } from "react-icons/si";
import { useEffect, useState } from "react";
import SplitText from "./SplitText";
import GradientBlinds from "./GradientBlinds";
import { useTheme } from "../hooks/useTheme";
import { SiMedium as MediumIcon } from "react-icons/si";

const TypeWriter = ({ text, delay = 50 }: { text: string; delay?: number }) => {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, delay]);

    return <span>{currentText}</span>;
};

const Hero = () => {
    const { theme } = useTheme();
    const techStack = [
        "React", "TypeScript", "Node.js", "Kubernetes", "Docker","C++",
        "Go", "PostgreSQL", "Next.js", "Tailwind CSS"
    ];

    const getGradientColors = (): string[] => {
        if (typeof window === 'undefined') return ['#3B82F6', '#60A5FA'];

        const styles = getComputedStyle(document.documentElement);
        const color1 = styles.getPropertyValue('--gradient-blinds-bg-1').trim() || '#3B82F6';
        const color2 = styles.getPropertyValue('--gradient-blinds-bg-2').trim() || '#60A5FA';

        return [color1, color2];
    };

    const gradientColors = getGradientColors();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <GradientBlinds
                key={theme}
                className="absolute inset-0 z-0"
                gradientColors={gradientColors}
                angle={0}
                noise={0.3}
                blindCount={16}
                blindMinWidth={60}
                spotlightRadius={0.6}
                spotlightSoftness={0.8}
                spotlightOpacity={0.8}
                mouseDampening={0}
                distortAmount={0}
                shineDirection="left"
                mixBlendMode="normal"
                paused={false}
            />

            <div className="relative z-10 container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-8"
                >
                    <SplitText
                        text="Kunal Dugar"
                        tag="h1"
                        className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent"
                        delay={80}
                        duration={0.8}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 50, rotateX: -90 }}
                        to={{ opacity: 1, y: 0, rotateX: 0 }}
                        threshold={0.2}
                        rootMargin="-50px"
                        textAlign="center"
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-mono"
                    >
                        <TypeWriter text="Software Engineer & Open Source Contributor" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        whileHover={{ scale: 1.02, boxShadow: "var(--shadow-hover)" }}
                        className="max-w-2xl mx-auto p-6 rounded-xl backdrop-blur-md bg-[0,0,10] border border-border/50 shadow-elegant hover:border-primary/30 transition-all duration-300"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-3 h-3 rounded-full bg-destructive" />
                            <div className="w-3 h-3 rounded-full bg-accent" />
                            <div className="w-3 h-3 rounded-full bg-primary" />
                        </div>
                        <div className="font-mono text-left text-sm md:text-base">
                            <span className="text-accent">$</span> <span className="text-muted-foreground">tech_stack --list</span>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {techStack.map((tech, index) => (
                                    <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.8 + index * 0.1 }}
                                        className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="flex flex-wrap gap-4 justify-center items-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-primary text-primary-foreground hover:shadow-hover transition-all duration-300 hover:scale-105"
                                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                View Projects
                            </Button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-primary/50 text-foreground hover:bg-primary/10 hover:shadow-hover transition-all duration-300 hover:scale-105"
                                asChild
                            >
                                <a href="/Kunal_Dugar_Resume.pdf" download>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Resume
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="flex gap-4 justify-center"
                    >
                        <motion.a
                            href="https://github.com/kunal-511"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-4 rounded-full bg-gradient-primary backdrop-blur-md border border-primary/30 hover:border-primary hover:shadow-hover transition-all duration-300"
                        >
                            <SiGithub className="h-6 w-6 text-primary-foreground" />
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com/in/KunalDugar2004"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-4 rounded-full bg-gradient-primary backdrop-blur-md border border-primary/30 hover:border-primary hover:shadow-hover transition-all duration-300"
                        >
                            <SiLinkedin className="h-6 w-6 text-primary-foreground" />
                        </motion.a>
                        <motion.a
                            href="mailto:kunal0204.dugar@gmail.com"
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-4 rounded-full bg-gradient-primary backdrop-blur-md border border-primary/30 hover:border-primary hover:shadow-hover transition-all duration-300"
                        >
                            <SiGmail className="h-6 w-6 text-primary-foreground" />
                        </motion.a>
                        <motion.a
                            href="https://medium.com/@kunalD02"
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-4 rounded-full bg-gradient-primary backdrop-blur-md border border-primary/30 hover:border-primary hover:shadow-hover transition-all duration-300"
                        >
                            <MediumIcon className="h-6 w-6 text-primary-foreground" />
                        </motion.a>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <ChevronDown className="h-8 w-8 text-primary" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
