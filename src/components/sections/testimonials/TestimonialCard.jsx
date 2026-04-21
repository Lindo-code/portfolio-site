import "./TestimonialsTicker.css";

export default function TestimonialCard({
  quote,
  name,
  position,
  image,
  expanded = false,
  onToggle,
}) {
  const shouldClamp = quote && quote.length > 220;

  return (
    <article
      className={`testimonial-card ${expanded ? "is-expanded" : ""}`}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle?.();
        }
      }}
      aria-label={`Testimonial from ${name}`}
    >
      <div className="testimonial-card__quote-wrap">
        <span className="testimonial-card__quote-mark">“</span>

        <p
          className={`testimonial-card__quote ${expanded ? "is-expanded" : ""}`}
        >
          {quote}
        </p>

        <span className="testimonial-card__quote-mark testimonial-card__quote-mark--end">
          ”
        </span>
      </div>

      {shouldClamp && (
        <button
          type="button"
          className="testimonial-card__toggle"
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.();
          }}
          aria-label={expanded ? "Collapse quote" : "Expand quote"}
        >
          <span>{expanded ? "Show less" : "Read more"}</span>
          <span
            className={`testimonial-card__toggle-arrow ${expanded ? "is-open" : ""}`}
          >
            ›
          </span>
        </button>
      )}

      <div className="testimonial-card__footer">
        <img src={image} alt={name} className="testimonial-card__avatar" />

        <div className="testimonial-card__person">
          <strong>{name}</strong>
          <span>{position}</span>
        </div>
      </div>
    </article>
  );
}
