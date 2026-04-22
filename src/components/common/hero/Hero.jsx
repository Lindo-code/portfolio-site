import "./Hero.css";

const Hero = () => {
  const scrollToElement = (elementId) => {
    const element = document.querySelector(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const viewDemo = () => {
    window.open("https://github.com/Lindo-code", "_blank");
  };
  const heroTags = [
    "Frontend",
    "Backend",
    "Mobile Apps",
    "UI Systems",
    "APIs",
    "Performance",
  ];

  return (
    <section className="hero">
      <div className="hero-bg-glow hero-bg-glow-1" />
      <div className="hero-bg-glow hero-bg-glow-2" />

      <div className="container">
        <div className="hero-shell">
          <div className="hero-content">
            <span className="hero-kicker">
              FULL STACK WEB &amp; MOBILE DEVELOPER
            </span>

            <h1 className="hero-title">
              Hey, I’m <span>Lindo</span>.
              <br />I build digital products.
            </h1>

            <p className="hero-subtitle">
              I design and develop web and mobile experiences with a practical,
              product-focused mindset. I’ve worked with teams, led some, learned
              a lot, and shared what I know along the way. The goal is simple:
              build useful things well and make the internet a little more
              awesome.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => scrollToElement("#projects-section")}
              >
                View Work
              </button>
              <button className="btn btn-secondary" onClick={viewDemo}>
                GitHub
              </button>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="hero-panel-inner">
              <div className="hero-panel-top">
                <span className="hero-panel-label">What I do</span>
                <div className="hero-line" />
              </div>

              <div className="hero-tags">
                {heroTags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="hero-metrics">
                <div className="hero-metric">
                  <strong>Web</strong>
                  <p>
                    Modern responsive apps built for real users and real
                    devices.
                  </p>
                </div>

                <div
                  className="hero-metric"
                  style={{ backgroundColor: "#b27b32", color: "black" }}
                >
                  <strong style={{ color: "black" }}>Mobile</strong>
                  <p style={{ color: "#2E3C4F" }}>
                    Cross-platform experiences that stay clean, fast, and
                    usable.
                  </p>
                </div>

                <div className="hero-metric">
                  <strong>Full Stack</strong>
                  <p>
                    From interface to database, I care about the whole product.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Hero;
