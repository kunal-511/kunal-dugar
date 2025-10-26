import MagicBento from './MagicBento';
import { useTheme } from "../hooks/useTheme";

interface CardData {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
}

const About = () => {
  const { theme } = useTheme();

  const glowColor = theme === 'dark' ? '96, 165, 250' : '59, 130, 246'; 

  const aboutCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: '25+ Merged PRs',
      description: 'Contributing to major open-source projects with meaningful code contributions majority of which are for CNCF projects',
      label: '🎯 Contributions'
    },
    {
      color: 'hsl(var(--card))',
      title: 'Active participation in the open-source community',
      description: 'Creating small changes with big impact in open-source',
      label: '⭐ Impact'
    },
    {
      color: 'hsl(var(--card))',
      title: 'My Journey',
      description: "I'm a passionate Software Engineer pursuing a Dual Degree (Master of Science + Bachelor of Engineering) at Birla Institute of Technology and Science, Pilani. My journey in tech has been marked by significant contributions to open-source projects and cutting-edge development work.",
      label: '🚀 About'
    },
    {
      color: 'hsl(var(--card))',
      title: 'What I Do',
      description: 'I specialize in full-stack development with a strong focus on DevOps and cloud-native technologies. From building scalable web applications to contributing to major open-source projects like Kubeflow and Kubestellar, I thrive on solving complex technical challenges.',
      label: '💻 Expertise'
    },
    {
      color: 'hsl(var(--card))',
      title: 'Experience',
      description: 'I have been part of the Google Summer of Code and Linux Foundation, Cloud Native Computing Foundation (CNCF) projects and have experience of working in startups',
      label: '💼 Experience'
    },
    {
      color: 'hsl(var(--card))',
      title: 'BITS Pilani',
      description: 'Dual Degree: Master of Science + Bachelor of Engineering (Oct 2022 - May 2027)',
      label: '🎓 Education'
    }
  ];

  return (
    <section id="about" className="py-12 md:py-20 relative overflow-hidden flex justify-center items-center px-4 md:px-0">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      <div className="relative z-10 w-full">
        <MagicBento
          cardData={aboutCards}
          textAutoHide={false}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor={glowColor}
        />
      </div>
    </section>
  );
};

export default About;
