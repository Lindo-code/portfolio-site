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
              <br />A builder of digital products.
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
              {/* <button className="btn btn-secondary" onClick={viewDemo}> */}
              {/*   GitHub */}
              {/* </button> */}
              <div>
                <div className="hero-social-block">
                  <div className="social-links">
                    {" "}
                    <a
                      href="https://wa.me/+27843531813"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link whatsapp"
                      aria-label="Whatsapp"
                    >
                      <svg
                        className="social-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/lindo-matabane-8939aa229/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link linkedin"
                      aria-label="LinkedIn"
                    >
                      <svg
                        className="social-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a
                      href="https://github.com/Lindo-code"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link github"
                      aria-label="GitHub"
                    >
                      <svg
                        className="social-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
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

                <div className="hero-metric">
                  <strong>Mobile</strong>
                  <p>
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
