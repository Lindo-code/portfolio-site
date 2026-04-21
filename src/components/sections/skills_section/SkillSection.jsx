import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./SkillsShowcase.css";

const defaultSkills = [
  {
    id: "frontend",
    title: "Frontend",
    short: "React, Tailwind, Vue, CSS, JavaScript",
    level: 85,
    blurb:
      "Polished interfaces with strong hierarchy, responsiveness, and performance in mind.",
    details:
      "I build frontends that feel intentional, not just functional. That means cleaner structure, responsive layouts, refined motion, accessible interaction patterns, and performance-aware decisions that hold up across real devices.",
    tags: ["UI Systems", "Responsive Layouts", "Animation", "Accessibility"],
  },
  {
    id: "backend",
    title: "Backend",
    short: "Node.js, SQL, APIs, auth, data flows",
    level: 80,
    blurb:
      "Practical backend architecture focused on reliability, data flow, and clean APIs.",
    details:
      "I work across server logic, authentication, storage, and API design with a focus on maintainability. I prefer systems that are simple enough to reason about, but still robust enough to support real product needs.",
    tags: ["APIs", "SQL", "Auth", "Architecture"],
  },
  {
    id: "design",
    title: "Design",
    short: "Figma, UX thinking, product-focused interface design",
    level: 75,
    blurb:
      "Product-minded visual design rooted in clarity, structure, and usability.",
    details:
      "I’m not just styling screens. I think through layout rhythm, hierarchy, readability, and how interactions feel in context. That helps me bridge the gap between design decisions and implementation quality.",
    tags: ["UX", "Visual Hierarchy", "Figma", "Interaction Design"],
  },
  {
    id: "mobile",
    title: "Mobile",
    short: "React Native, Expo, cross-platform delivery",
    level: 90,
    blurb:
      "Cross-platform mobile work with attention to consistency and real-world usability.",
    details:
      "I build mobile interfaces that aim to feel native enough while staying practical to maintain. Performance, spacing, gesture comfort, screen constraints, and content clarity matter much more on mobile, and I design for that.",
    tags: ["React Native", "Expo", "Cross-platform", "Performance"],
  },
  {
    id: "web",
    title: "Web",
    short: "Modern web apps, semantic structure, product delivery",
    level: 95,
    blurb: "Strong web foundations paired with product-focused execution.",
    details:
      "Web is where I’m strongest. I’m comfortable shaping the full experience: structure, interaction, responsiveness, polish, and integration. The goal is not just shipping a page, but shipping something sharp, usable, and dependable.",
    tags: ["HTML", "React", "JavaScript", "Delivery"],
  },
  {
    id: "workflow",
    title: "Workflow",
    short: "Git, testing, debugging, iteration, team collaboration",
    level: 92,
    blurb:
      "Reliable workflows that support shipping, testing, and maintaining products.",
    details:
      "A good product build needs more than code. I work with version control, debugging discipline, structured iteration, and practical collaboration patterns so the work remains stable as it grows.",
    tags: ["Git", "Testing", "Debugging", "Collaboration"],
  },
];

export default function SkillsShowcase({ skills = defaultSkills }) {
  const [selectedId, setSelectedId] = useState(skills[4]?.id || skills[0]?.id);

  const selectedSkill = useMemo(
    () => skills.find((skill) => skill.id === selectedId) || skills[0],
    [skills, selectedId],
  );

  const averageLevel = Math.round(
    skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length,
  );

  return (
    <section className="skills-showcase" id="skills">
      <div className="container">
        <div className="skills-showcase__header">
          <div className="skills-showcase__intro">
            <span className="skills-showcase__eyebrow">Skills & Tools</span>
            <h2 className="skills-showcase__title">Core Skills</h2>
            <p className="skills-showcase__text">
              Frontend • Backend • Mobile{" "}
            </p>
          </div>

          <div className="skills-showcase__stats">
            <div className="skills-stat-card">
              <span className="skills-stat-card__label">Core Areas</span>
              <strong className="skills-stat-card__value">
                {skills.length}
              </strong>
            </div>
            <div className="skills-stat-card">
              <span className="skills-stat-card__label">Average Strength</span>
              <strong className="skills-stat-card__value">
                {averageLevel}%
              </strong>
            </div>
            <div className="skills-stat-card">
              <span className="skills-stat-card__label">Current Focus</span>
              <strong className="skills-stat-card__value">
                {selectedSkill.title}
              </strong>
            </div>
          </div>
        </div>

        <div className="skills-showcase__stage">
          <div className="skills-showcase__visual">
            <div className="skills-visual-card">
              <div className="skills-visual-card__bg-ring skills-visual-card__bg-ring--one" />
              <div className="skills-visual-card__bg-ring skills-visual-card__bg-ring--two" />
              <div className="skills-visual-card__grid" />

              <div className="skills-visual-card__core">
                <span className="skills-visual-card__core-label">Selected</span>
                <strong className="skills-visual-card__core-value">
                  {selectedSkill.level}%
                </strong>
                <span className="skills-visual-card__core-name">
                  {selectedSkill.title}
                </span>
              </div>

              <div className="skills-visual-card__orbits" aria-hidden="true">
                {skills.map((skill, index) => {
                  const angle = (360 / skills.length) * index;
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      className={`skills-orbit-node ${
                        selectedSkill.id === skill.id ? "is-active" : ""
                      }`}
                      style={{
                        "--orbit-angle": `${angle}deg`,
                        "--orbit-distance": "150px",
                      }}
                      onClick={() => setSelectedId(skill.id)}
                      aria-label={`Select ${skill.title}`}
                    >
                      <span className="skills-orbit-node__dot" />
                      <span className="skills-orbit-node__label">
                        {skill.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="skills-visual-card__footer">
                <span>Interactive skill map</span>
                <span>Choose any node or card</span>
              </div>
            </div>
          </div>

          <div className="skills-showcase__panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSkill.id}
                className="skills-panel-card"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
              >
                <div className="skills-panel-card__top">
                  <div>
                    <p className="skills-panel-card__label">Selected Skill</p>
                    <h3 className="skills-panel-card__title">
                      {selectedSkill.title}
                    </h3>
                  </div>

                  <div className="skills-panel-card__score">
                    <span>Strength</span>
                    <strong>{selectedSkill.level}%</strong>
                  </div>
                </div>

                <p className="skills-panel-card__short">
                  {selectedSkill.short}
                </p>
                <p className="skills-panel-card__details">
                  {selectedSkill.details}
                </p>

                <div className="skills-panel-card__tags">
                  {selectedSkill.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="skills-showcase__list">
          {skills.map((skill) => {
            const active = selectedSkill.id === skill.id;

            return (
              <button
                key={skill.id}
                type="button"
                className={`skills-list-card ${active ? "is-active" : ""}`}
                onClick={() => setSelectedId(skill.id)}
              >
                <div className="skills-list-card__top">
                  <h3>{skill.title}</h3>
                  <span>{skill.level}%</span>
                </div>

                <p className="skills-list-card__blurb">{skill.blurb}</p>

                <div className="skills-list-card__bar">
                  <span style={{ width: `${skill.level}%` }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
