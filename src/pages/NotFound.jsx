import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Logo from "../components/common/logo/Logo";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 | Page Not Found | Lindocode Digital</title>

        <meta
          name="description"
          content="The page you are looking for does not exist. Explore Lindocode Digital's portfolio and projects."
        />

        {/* Prevent indexing */}
        <meta name="robots" content="noindex, nofollow" />

        {/* Open Graph */}
        <meta property="og:title" content="404 — Page Not Found" />
        <meta
          property="og:description"
          content="This page could not be found."
        />
        <meta property="og:type" content="website" />

        {/* Optional canonical */}
        <link rel="canonical" href="https://portfolio.lindocode.com/404" />
      </Helmet>

      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          background: "#000000",
          color: "#ffffff",
        }}
      >
        <section
          style={{
            maxWidth: "640px",
            width: "100%",
            padding: "2.5rem 2rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <Logo
              size="medium"
              scale={0.8}
              postWidth={0.9}
              lampHeight={20}
              dotWidth={1.5}
              bulbWidth={0.7}
              headWidth={2.3}
              headPos={1.7}
              rayPos={-0.7}
              postMargin={33}
              headColor="#ffffff"
              postColor="#ffffff"
              bulbColor="#ffffff"
              rayColor="#ffffff"
              dotColor="#FF0700"
            />
          </div>

          <p
            style={{
              color: "#ff4d4d",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
              fontSize: "0.8rem",
              fontWeight: "bold",
            }}
          >
            Error 404
          </p>

          <h1
            className="press-start-font"
            style={{
              fontSize: "clamp(1rem, 5vw, 3rem)",
              lineHeight: 1,
              marginBottom: "1rem",
            }}
          >
            Lost in the system
          </h1>

          <p
            style={{
              color: "#9D9D9D",
              fontSize: "1rem",
              lineHeight: 1.7,
              marginBottom: "1.75rem",
              maxWidth: "480px",
            }}
          >
            The page you’re looking for does not exist, was moved, or never went
            live.
          </p>

          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.9rem 1.25rem",
              borderRadius: "999px",
              textDecoration: "none",
              color: "#fff",
              background: "linear-gradient(135deg, #b30000, #ff3b3b)",
              fontWeight: 600,
            }}
          >
            Return Home
          </Link>
        </section>
      </main>
    </>
  );
}
