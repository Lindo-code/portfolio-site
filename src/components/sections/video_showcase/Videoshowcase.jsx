import LazyVideo from "./LazyVideo";
import "./VideoShowcase.css";

export default function VideoShowcase({
  videoSrc,
  posterSrc,
  title = "Full-stack apps, from database to design",
  description = "Always open to freelance work and new opportunities. Let's connect.",
  children,
}) {
  return (
    <section className="video-showcase">
      <div className="container">
        <div className="video-showcase-shell">
          {/* VIDEO SIDE */}
          <div className="video-showcase-media">
            <LazyVideo videoSrc={videoSrc} posterSrc={posterSrc} />
          </div>

          {/* CONTENT SIDE */}
          <div className="video-showcase-content">
            <span className="video-kicker">My Work</span>

            <h2 className="video-title">{title}</h2>

            <p className="video-description">{description}</p>

            <div className="video-actions">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
