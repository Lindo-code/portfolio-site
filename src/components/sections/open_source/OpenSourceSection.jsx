import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiGithub,
  FiGitPullRequest,
  FiAlertCircle,
  FiLock,
  FiCheckCircle,
  FiCode,
} from "react-icons/fi";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./OpenSourceShowcase.css";

const OpenSourceSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("lg"));
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [stats, setStats] = useState({
    publicRepos: 30,
    privateRepos: 60,
    totalReviews: 397,
    recentActivity: [],
    totalContributions: 0,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  useEffect(() => {
    const updateStats = (data) => {
      const privateRepos = (data.repos || []).filter(
        (repo) => repo.private,
      ).length;
      const publicRepos = data.user?.public_repos || 0;
      const totalReviews = data.reviews?.total_count || 0;

      // Only process events if they exist and came from API
      const shouldShowActivity = data.events && data.source !== "fallback";
      const recentActivity = shouldShowActivity
        ? processActivityData(data.events)
        : [];

      setStats({
        publicRepos,
        privateRepos,
        totalReviews,
        recentActivity,
        totalContributions: publicRepos + privateRepos + totalReviews,
      });
    };

    const fetchGitHubData = async () => {
      const ONE_HOUR = 3600000;
      const now = Date.now();

      // 1. Check for fresh cache
      try {
        const cachedData = localStorage.getItem("githubStats");
        const lastFetchTime = localStorage.getItem("lastFetchTime");

        if (
          cachedData &&
          lastFetchTime &&
          now - parseInt(lastFetchTime) < ONE_HOUR
        ) {
          updateStats({ ...JSON.parse(cachedData), source: "cache" });
          return;
        }
      } catch (e) {
        console.warn("Cache read failed:", e);
      }

      // 2. Try fresh API fetch
      try {
        const response = await fetch(
          "https://purple-cherry-17b4.sdrowvieli1.workers.dev/github-stats",
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const freshData = await response.json();
        localStorage.setItem("githubStats", JSON.stringify(freshData));
        localStorage.setItem("lastFetchTime", now.toString());
        updateStats({ ...freshData, source: "api" });
        console.log("Data", freshData);
        return;
      } catch (apiError) {
        console.warn("API fetch failed:", apiError.message);
      }

      // 3. Fallback to static JSON
      try {
        const fallbackResponse = await fetch("/github-stats-fallback.json");
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          updateStats({ ...fallbackData, source: "fallback" });
          return;
        }
      } catch (jsonError) {
        console.warn("Static fallback failed:", jsonError);
      }

      // 4. Final fallback to stale cache
      try {
        const cachedData = localStorage.getItem("githubStats");
        if (cachedData)
          updateStats({ ...JSON.parse(cachedData), source: "stale-cache" });
      } catch (e) {
        console.error("All data sources failed", e);
        updateStats({
          user: { public_repos: 0 },
          repos: [],
          reviews: { total_count: 0 },
          events: [],
          source: "empty",
        });
      }
    };

    fetchGitHubData();
  }, []);

  const processActivityData = (events) => {
    return events
      .filter((event) =>
        ["PullRequestEvent", "IssuesEvent", "PullRequestReviewEvent"].includes(
          event.type,
        ),
      )
      .slice(0, 3)

      .map((event) => {
        const eventDate = new Date(event.created_at);
        let description = "";
        let icon = null;

        if (event.type === "PullRequestReviewEvent") {
          description = `Reviewed PR (${event.payload.review.state})`;
          icon = <FiCheckCircle />;
        } else if (event.type === "PullRequestEvent") {
          description = `Pull Request ${event.payload.action}`;
          icon = <FiGitPullRequest />;
        } else {
          description = `Issue ${event.payload.action}`;
          icon = <FiAlertCircle />;
        }

        return {
          type: event.type.includes("PullRequest") ? "PR" : "ISSUE",
          repo: event.repo.name.split("/")[1],
          description,
          icon,
          time: eventDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          date: eventDate.toLocaleDateString(),
          state: event.payload.review?.state || event.payload.action,
        };
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      style={sectionStyle}
    >
      <motion.div variants={containerVariants} style={metricsGridStyle}>
        <motion.a
          href="https://github.com/Lindo-code"
          target="_blank"
          rel="noopener noreferrer"
          style={{ all: "unset", display: "block", cursor: "pointer" }}
          variants={itemVariants}
        >
          <MetricCard
            title="Public Repos"
            value={`${stats.publicRepos}+`}
            icon={<FiGithub />}
            color="#4ECDC4"
          />
        </motion.a>

        <motion.a
          href="https://github.com/Lindo-code"
          style={{ all: "unset", display: "block", cursor: "pointer" }}
          variants={itemVariants}
        >
          <MetricCard
            title="Private Work"
            value={`${stats.privateRepos}+`}
            icon={<FiLock />}
            color="#9B5DE5"
          />
        </motion.a>

        <motion.a
          href="https://github.com/Lindo-code"
          target="_blank"
          rel="noopener noreferrer"
          style={{ all: "unset", display: "block", cursor: "pointer" }}
          variants={itemVariants}
        >
          <MetricCard
            title="Code Reviews"
            value={`${stats.totalReviews}+`}
            icon={<FiCheckCircle />}
            color="#FFBE0B"
          />
        </motion.a>

        <MetricCard
          title="Total Activity"
          value={`${stats.totalReviews + stats.privateRepos + stats.publicRepos}+`}
          icon={<FiCode />}
          color="#FF6B6B"
          variants={itemVariants}
        />
      </motion.div>
      <motion.div variants={itemVariants} style={activityContainerStyle}>
        <h3 style={activityHeaderStyle}>
          <FiGitPullRequest /> Recent Activity
        </h3>
        <motion.div style={activityListStyle} variants={containerVariants}>
          {stats.recentActivity
            .filter((_, index) => {
              if (isMobile) return index < 1;
              if (isTab) return index < 2;
              return true;
            })
            .map((item, index) => (
              <motion.a
                href="https://github.com/Lindo-code"
                target="_blank"
                rel="noopener noreferrer"
                style={{ all: "unset", display: "block", cursor: "pointer" }}
                variants={itemVariants}
              >
                <ActivityItem
                  key={index}
                  item={item}
                  index={index}
                  variants={itemVariants}
                />
              </motion.a>
            ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

const MetricCard = ({ title, value, description, color, icon, variants }) => (
  <motion.div
    variants={variants}
    whileHover={{
      y: -5,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    }}
    style={{
      ...cardStyle,
      borderLeft: `4px solid ${color}`,
    }}
  >
    <h3 style={{ color, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
      {title}
    </h3>
    <motion.p
      style={{ fontSize: "2rem", color: "white", margin: "0.5rem 0" }}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      {value}
    </motion.p>
    <p
      style={{
        color: "#bcb8ad",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      {icon && React.cloneElement(icon, { size: 16 })}
      {description || title.toLowerCase()}
    </p>
  </motion.div>
);

const ActivityItem = ({ item, index, variants }) => {
  const stateColor =
    item.state === "approved"
      ? "#4ECDC4"
      : item.state === "changes_requested"
        ? "#FF6B6B"
        : item.state === "opened"
          ? "#FFBE0B"
          : "#9B5DE5";

  return (
    <motion.div
      variants={variants}
      custom={index}
      whileHover={{
        x: 5,
        transition: { type: "spring", stiffness: 300 },
      }}
      style={{
        ...activityItemStyle,
        borderLeft: `3px solid ${stateColor}`,
      }}
    >
      <div
        style={{
          ...activityIconStyle,
          background: stateColor,
        }}
      >
        {item.icon}
      </div>
      <div style={{ overflow: "hidden" }}>
        <p style={activityRepoStyle}>{item.repo}</p>
        <p style={activityMetaStyle}>
          <span>{item.description}</span>
          <span>•</span>
          <span>{item.time}</span>
          <span>•</span>
          <span>{item.date}</span>
        </p>
      </div>
    </motion.div>
  );
};

// Styles
const sectionStyle = {
  background: "transparent",
  padding: "2rem 1rem",
  borderRadius: "12px",
  zIndex: 2,
  width: "100%",
  maxWidth: "1500px",
  marginLeft: "auto",
  marginRight: "auto",
};

const metricsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "1.5rem",
  margin: "2rem 0",
};

const activityListStyle = {
  display: "grid",
  gap: "3rem",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
};

const cardStyle = {
  background: "#2a3a4d",
  padding: "1.5rem",
  borderRadius: "8px",
  minWidth: 0,
};

const activityItemStyle = {
  background: "#2a3a4d",
  padding: "1rem",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  minWidth: 0,
};

const activityIconStyle = {
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
  flexShrink: 0,
};

const activityRepoStyle = {
  color: "white",
  fontWeight: "500",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: 0,
};

const activityMetaStyle = {
  color: "#bcb8ad",
  fontSize: "0.9rem",
  display: "flex",
  flexWrap: "wrap",
  gap: "0.3rem",
  margin: 0,
  marginTop: "0.3rem",
};

const activityContainerStyle = {
  marginTop: "2rem",
};

const activityHeaderStyle = {
  color: "white",
  display: "flex",
  alignItems: "center",
  gap: ".5rem",
  margin: "10px",
};

export default OpenSourceSection;
