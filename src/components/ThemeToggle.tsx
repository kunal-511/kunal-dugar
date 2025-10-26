import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import {useTheme} from "../../hooks/useTheme"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-primary backdrop-blur-md border border-primary/30 hover:border-accent transition-all duration-300 hover:shadow-hover shadow-elegant"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1, rotate: 15 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180, scale: theme === "dark" ? 1 : 0.8 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      >
        {theme === "dark" ? (
          <Sun className="h-6 w-6 text-primary-foreground" />
        ) : (
          <Moon className="h-6 w-6 text-primary-foreground" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
