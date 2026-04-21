import { useRef, useEffect, useState, useMemo } from "react";
import { gsap } from "gsap";
import "./TestimonialsTicker.css";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialTicker({ testimonials = [] }) {
  const trackRef = useRef(null);
  const tickerTween = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const loopedTestimonials = useMemo(
    () => [...testimonials, ...testimonials],
    [testimonials],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track || testimonials.length === 0) return;

    const setup = () => {
      tickerTween.current?.kill();

      const width = track.scrollWidth / 2;

      tickerTween.current = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -width,
          duration: 55,
          ease: "none",
          repeat: -1,
        },
      );
    };

    setup();

    const handleResize = () => {
      setup();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      tickerTween.current?.kill();
      tickerTween.current = null;
    };
  }, [testimonials]);

  const handleCardClick = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
      tickerTween.current?.resume();
      return;
    }

    setExpandedIndex(index);
    tickerTween.current?.pause();
  };

  const handleMouseEnter = () => {
    if (expandedIndex === null) tickerTween.current?.pause();
  };

  const handleMouseLeave = () => {
    if (expandedIndex === null) tickerTween.current?.resume();
  };

  return (
    <section className="testimonial-section">
      <div
        className="testimonial-ticker-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="testimonial-ticker-fade testimonial-ticker-fade--left" />
        <div className="testimonial-ticker-fade testimonial-ticker-fade--right" />

        <div className="testimonial-ticker-track" ref={trackRef}>
          {loopedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="testimonial-item"
            >
              <TestimonialCard
                {...testimonial}
                expanded={expandedIndex === index}
                onToggle={() => handleCardClick(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
