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
import "./OpenSourceShowcase.css";

const OpenSourceSection = () => {
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

      try {
        const cachedData = localStorage.getItem("githubStats");
        const lastFetchTime = localStorage.getItem("lastFetchTime");

        if (
          cachedData &&
          lastFetchTime &&
          now - parseInt(lastFetchTime, 10) < ONE_HOUR
        ) {
          updateStats({ ...JSON.parse(cachedData), source: "cache" });
          return;
        }
      } catch (e) {
        console.warn("Cache read failed:", e);
      }

      try {
        const response = await fetch(
          "https://purple-cherry-17b4.sdrowvieli1.workers.dev/github-stats",
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const freshData = await response.json();
        localStorage.setItem("githubStats", JSON.stringify(freshData));
        localStorage.setItem("lastFetchTime", now.toString());
        updateStats({ ...freshData, source: "api" });
        return;
      } catch (apiError) {
        console.warn("API fetch failed:", apiError.message);
      }

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

      try {
        const cachedData = localStorage.getItem("githubStats");
        if (cachedData) {
          updateStats({ ...JSON.parse(cachedData), source: "stale-cache" });
          return;
        }
      } catch (e) {
        console.error("All data sources failed", e);
      }

      updateStats({
        publicRepos: 0,
        privateRepos: 0,
        totalReviews: 0,
        recentActivity: [],
        totalContributions: 0,
      });
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
        staggerChildren: 0.16,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="oss-section"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="container">
        <motion.div className="oss-metrics" variants={containerVariants}>
          <motion.a
            href="https://github.com/Lindo-code"
            target="_blank"
            rel="noopener noreferrer"
            className="oss-link-reset"
            variants={itemVariants}
          >
            <MetricCard
              label="Public Repos"
              value={`${stats.publicRepos}+`}
              icon={<FiGithub />}
              accent="cyan"
            />
          </motion.a>

          <motion.a
            href="https://github.com/Lindo-code"
            target="_blank"
            rel="noopener noreferrer"
            className="oss-link-reset"
            variants={itemVariants}
          >
            <MetricCard
              label="Private Work"
              value={`${stats.privateRepos}+`}
              icon={<FiLock />}
              accent="violet"
            />
          </motion.a>

          <motion.a
            href="https://github.com/Lindo-code"
            target="_blank"
            rel="noopener noreferrer"
            className="oss-link-reset"
            variants={itemVariants}
          >
            <MetricCard
              label="Code Reviews"
              value={`${stats.totalReviews}+`}
              icon={<FiCheckCircle />}
              accent="gold"
            />
          </motion.a>

          <motion.div variants={itemVariants}>
            <MetricCard
              label="Total Activity"
              value={`${stats.totalContributions}+`}
              icon={<FiCode />}
              accent="red"
            />
          </motion.div>
        </motion.div>

        <motion.div className="oss-activity" variants={itemVariants}>
          <h3 className="oss-activity-title">
            <FiGitPullRequest />
            <span>Recent Activity</span>
          </h3>

          <motion.div
            className="oss-activity-grid"
            variants={containerVariants}
          >
            {stats.recentActivity.map((item, index) => (
              <motion.a
                key={`${item.repo}-${item.time}-${index}`}
                href="https://github.com/Lindo-code"
                target="_blank"
                rel="noopener noreferrer"
                className={`oss-link-reset oss-activity-wrap oss-activity-wrap-${index + 1}`}
                variants={itemVariants}
              >
                <ActivityItem item={item} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const MetricCard = ({ label, value, icon, accent }) => {
  return (
    <motion.div
      className={`oss-card oss-card-${accent}`}
      whileHover={{
        y: -5,
        transition: { type: "spring", stiffness: 360, damping: 18 },
      }}
    >
      <div className="oss-card-top">
        <span className="oss-card-label">{label}</span>
        <span className="oss-card-icon">{icon}</span>
      </div>
      <strong className="oss-card-value">{value}</strong>
    </motion.div>
  );
};

const ActivityItem = ({ item }) => {
  const stateClass =
    item.state === "approved"
      ? "approved"
      : item.state === "changes_requested"
        ? "changes-requested"
        : item.state === "opened"
          ? "opened"
          : "other";

  return (
    <motion.div
      className={`oss-activity-item oss-state-${stateClass}`}
      whileHover={{
        x: 4,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      <div className="oss-activity-icon">{item.icon}</div>

      <div className="oss-activity-content">
        <p className="oss-activity-repo">{item.repo}</p>
        <p className="oss-activity-meta">
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

export default OpenSourceSection;
