"use client";

import { Separator } from "@/components/ui/separator";

export default function HelpComponent() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl sm:text-6xl">Help & Support</h1>
        <p className="mt-2 text-foreground">
          Need assistance? You’re in the right place. Whether you’re a
          prospective participant, current student, partner, or media contact,
          our Help Center is designed to support you at every step.
        </p>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <ul className="space-y-2 list-disc list-inside text-muted-foreground">
          <li>How do I register for an upcoming edition or program?</li>
          <li>Can I attend virtually or in-person?</li>
          <li>Where can I find scholarship or sponsorship opportunities?</li>
          <li>How do I access my learning materials or join sessions?</li>
          <li>Where can I find institute-specific information?</li>
        </ul>
        <p className="text-muted-foreground">
          For detailed answers, visit our{" "}
          <a href="/faq" className="text-primary underline">
            FAQ page →
          </a>
        </p>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Get Technical Support</h2>
        <p className="text-muted-foreground">
          Encountering login issues, file upload errors, or Zoom link problems?
          Our tech support team is here to help.
        </p>
        <p>
          Email:{" "}
          <a
            href="mailto:support@costrad.org"
            className="text-primary underline"
          >
            support@costrad.org, webmaster@costrad.org
          </a>
        </p>
        <p>Phone: +233200201334 (Office Hours: Mon–Fri, 9AM–4PM GMT)</p>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Community Support</h2>
        <p className="text-muted-foreground">
          Connect with past participants, faculty, and institute ambassadors.
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>
            Join our{" "}
            <a
              href="https://t.me/costradcommunity"
              className="text-primary underline"
              target="_blank"
            >
              Telegram Community
            </a>
          </li>
          <li>
            Follow us on{" "}
            <a
              href="https://twitter.com/costradafrica"
              className="text-primary underline"
              target="_blank"
            >
              Twitter
            </a>{" "}
            and{" "}
            <a
              href="https://facebook.com/costradglobal"
              className="text-primary underline"
              target="_blank"
            >
              Facebook
            </a>
          </li>
          <li>
            Explore insights on{" "}
            <a
              href="https://medium.com/@costrad"
              className="text-primary underline"
              target="_blank"
            >
              Medium
            </a>
          </li>
        </ul>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Still Need Help?</h2>
        <p className="text-muted-foreground">
          If you didn’t find what you were looking for, please reach out
          directly. We're happy to assist.
        </p>
        <p>
          Email:{" "}
          <a href="mailto:info@costrad.org" className="text-primary underline">
            info@costrad.org
          </a>
        </p>
      </section>
    </div>
  );
}
