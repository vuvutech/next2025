"use client";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function HelpComponent() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-6">
        <h1 className="text-3xl sm:text-5xl font-bold">How can we help you?</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Search our knowledge base or browse help topics below. Whether
          you&apos;re a prospective participant, current student, partner, or
          media contact, we&apos;re here to support you.
        </p>
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for help..."
            className="pl-10 h-12 text-lg"
          />
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/faqs" className="group">
          <div className="p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer h-full">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">FAQs</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Find answers to common questions about programs, registration, and
              more.
            </p>
            <span className="inline-flex items-center text-primary text-sm font-medium">
              Browse FAQs{" "}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>

        <a href="mailto:support@costrad.org" className="group">
          <div className="p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer h-full">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Technical Support</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Login issues, file uploads, Zoom links, and technical problems.
            </p>
            <span className="inline-flex items-center text-primary text-sm font-medium">
              Get help{" "}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </a>

        <a
          href="https://x.com/COSTrAD"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div className="p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer h-full">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ExternalLink className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Connect with participants, faculty, and ambassadors on social
              media.
            </p>
            <span className="inline-flex items-center text-primary text-sm font-medium">
              Join us{" "}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </a>

        <a href="mailto:enquiries@costrad.org" className="group">
          <div className="p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer h-full">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">General Inquiries</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Questions about programs, partnerships, or anything else.
            </p>
            <span className="inline-flex items-center text-primary text-sm font-medium">
              Contact us{" "}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </a>
      </section>

      <Separator />

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Popular Topics</h2>
          <ul className="space-y-3">
            {[
              { label: "How to register for a program", href: "/faqs" },
              { label: "Virtual vs in-person attendance", href: "/faqs" },
              {
                label: "Scholarship and sponsorship opportunities",
                href: "/faqs",
              },
              { label: "Accessing learning materials", href: "/faqs" },
              { label: "Institute-specific information", href: "/institutes" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowRight className="h-4 w-4 mr-2 flex-shrink-0" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button variant="outline" asChild className="mt-4">
            <Link href="/faqs">View all FAQs</Link>
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Support</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Technical Support</p>
              <a
                href="mailto:support@costrad.org"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                support@costrad.org
              </a>
              <p className="text-sm text-muted-foreground">
                Login issues, file uploads, Zoom problems
              </p>
            </div>
            <div>
              <p className="font-medium">Enquiries</p>
              <a
                href="mailto:enquiries@costrad.org"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                enquiries@costrad.org
              </a>
              <p className="text-sm text-muted-foreground">
                General questions about programs
              </p>
            </div>
            <div>
              <p className="font-medium">Correspondence</p>
              <a
                href="mailto:correspondence@costrad.org"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                correspondence@costrad.org
              </a>
            </div>
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-muted-foreground">+233200201334</p>
              <p className="text-sm text-muted-foreground">
                Mon–Fri, 9AM–4PM GMT
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section className="bg-muted/50 rounded-lg p-8 text-center space-y-4">
        <h2 className="text-2xl font-semibold">Still need help?</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Can&apos;t find what you&apos;re looking for? Our team is ready to
          assist you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <a href="mailto:enquiries@costrad.org">Send us a message</a>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact page</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
