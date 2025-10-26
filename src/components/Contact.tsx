import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, MapPin, Send, Copy, Check } from "lucide-react";
import {SiX as XIcon, SiGithub as GithubIcon, SiLinkedin as LinkedinIcon, SiGmail as GmailIcon} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "../../hooks/use-toast";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopy = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
      toast({
        title: "Copied!",
        description: `${type === 'email' ? 'Email' : 'Phone number'} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Kunal",
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: GmailIcon,
      label: "Email",
      value: "kunal0204.dugar@gmail.com",
      link: "mailto:kunal0204.dugar@gmail.com",
      copyable: true,
      type: 'email' as const
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 85880-10268",
      link: "tel:+918588010268",
      copyable: true,
      type: 'phone' as const
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Pilani, India",
      link: null,
      copyable: false,
      type: 'email' as const  
    }
  ];

  const socialLinks = [
    {
      icon: GithubIcon,
      label: "GitHub",
      link: "https://github.com/kunal-511",
      color: "primary"
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      link: "https://linkedin.com/in/KunalDugar2004",
      color: "secondary"
    },
    {
      icon: XIcon,
      label: "Twitter",
      link: "https://x.com/kunal_dugar",
      color: "secondary"
    }
  ];

  return (
    <section id="contact" ref={ref} className="py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
          <p className="text-sm md:text-base text-muted-foreground mt-3 md:mt-4 max-w-2xl mx-auto px-4">
            Have a project in mind or want to collaborate? Let&apos;s connect!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 md:space-y-6"
          >
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="p-3 md:p-4 rounded-xl backdrop-blur-md bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 group shadow-elegant hover:shadow-hover"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                      <div className="p-2 md:p-3 rounded-lg bg-gradient-primary group-hover:shadow-hover transition-all duration-300 flex-shrink-0">
                        <info.icon className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs md:text-sm text-muted-foreground">{info.label}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-sm md:text-base text-foreground hover:text-primary transition-colors font-medium break-all"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm md:text-base text-foreground font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                    {info.copyable && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(info.value, info.type)}
                        className="hover:bg-primary/10 flex-shrink-0"
                      >
                        {(info.type === 'email' ? copiedEmail : copiedPhone) ? (
                          <Check className="h-4 w-4 text-accent" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="p-4 md:p-6 rounded-xl backdrop-blur-md bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 shadow-elegant hover:shadow-hover"
            >
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Connect with me</h3>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 p-3 md:p-4 rounded-lg bg-gradient-primary hover:shadow-hover transition-all duration-300 flex items-center justify-center gap-2 group shadow-elegant"
                  >
                    <social.icon className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                    <span className="text-sm md:text-base text-primary-foreground font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 md:p-6 rounded-xl backdrop-blur-md bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 space-y-4 md:space-y-6 shadow-elegant hover:shadow-hover"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors resize-none min-h-[120px] md:min-h-[150px]"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-primary cursor-pointer hover:shadow-hover transition-all duration-300 shadow-elegant disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
