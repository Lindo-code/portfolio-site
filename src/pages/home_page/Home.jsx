import { lazy, useEffect, useMemo, useState, Suspense } from "react";
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
import "./Home.css";

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
  className = "",
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
      className={className}
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

const getDeviceState = () => {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isTab: false,
      isLGDevice: false,
    };
  }

  const width = window.innerWidth;

  return {
    isMobile: width < 600,
    isTab: width < 900,
    isLGDevice: width < 1200,
  };
};

const Home = () => {
  const [device, setDevice] = useState(getDeviceState());

  useEffect(() => {
    const onResize = () => {
      setDevice(getDeviceState());
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { isMobile, isTab, isLGDevice } = device;

  const contactIconsArr = [iconMap["linkedIn"], iconMap["github"]];

  const videoSrc = useMemo(() => {
    if (isMobile) {
      return "https://dawn-unit-97b0.sdrowvieli1.workers.dev/creativehub/videos/output.webm";
    }

    if (isTab || isLGDevice) {
      return "https://dawn-unit-97b0.sdrowvieli1.workers.dev/creativehub/videos/output1.webm";
    }

    return "https://dawn-unit-97b0.sdrowvieli1.workers.dev/creativehub/videos/output1.webm";
  }, [isMobile, isTab, isLGDevice]);

  return (
    <FullWidthLayout showHero={true}>
      <div className="app-container">
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
        </VideoShowcase>

        <div className="home-tech-shell">
          <AnimatedSection
            id="tech_stack"
            className="home-tech-section"
            variants={scaleUp}
            threshold={0.3}
            viewportMargin="0px 0px -100px 0px"
            triggerOnce={false}
          >
            <IconTicker icons={techStack} />
          </AnimatedSection>
        </div>

        <section>
          <SkillsShowcase />
        </section>

        <section id="github_activity" className="home-github-section">
          <AnimatedSection
            id="open_source"
            className="home-github-intro"
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
                <p className="oss-text" style={{ color: "#2E3C4F" }}>
                  A quick snapshot of my activity across GitHub repositories,
                  reviews, and contributions that reflect actual development
                  work.
                </p>
              </div>
            </motion.div>

            <motion.hr
              variants={itemVariants}
              className="home-github-divider"
            />
          </AnimatedSection>

          <Suspense fallback={null}>
            <OpenSourceSection />
          </Suspense>
        </section>

        <section id="projects-section">
          <Suspense fallback={null}>
            <HorizontalScrollingCards
              cards={cards[0]}
              itemVariants={itemVariants}
            />
          </Suspense>
        </section>

        <section id="testimonials" className="home-testimonials-section">
          <Suspense fallback={null}>
            <TestimonialTicker
              id="testimonials"
              testimonials={testimonials}
              isMobile={isMobile}
              isTab={isTab}
            />
          </Suspense>
        </section>

        <section className="home-email-intro">
          <h2>Drop me a message</h2>
          <DownArrow />
        </section>

        <AnimatedSection
          id="contact_form"
          variants={fadeIn}
          delayChildren={0.5}
          threshold={0.2}
        >
          <EmailForm formspreeEndpoint="https://mail.api.lindocode.com/contact" />
        </AnimatedSection>
      </div>
    </FullWidthLayout>
  );
};

export default Home;
