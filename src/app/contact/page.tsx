"use client";

import * as React from "react";
import Footer from "../../components/marketing/Footer";

type FormState = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
};

const ROLES = [
  "Developer",
  "Designer",
  "Founder",
  "Product Manager",
  "Data Scientist",
  "Engineer",
  "Executive",
  "Other",
] as const;

export default function ContactPage() {
  const [state, setState] = React.useState<FormState>({
    name: "",
    email: "",
    phone: "",
    organization: "",
    role: ROLES[0],
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState<null | "ok" | "err">(null);
  const [message, setMessage] = React.useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitted(null);
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Request failed");
      setSubmitted("ok");
      setMessage("Thanks — we’ll reach out shortly.");
      setState({ name: "", email: "", phone: "", organization: "", role: ROLES[0] });
    } catch (err) {
      setSubmitted("err");
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setMessage(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="ra-section">
      <div className="ra-container">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="ra-headline">Request Early Access</h1>
          <p className="mt-5 ra-subhead">Build your production-ready deep agent now with RemoteAgent.</p>
        </div>

        <form onSubmit={onSubmit} className="mt-10 grid gap-6 max-w-2xl mx-auto ra-card">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm mb-2" style={{ color: "var(--ra-muted)" }}>
                Full name
              </label>
              <input
                id="name"
                name="name"
                required
                value={state.name}
                onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                className="w-full rounded-none bg-transparent border px-3 py-2 text-[15px]"
                style={{ borderColor: "var(--ra-border)", color: "var(--ra-text)" }}
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm mb-2" style={{ color: "var(--ra-muted)" }}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={state.email}
                onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                className="w-full rounded-none bg-transparent border px-3 py-2 text-[15px]"
                style={{ borderColor: "var(--ra-border)", color: "var(--ra-text)" }}
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm mb-2" style={{ color: "var(--ra-muted)" }}>
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                value={state.phone}
                onChange={(e) => setState((s) => ({ ...s, phone: e.target.value }))}
                className="w-full rounded-none bg-transparent border px-3 py-2 text-[15px]"
                style={{ borderColor: "var(--ra-border)", color: "var(--ra-text)" }}
                placeholder="+1 555 123 4567"
              />
            </div>
            <div>
              <label htmlFor="organization" className="block text-sm mb-2" style={{ color: "var(--ra-muted)" }}>
                Organization
              </label>
              <input
                id="organization"
                name="organization"
                value={state.organization}
                onChange={(e) => setState((s) => ({ ...s, organization: e.target.value }))}
                className="w-full rounded-none bg-transparent border px-3 py-2 text-[15px]"
                style={{ borderColor: "var(--ra-border)", color: "var(--ra-text)" }}
                placeholder="Acme Inc."
              />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm mb-2" style={{ color: "var(--ra-muted)" }}>
              Role
            </label>
            <select
              id="role"
              name="role"
              value={state.role}
              onChange={(e) => setState((s) => ({ ...s, role: e.target.value }))}
              className="w-full rounded-none bg-transparent border px-3 py-2 text-[15px]"
              style={{ borderColor: "var(--ra-border)", color: "var(--ra-text)" }}
            >
              {ROLES.map((r) => (
                <option key={r} value={r} className="text-black">
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" disabled={submitting} className="ra-cta-primary">
              {submitting ? "Submitting…" : "Request access"}
            </button>
            {submitted && (
              <span className="text-sm" style={{ color: submitted === "ok" ? "var(--ra-accent)" : "#fda4af" }}>
                {message}
              </span>
            )}
          </div>
        </form>

        {/* Spacer before footer */}
        <div className="mt-16 md:mt-24" />
      </div>

      <Footer />
    </main>
  );
}


