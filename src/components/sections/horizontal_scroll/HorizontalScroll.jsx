import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DownArrow from "../../common/DownArrow.jsx";
import "./HorizontalScroll.css";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = ({ cards = [] }) => {
  const containerRef = useRef(null);
  const pinWrapRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinWrap = pinWrapRef.current;
    if (!container || !pinWrap) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());

      const getScrollLength = () =>
        Math.max(pinWrap.scrollWidth - window.innerWidth, 0);

      const tween = gsap.to(pinWrap, {
        x: () => -getScrollLength(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${pinWrap.scrollWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray(".stack-card").forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.96, y: 24 },
          {
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 85%",
              end: "center center",
              scrub: true,
            },
          },
        );
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    mm.add("(max-width: 768px)", () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [cards]);

  const convert = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return new URL(url, import.meta.url).href;
  };

  return (
    <div className="horizontal-stacking-container" ref={containerRef}>
      <section id="sectionPin">
        <div className="pin-wrap" ref={pinWrapRef}>
          <div className="stack-intro">
            <span className="stack-intro-kicker">Featured Work</span>
            <h2 className="stack-intro-title">Built with intention.</h2>
            <p className="stack-intro-text">
              A closer look at selected work, design thinking, and product
              direction across web and mobile.
            </p>
          </div>

          {cards.map((card, index) => (
            <article key={card.id || index} className="stack-card">
              <div className="card-content">
                <div className="card-copy">
                  <span className="card-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="card-text">
                    <h3>{card.title}</h3>

                    {card.semiTitle && <h4>{card.semiTitle}</h4>}

                    {card.description && <p>{card.description}</p>}

                    {card.tags?.length > 0 && (
                      <div className="card-tags">
                        {card.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className="card-image-container"
                  style={{
                    backgroundImage: `linear-gradient(
                      180deg,
                      rgba(0,0,0,0.08),
                      rgba(0,0,0,0.26)
                    ), url(${convert(card.backgroundImg || card.image)})`,
                    backgroundColor: card.backgroundColor || "#161616",
                  }}
                  aria-label={card.title}
                >
                  <div className="card-image-overlay">
                    <div className="card-image-copy">
                      {card.mediaTitle && <strong>{card.mediaTitle}</strong>}
                      {card.mediaSubtitle && <span>{card.mediaSubtitle}</span>}
                    </div>
                  </div>

                  {card.link && (
                    <div className="hover-overlay">
                      <a
                        href={card.link}
                        className="half-circle"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>View Project</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}

          <div className="stack-outro">
            <span className="stack-outro-kicker">More</span>
            <h3 className="stack-outro-title">More thoughtful work ahead.</h3>
          </div>
        </div>
      </section>
      <section
        style={{
          color: "#f1dba7",

          padding: "20px 50px",
          background:
            "linear-gradient(to bottom, #0D0D0D 0%, #0D0D0D 30%, #B47C2E 5%, #B47C2E 100%)",
        }}
      >
        {" "}
        <div style={{ paddingBottom: "5em" }}>
          {" "}
          <DownArrow color={"red"} />{" "}
        </div>
        <div className="">
          <span className="testimonial-section__eyebrow">Testimonials</span>
          <h2 className="testimonial-section__title">
            What people say about the work.
          </h2>
          <p className="">
            A scrolling set of client and collaborator feedback, redesigned to
            feel more editorial, more premium, and more in line with the rest of
            the site.
          </p>{" "}
          <hr
            style={{
              border: "none",
              height: "3px",
              backgroundColor: "red",
              margin: "10px 50% 10px 0",

              width: "10rem",
              display: "block",
            }}
          />
        </div>{" "}
      </section>{" "}
    </div>
  );
};

export default HorizontalScroll;
