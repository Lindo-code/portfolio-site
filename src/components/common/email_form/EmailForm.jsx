import { useState } from "react";
import "./EmailForm.css";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

export default function EmailForm({ formspreeEndpoint }) {
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialForm);

  const validate = () => {
    const nextErrors = {};

    if (!formData.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Message is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("submitting");

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setFormData(initialForm);

      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  return (
    <form className="email-form" onSubmit={handleSubmit} noValidate>
      <div className="email-form__grid">
        <div className="email-form__field">
          <label htmlFor="firstName" className="email-form__label">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className={`email-form__input ${
              errors.firstName ? "is-error" : ""
            }`}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName && (
            <p id="firstName-error" className="email-form__error">
              {errors.firstName}
            </p>
          )}
        </div>

        <div className="email-form__field">
          <label htmlFor="lastName" className="email-form__label">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className={`email-form__input ${errors.lastName ? "is-error" : ""}`}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName && (
            <p id="lastName-error" className="email-form__error">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="email-form__field">
        <label htmlFor="email" className="email-form__label">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`email-form__input ${errors.email ? "is-error" : ""}`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="email-form__error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="email-form__field">
        <label htmlFor="message" className="email-form__label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className={`email-form__textarea ${errors.message ? "is-error" : ""}`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="email-form__error">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="email-form__submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <span className="email-form__spinner" aria-hidden="true" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>

      {status === "success" && (
        <p className="email-form__status email-form__status--success">
          Message sent successfully.
        </p>
      )}

      {status === "error" && (
        <p className="email-form__status email-form__status--error">
          Failed to send message. Please try again.
        </p>
      )}
    </form>
  );
}
