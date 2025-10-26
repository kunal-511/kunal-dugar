import { motion } from "framer-motion";
import {  Heart, ArrowUp } from "lucide-react";
import {SiX as XIcon, SiGithub as GithubIcon, SiLinkedin as LinkedinIcon, SiGmail as GmailIcon} from "react-icons/si";
import { Button } from "./ui/button";

const Footer = () => {

    const socialLinks = [
        {
            icon: GithubIcon,
            href: "https://github.com/kunal-511",
            label: "GitHub",
            color: "hover:text-purple-400"
        },
        {
            icon: LinkedinIcon,
            href: "https://linkedin.com/in/KunalDugar2004",
            label: "LinkedIn",
            color: "hover:text-blue-400"
        },
        {
            icon: XIcon,
            href: "https://x.com/kunal_dugar",
            label: "Twitter",
            color: "hover:text-blue-400"
        },
        {
            icon: GmailIcon,
            href: "mailto:kunal0204.dugar@gmail.com",
            label: "Email",
            color: "hover:text-pink-400"
        },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative overflow-hidden border-t border-border/50">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-50" />
            <div className="absolute inset-0 bg-gradient-radial opacity-10" />

            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="flex flex-col items-center justify-center gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h3 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                            KD
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-md">
                            Building amazing software & contributing to open source
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4"
                    >
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                viewport={{ once: true }}
                                className={`p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 ${social.color} shadow-elegant hover:shadow-hover`}
                                aria-label={social.label}
                            >
                                <social.icon className="h-5 w-5" />
                            </motion.a>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-border to-transparent"
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground"
                    >
                        <p className="flex items-center gap-1">
                            Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> and lots of ☕
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground/60"
                    >
                        <span className="px-2 py-1 rounded-md bg-accent/5 border border-accent/10">Bun</span>
                        <span className="px-2 py-1 rounded-md bg-primary/5 border border-primary/10">React</span>
                        <span className="px-2 py-1 rounded-md bg-secondary/5 border border-secondary/10">TypeScript</span>
                        <span className="px-2 py-1 rounded-md bg-accent/5 border border-accent/10">Framer Motion</span>

                        
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute bottom-4 left-4 md:bottom-8 md:left-28"
            >
                <Button
                    size="icon"
                    onClick={scrollToTop}
                    className="rounded-full bg-gradient-primary hover:shadow-hover transition-all duration-300 shadow-elegant group"
                >
                    <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
                </Button>
            </motion.div>
        </footer>
    );
};

export default Footer;