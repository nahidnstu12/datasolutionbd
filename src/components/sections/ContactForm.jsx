"use client";

import { useRef, useState, useTransition } from "react";
import { sendContactEmail } from "@/actions/sendContactEmail";

export default function ContactForm() {
  const formRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState(null);

  const handleSubmit = (formData) => {
    startTransition(async () => {
      const result = await sendContactEmail(null, formData);
      setState(result);
      if (result.success && formRef.current) {
        formRef.current.reset();
      }
    });
  };

  return (
    <form
      ref={formRef}
      className="contact-form reveal"
      action={handleSubmit}
      noValidate
      aria-label="Contact form"
    >
      <h3>Send us a message</h3>

      {/* Honeypot — leave empty */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          height: 0,
          width: 0,
          opacity: 0,
        }}
      />

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            required
            autoComplete="name"
            disabled={isPending}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            Phone Number <span aria-hidden="true">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+880 1XXX-XXXXXX"
            required
            autoComplete="tel"
            disabled={isPending}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@company.com"
          autoComplete="email"
          disabled={isPending}
        />
      </div>

      <div className="form-group">
        <label htmlFor="service">Service Interested In</label>
        <select id="service" name="service" defaultValue="" disabled={isPending}>
          <option value="" disabled>
            Select a service
          </option>
          <option>Pharmacy POS</option>
          <option>School Management</option>
          <option>HR Management</option>
          <option>Inventory Management</option>
          <option>Restaurant POS</option>
          <option>Mobile App Development</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your project..."
          disabled={isPending}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-lg btn-block"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Submit Now"}
      </button>

      {state?.success && (
        <p className="form-feedback form-feedback--success" role="status">
          {state.message}
        </p>
      )}
      {state?.error && (
        <p className="form-feedback form-feedback--error" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
