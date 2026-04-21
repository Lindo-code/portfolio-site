import { lazy, useEffect, useState, Suspense } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FullWidthLayout from "../../components/layouts/FullWidthLayout.jsx";
import cards from "../../data/horizontal_cards.json";
import IconTicker from "../../components/sections/icon_ticker/IconTicker.jsx";
import techStack from "../../data/icons.json";
import { iconMap } from "../../utils/icons.js";
import testimonials from "../../data/testimonials.json";
import EmailForm from "../../components/common/email_form/EmailForm.jsx";
import VideoShowcase from "../../components/sections/video_showcase/Videoshowcase.jsx";
import DownArrow from "../../components/common/DownArrow.jsx";
const SkillsShowcase = lazy(
  () => import("../../components/sections/skills_section/SkillSection.jsx"),
);
const OpenSourceSection = lazy(
  () => import("../../components/sections/open_source/OpenSourceSection.jsx"),
);
const HorizontalScrollingCards = lazy(
  () => import("../../components/sections/horizontal_scroll/HorizontalScroll"),
);
const TestimonialTicker = lazy(
  () => import("../../components/sections/testimonials/TestimonialsTicker.jsx"),
);
import "./Home.css";

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
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

const slideInFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.5 },
  },
};

const slideInFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.5 },
  },
};

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

const AnimatedSection = ({
  children,
  id,
  variants = fadeIn,
  threshold = 0.1,
  triggerOnce = true,
  staggerChildren = false,
  delayChildren = 0,
  staggerDirection = 1,
  viewportMargin = "0px",
  animationStart = "hidden",
  animationEnd = "visible",
  custom = null,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    rootMargin: viewportMargin,
  });

  useEffect(() => {
    if (inView) {
      controls.start(animationEnd);
    } else if (!triggerOnce) {
      controls.start(animationStart);
    }
  }, [controls, inView, triggerOnce, animationStart, animationEnd]);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={animationStart}
      animate={controls}
      variants={variants}
      custom={custom}
      transition={{
        staggerChildren: staggerChildren ? 0.2 : undefined,
        delayChildren,
        staggerDirection,
      }}
    >
      {children}
    </motion.section>
  );
};

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));
  const isLGDevice = useMediaQuery(theme.breakpoints.down("lg"));
  const isExtraLgDevice = useMediaQuery(theme.breakpoints.up("lg"));
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const isLandscape = useMediaQuery(
    "(max-width:980px) and (max-height:580px) and (orientation: landscape)",
  );
  const contactIconsArr = [iconMap["linkedIn"], iconMap["github"]];
  const [selectedSkill, setSelectedSkill] = useState(null);
  const videoSrc = isMobile
    ? "https://dawn-unit-97b0.sdrowvieli1.workers.dev/creativehub/videos/output.webm"
    : isTab || isLGDevice
      ? "https://dawn-unit-97b0.sdrowvieli1.workers.dev/creativehub/videos/output1.webm"
      : "https://dawn-unit-97b0.sdrowvieli1.workers.dev/creativehub/videos/output1.webm";

  const isTabletPortrait = useMediaQuery(
    "(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)",
  );
  const isIpadProPortrait = useMediaQuery(
    "(min-width: 1024px) and (max-width: 1366px) and (orientation: portrait)",
  );
  const isMobileLandscape = useMediaQuery(
    "(max-width: 968px) and (orientation: landscape)",
  );
  return (
    <FullWidthLayout showHero={true}>
      <VideoShowcase
        videoSrc={videoSrc}
        posterSrc="https://dawn-unit-97b0.sdrowvieli1.workers.dev/creativehub/images/thumbnail.png"
      >
        {contactIconsArr.map((IconComponent, i) => {
          const links = [
            "https://www.linkedin.com/in/lindo-matabane-8939aa229",
            "https://github.com/Lindo-code",
          ];

          return (
            <a
              key={i}
              href={links[i]}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
            >
              <IconComponent />
            </a>
          );
        })}
      </VideoShowcase>{" "}
      <div
        style={{
          margin: "0 auto",
          padding: isMobile ? "0 1rem" : "0 1.5rem",
          backgroundColor: "#050505",
        }}
      >
        {" "}
        <AnimatedSection
          id="tech_stack"
          className="Intro"
          variants={scaleUp}
          threshold={0.3}
          viewportMargin="0px 0px -100px 0px"
          triggerOnce={false}
        >
          <IconTicker icons={techStack} />{" "}
        </AnimatedSection>
      </div>
      <section>
        <SkillsShowcase />{" "}
      </section>{" "}
      <section
        id="github_activity"
        style={{
          backgroundColor: "#B47C2E",
          color: "#f1dba7",

          padding: "50px",
        }}
      >
        <AnimatedSection
          id="open_source"
          variants={containerVariants}
          threshold={0.15}
          staggerChildren
          delayChildren={0.2}
          triggerOnce={false}
        >
          <motion.div variants={itemVariants} className="oss-header">
            <div>
              <span className="oss-kicker">Work & Reviews</span>
              <h2 className="oss-title">Real work, not just projects.</h2>
              <p className="oss-text">
                A quick snapshot of my activity across GitHub repositories.
                Reviews, and contributions that reflect actual development work.
              </p>
            </div>
          </motion.div>
          <motion.hr
            variants={itemVariants}
            style={{
              border: "none",
              height: "3px",
              backgroundColor: "red",
              margin: "10px 50% 10px 0",

              width: "10rem",
              display: "block",
            }}
          />
        </AnimatedSection>{" "}
        <Suspense fallback={null}>
          <OpenSourceSection />
        </Suspense>
      </section>
      <section id="projects">
        {" "}
        <Suspense fallback={null}>
          <HorizontalScrollingCards
            cards={cards[0]}
            itemVariants={itemVariants}
          />
        </Suspense>
      </section>
      <section
        id="testimonials"
        style={{
          backgroundColor: "#b47c2e",
          color: "#f1dba7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px 20px 10px 20px",
          marginTop: "-5px",
        }}
      >
        {" "}
        <Suspense fallback={null}>
          <TestimonialTicker
            id="testimonials"
            testimonials={testimonials}
            isMobile={isMobile}
            isTab={isTab}
          />
        </Suspense>{" "}
      </section>
      <section
        style={{
          backgroundColor: "#b47c2e",
          color: "#f1dba7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderBottomLeftRadius: "50%",
          borderBottomRightRadius: "50%",
          padding: "20px 20px 10px 20px",
          marginBottom: "30px",
          marginTop: "-10px",
        }}
      >
        {" "}
        <h2>Send Email</h2>
        <DownArrow />
      </section>{" "}
      <AnimatedSection
        id="contact_form"
        variants={fadeIn}
        delayChildren={0.5}
        threshold={0.2}
      >
        <EmailForm formspreeEndpoint="https://formspree.io/f/xgvyrjrn" />
      </AnimatedSection>{" "}
    </FullWidthLayout>
  );
};

export default Home;
