import { useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import "./IconTicker.css";

const IconTicker = ({
  icons,
  iconSize = "clamp(2rem, 3vw, 3.25rem)",
  gap = "clamp(1rem, 2.5vw, 2.5rem)",
  padding = "0.9rem 0",
  animate = true,
  speed = 26,
  direction = "left",
  pauseOnHover = true,
  repeatItems = true,
  repeatCount = 3,
  title = "Tech I Work With",
}) => {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  const iconList = useMemo(() => {
    const source = icons?.tech || [];
    if (!repeatItems) return source;
    return Array.from({ length: repeatCount }, () => source).flat();
  }, [icons, repeatItems, repeatCount]);

  useEffect(() => {
    if (!animate || !repeatItems) return;

    const track = trackRef.current;
    if (!track || repeatCount < 2) return;

    const singleSetWidth = track.scrollWidth / repeatCount;
    const distance = direction === "left" ? -singleSetWidth : singleSetWidth;

    tweenRef.current?.kill();

    tweenRef.current = gsap.fromTo(
      track,
      { x: 0 },
      {
        x: distance,
        duration: speed,
        ease: "none",
        repeat: -1,
      },
    );

    return () => {
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, [animate, speed, direction, repeatItems, repeatCount, iconList]);

  return (
    <section
      className="icon-ticker-section"
      onMouseEnter={() => pauseOnHover && tweenRef.current?.pause()}
      onMouseLeave={() => pauseOnHover && tweenRef.current?.resume()}
      style={{
        "--icon-size": iconSize,
        "--icon-gap": gap,
        "--ticker-padding": padding,
      }}
      aria-label="Technology stack"
    >
      <div className="icon-ticker-header">
        <span className="icon-ticker-kicker">{title}</span>
        <div className="icon-ticker-line" />
      </div>

      <div className="icon-ticker-container">
        <div className="icon-ticker-fade icon-ticker-fade-left" />
        <div className="icon-ticker-fade icon-ticker-fade-right" />

        <div className="icon-ticker-track" ref={trackRef}>
          {iconList.map((icon, index) => (
            <div className="icon-chip" key={`${icon}-${index}`}>
              <img
                src={icon}
                alt="technology icon"
                className="icon-image"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IconTicker;
