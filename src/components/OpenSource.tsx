import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { GitPullRequest, GitMerge, ExternalLink, MessageSquare, GitBranch, Code2, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pullRequests, type PullRequest  } from "@/data/pullrequests";

const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};



const PRCard = ({ pr, index }: { pr: PullRequest; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const statusConfig = {
    merged: {
      icon: GitMerge,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      label: "Merged",
      glowColor: "rgba(168, 85, 247, 0.4)"
    },
    open: {
      icon: GitPullRequest,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      label: "Open",
      glowColor: "rgba(34, 197, 94, 0.4)"
    },
    closed: {
      icon: GitPullRequest,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      label: "Closed",
      glowColor: "rgba(239, 68, 68, 0.4)"
    }
  };

  const status = statusConfig[pr.status];
  const StatusIcon = status.icon;

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        boxShadow: "0 2px 8px -2px rgba(0, 0, 0, 0.08)",
      });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      transition={{
        duration: 0.5,
        delay: index * 0.03,
        ease: "easeOut"
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      onHoverStart={() => {
        setIsHovered(true);
        controls.start({
          boxShadow: `0 20px 40px ${status.glowColor}`,
          transition: { duration: 0.3 }
        });
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        controls.start({
          boxShadow: "0 2px 8px -2px rgba(0, 0, 0, 0.08)",
          transition: { duration: 0.3 }
        });
      }}
      style={{ minHeight: '400px' }}
      className="group relative h-full"
    >
      <div className="rounded-xl backdrop-blur-md bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full flex flex-col shadow-elegant overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 0.1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-xl"
          style={{
            background: `linear-gradient(45deg, ${status.glowColor}, transparent)`,
            filter: "blur(20px)",
            zIndex: -1
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isHovered ? [0, 1, 0] : 0,
            scale: isHovered ? [0, 1.2, 0] : 0,
            rotate: isHovered ? [0, 180, 360] : 0
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
          className="absolute top-2 right-2 z-20"
        >
          <Sparkles className="h-4 w-4 text-primary" />
        </motion.div>

        <div className="relative z-10 p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5, type: "spring" }}
                className={`p-2 rounded-lg ${status.bgColor} ${status.borderColor} border`}
              >
                <motion.div
                  animate={isHovered ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{
                    duration: 0.6,
                    repeat: isHovered ? Infinity : 0,
                    repeatDelay: 0.5
                  }}
                >
                  <StatusIcon className={`h-4 w-4 ${status.color}`} />
                </motion.div>
              </motion.div>
              <div>
                <p className="text-xs text-muted-foreground">#{pr.number}</p>
                <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors"
            >
              <a href={pr.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </motion.div>
          </div>

          <div className="mb-3">
            <p className="text-xs text-muted-foreground mb-1">{pr.organization}</p>
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {pr.repo}
            </h3>
          </div>

          <motion.h4
            className="text-base font-bold text-foreground mb-2 line-clamp-2 leading-snug"
            animate={isHovered ? { x: [0, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {pr.title}
          </motion.h4>

          <motion.p
            className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed"
            animate={isHovered ? { opacity: [0.7, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {pr.description}
          </motion.p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {pr.labels.slice(0, 3).map((label, idx) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: index * 0.05 + idx * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-2 py-0.5 text-[10px] rounded-md bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors cursor-default"
              >
                {label}
              </motion.span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {pr.stats.additions !== undefined && (
              <motion.div
                className="flex items-center gap-1.5 text-xs"
                whileHover={{ scale: 1.05, x: 2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  animate={isHovered ? { rotate: 360 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <Code2 className="h-3 w-3 text-green-500" />
                </motion.div>
                <span className="text-green-500 font-mono">+{pr.stats.additions}</span>
                {pr.stats.deletions !== undefined && (
                  <span className="text-red-500 font-mono">-{pr.stats.deletions}</span>
                )}
              </motion.div>
            )}
            {pr.stats.comments !== undefined && (
              <motion.div
                className="flex items-center gap-1.5 text-xs"
                whileHover={{ scale: 1.05, x: 2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
                >
                  <MessageSquare className="h-3 w-3 text-muted-foreground" />
                </motion.div>
                <span className="text-muted-foreground">{pr.stats.comments}</span>
              </motion.div>
            )}
            {pr.stats.files !== undefined && (
              <motion.div
                className="flex items-center gap-1.5 text-xs"
                whileHover={{ scale: 1.05, x: 2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  animate={isHovered ? { rotate: [0, 15, -15, 0] } : {}}
                  transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
                >
                  <GitBranch className="h-3 w-3 text-muted-foreground" />
                </motion.div>
                <span className="text-muted-foreground">{pr.stats.files} files</span>
              </motion.div>
            )}
            <motion.div
              className="flex items-center gap-1.5 text-xs"
              whileHover={{ scale: 1.05, x: 2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{pr.date}</span>
            </motion.div>
          </div>

          <motion.div
            className="flex items-center justify-between pt-3 border-t border-border/50"
            animate={isHovered ? { borderColor: "rgba(59, 130, 246, 0.3)" } : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-1.5">
              <motion.div
                animate={isHovered ? {
                  scale: [1, 1.3, 1],
                  rotate: [0, 360]
                } : {}}
                transition={{ duration: 0.6 }}
              >
                <CheckCircle2 className="h-3 w-3 text-primary" />
              </motion.div>
              <span className="text-xs text-muted-foreground">Contribution</span>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs hover:bg-primary/10 hover:text-primary transition-all"
                asChild
              >
                <a href={pr.link} target="_blank" rel="noopener noreferrer">
                  View PR
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const OpenSource = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [githubStats, setGithubStats] = useState({
    totalPRs: 0,
    mergedPRs: 0,
    organizations: 0,
    reposContributed: 0,
    isLoading: true
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setGithubStats(prev => ({ ...prev, isLoading: true }));

        const username = 'kunal-511';
        const response = await fetch(
          `https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=100`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          const totalPRs = data.total_count;

          const mergedResponse = await fetch(
            `https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged&per_page=100`,
            {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
              }
            }
          );

          let mergedPRs = 0;
          if (mergedResponse.ok) {
            const mergedData = await mergedResponse.json();
            mergedPRs = mergedData.total_count;
          }

          const allPRsResponse = await fetch(
            `https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=100`,
            {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
              }
            }
          );

          let reposContributed = 0;
          let organizations = 0;
          if (allPRsResponse.ok) {
            const allPRsData = await allPRsResponse.json();
            const repos = new Set(
              allPRsData.items.map((pr: { repository_url: string }) => pr.repository_url)
            );
            reposContributed = repos.size;

            const orgs = new Set(
              allPRsData.items.map((pr: { repository_url: string }) => {
                const match = pr.repository_url.match(/repos\/([^/]+)\//);
                return match ? match[1] : null;
              }).filter(Boolean)
            );
            organizations = orgs.size;
          }

          setGithubStats(prev => ({
            ...prev,
            totalPRs,
            mergedPRs,
            organizations,
            reposContributed,
            isLoading: false
          }));
        } else {
          const uniqueRepos = new Set(pullRequests.map(pr => pr.repo));
          const uniqueOrgs = new Set(pullRequests.map(pr => pr.organization));
          setGithubStats(prev => ({
            ...prev,
            totalPRs: pullRequests.length,
            mergedPRs: pullRequests.filter(pr => pr.status === "merged").length,
            organizations: uniqueOrgs.size,
            reposContributed: uniqueRepos.size,
            isLoading: false
          }));
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
        const uniqueRepos = new Set(pullRequests.map(pr => pr.repo));
        const uniqueOrgs = new Set(pullRequests.map(pr => pr.organization));
        setGithubStats(prev => ({
          ...prev,
          totalPRs: pullRequests.length,
          mergedPRs: pullRequests.filter(pr => pr.status === "merged").length,
          organizations: uniqueOrgs.size,
          reposContributed: uniqueRepos.size,
          isLoading: false
        }));
      }
    };

    fetchGitHubStats();
  }, []);

  const totalPRs = githubStats.totalPRs;
  const mergedPRs = githubStats.mergedPRs;
  const organizations = githubStats.organizations;
  const reposContributed = githubStats.reposContributed;

  return (
    <section id="opensource" ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Open Source Contributions
            </span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-gradient-primary mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p
            className="text-muted-foreground mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Contributing to major open-source projects and helping build the future of cloud-native technologies
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-4 rounded-xl backdrop-blur-md bg-card/50 border border-border/50 hover:border-primary/50 text-center transition-all shadow-elegant hover:shadow-hover"
          >
            {githubStats.isLoading ? (
              <div className="h-9 mb-1 flex items-center justify-center">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-8 w-16 bg-primary/20 rounded"
                />
              </div>
            ) : (
              <motion.p
                className="text-3xl font-bold text-primary mb-1"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <AnimatedCounter value={totalPRs} />
              </motion.p>
            )}
            <p className="text-xs text-muted-foreground">Total PRs</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-4 rounded-xl backdrop-blur-md bg-card/50 border border-border/50 hover:border-purple-500/50 text-center transition-all shadow-elegant hover:shadow-hover"
          >
            {githubStats.isLoading ? (
              <div className="h-9 mb-1 flex items-center justify-center">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="h-8 w-16 bg-purple-500/20 rounded"
                />
              </div>
            ) : (
              <motion.p
                className="text-3xl font-bold text-purple-500 mb-1"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <AnimatedCounter value={mergedPRs} />
              </motion.p>
            )}
            <p className="text-xs text-muted-foreground">Merged</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-4 rounded-xl backdrop-blur-md bg-card/50 border border-border/50 hover:border-green-500/50 text-center transition-all shadow-elegant hover:shadow-hover"
          >
            {githubStats.isLoading ? (
              <div className="h-9 mb-1 flex items-center justify-center">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="h-8 w-16 bg-green-500/20 rounded"
                />
              </div>
            ) : (
              <motion.p
                className="text-3xl font-bold text-green-500 mb-1"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              >
                <AnimatedCounter value={organizations} />
              </motion.p>
            )}
            <p className="text-xs text-muted-foreground">Organizations</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-4 rounded-xl backdrop-blur-md bg-card/50 border border-border/50 hover:border-orange-500/50 text-center transition-all shadow-elegant hover:shadow-hover"
          >
            {githubStats.isLoading ? (
              <div className="h-9 mb-1 flex items-center justify-center">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                  className="h-8 w-16 bg-orange-500/20 rounded"
                />
              </div>
            ) : (
              <motion.p
                className="text-3xl font-bold text-orange-500 mb-1"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                <AnimatedCounter value={reposContributed} />
              </motion.p>
            )}
            <p className="text-xs text-muted-foreground">Repos Contributed</p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {pullRequests.map((pr, index) => (
            <PRCard key={`${pr.repo}-${pr.number}`} pr={pr} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="mt-12 text-center"
        >
          <motion.div
            className="inline-block p-6 rounded-xl backdrop-blur-md bg-card/30 border border-border/50 hover:border-primary/50 transition-all shadow-elegant hover:shadow-hover"
            whileHover={{
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)",
            }}
          >
            <motion.p
              className="text-muted-foreground mb-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1 }}
            >
              <span className="font-semibold text-foreground">More contributions</span> and detailed project insights in my
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="border-primary/50 text-foreground hover:bg-primary/10 transition-all duration-300"
                asChild
              >
                <a href="https://www.notion.so/Kunal-Dugar-Open-Source-Contributions-2518ca46505f80c5bff7d211acca986f" target="_blank" rel="noopener noreferrer">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="inline-block mr-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </motion.div>
                  Notion Dashboard
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenSource;
