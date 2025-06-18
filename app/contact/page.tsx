"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Jumbotron from "@/components/ui/Jumbotron";
// import { Testimonials as TestimonialsSection } from "../../components/Testimonials"; // Unused import, considering removing if Testimonials section is not rendered directly here
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  FaFacebook,
  FaXTwitter,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa6";

// Import the Shadcn-based modal and form
import GenericShadcnFormModal from "@/components/GenericShadcnFormModal"; // Adjust path
import TestimonialForm, {
  TestimonialFormData,
} from "@/components/TestimonialForm"; // Adjust path, import interface
import { getCurrentSession } from "../actions/functions";

// Define the type for the contact form inputs
type ContactFormInputs = {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
};

// Define the type for the user session, matching what betterFetch returns
interface UserSession {
  user?: {
    id: string;
    email: string;
    name?: string;
    // Add any other user properties you expect from your session here
  };
}

export default function ContactPage() {
  const [isPrivacyPolicyAccepted, setIsPrivacyPolicyAccepted] =
    useState<boolean>(false); // Renamed for clarity
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] =
    useState<boolean>(false);
  const [testimonialData, setTestimonialData] = useState<TestimonialFormData>({
    content: "",
  });
  const [isTestimonialLoading, setIsTestimonialLoading] =
    useState<boolean>(false);
  const [currentUserSession, setCurrentUserSession] =
    useState<UserSession | null>(null); // State to store the fetched user session

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmitContactForm: SubmitHandler<ContactFormInputs> = async (
    data
  ) => {
    if (!isPrivacyPolicyAccepted) {
      toast.error("Please agree to the privacy policy to send your message.");
      return;
    }

    const formData = {
      name: `${data.firstname} ${data.lastname}`,
      email: data.email,
      message: data.message,
    };

    await toast.promise(
      (async () => {
        const response = await fetch("/api/talk-to-us", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to send message.");
        }

        const result = await response.json();
        reset();
        setIsPrivacyPolicyAccepted(false); // Reset checkbox state
        return result;
      })(),
      {
        loading: "Sending your message...",
        success: "Message sent successfully! We'll get back to you soon.",
        error: "Failed to send message. Please try again later.",
      }
    );
  };

  const handleTestimonialSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent default form submission behavior
    setIsTestimonialLoading(true);

    // 1. Check if user is logged in
    if (!currentUserSession?.user?.id) {
      toast.error("You must be logged in to submit a testimonial.");
      setIsTestimonialLoading(false);
      return;
    }

    // 2. Validate testimonial content
    if (
      !testimonialData.content ||
      testimonialData.content.trim().length < 10
    ) {
      toast.error(
        "Testimonial content is too short. Please write at least 10 characters."
      );
      setIsTestimonialLoading(false);
      return;
    }

    const submitData = {
      content: testimonialData.content,
      userId: currentUserSession.user.id, // Use the ID from the fetched session
    };

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.error || "Failed to submit testimonial. Server error.");
      // }

      const result = await response.json();
      // console.log('Testimonial submitted successfully:', result);
      toast.success(
        "Testimonial submitted successfully! It will be reviewed before being featured."
      );
      setIsTestimonialModalOpen(false); // Close modal on success
      setTestimonialData({ content: "" }); // Reset form data
    } catch (error: any) {
      console.error("Error submitting testimonial:", error);
      toast.error(
        `Failed to submit testimonial: ${error.message || "An unexpected error occurred."}`
      );
    } finally {
      setIsTestimonialLoading(false);
    }
  };

  // Fetch user session on component mount
  useEffect(() => {
    async function getUserSession() {
      if (typeof window !== "undefined") {
        // Ensure this runs only on the client
        try {
          // Use the correct type for betterFetch response
          const session = await getCurrentSession();

          setCurrentUserSession(session);
          console.log("User session data:", session);
        } catch (error) {
          console.error("Failed to fetch user session:", error);
          setCurrentUserSession(null); // Clear session on error
        }
      }
    }
    getUserSession();
  }, []); // Empty dependency array means this runs once on mount

  // Determine if the testimonial submit button should be disabled
  const isTestimonialSubmitDisabled =
    !testimonialData.content ||
    testimonialData.content.trim().length < 10 ||
    isTestimonialLoading || // Disable while loading
    !currentUserSession?.user?.id; // Disable if no user is logged in

  return (
    <div className="py-8 space-y-8">
      <section className="container">
        <div className="container">
          <div className="max-w-3xl space-y-3">
            <h5 className="text-firefly">
              Contact us
            </h5>
            <h1>
              Get in touch with us today to learn more
            </h1>
            <p className="">
              We'd love to hear from you! Reach out to our team today to
              discover more about <span className="font-">COSTrAD</span>, ask
              questions, or get the information you need. Don't hesitate to
              contact us — we're here to help and look forward to connecting
              with you.
            </p>
          </div>
          <div className="mt-4 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-8">
            {/* Testimonials Section */}
            <div className="flex flex-col justify-between gap-6 rounded-lg border p-6">
              <div>
                <h2 className="mb-4 text-xl font-medium md:text-2xl">
                  Testimonials
                </h2>
                <p className="text-foreground">
                  Whether it's the impact it has had on your personal
                  development, professional growth, or leadership
                  transformation, we'd love to hear your story and how COSTrAD
                  has influenced your perspective and aspirations.
                </p>
              </div>
              <Button
                variant="link"
                onClick={() => setIsTestimonialModalOpen(true)}
                className="text-left p-0 justify-start text-primary cursor-pointer gap-x-2"
              >
                <span>Submit Testimonial</span>
                <ArrowRight className="size-4 inline-block ml-1 pt-1" />
              </Button>
            </div>

            {/* Support Section */}
            <div className="flex flex-col justify-between gap-6 rounded-lg border p-6">
              <div>
                <h2 className="mb-4 text-xl font-medium md:text-2xl">
                  Support
                </h2>
                <p className="text-foreground">
                  Our team is always ready to support you with any questions or
                  challenges you may encounter while using the platform. Whether
                  you're navigating a new feature, troubleshooting an issue, or
                  simply curious about how something works, we're here to guide
                  you.
                </p>
              </div>
              <Link href="#" className="hover:underline">
                Get support
              </Link>
            </div>

            {/* Feedback Section */}
            <div className="flex flex-col justify-between gap-6 rounded-lg border p-6">
              <div>
                <h2 className="mb-4 text-xl font-medium md:text-2xl">
                  Feedback
                </h2>
                <p className="text-foreground">
                  We would truly appreciate hearing your thoughts, suggestions,
                  and insights on how we can enhance and elevate our overall web
                  presence.
                </p>
              </div>
              <a href="#" className="hover:underline">
                Submit Feedback
              </a>
            </div>
          </div>
          <div className="mt-12">
            <Jumbotron
              className=""
              heroImage="map.jpg"
              height="md:h-[550px] h-dvh rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section className="">
        <div className="container">
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Link
              className="group rounded-md border border-border p-6"
              href="#"
            >
              <div className="flex items-center justify-between gap-4">
                <FaXTwitter className="size-5" />
                <ArrowUpRight className="size-4 -translate-x-2 translate-y-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </div>
              <div className="mt-4">
                <h3 className="mb-1 font-semibold">Twitter</h3>
                <p className="text-sm text-muted-foreground">
                  Follow our latest updates and announcements.
                </p>
              </div>
            </Link>
            <Link
              className="group rounded-md border border-border p-6"
              href="#"
            >
              <div className="flex items-center justify-between gap-4">
                <FaTiktok className="size-5" />
                <ArrowUpRight className="size-4 -translate-x-2 translate-y-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </div>
              <div className="mt-4">
                <h3 className="mb-1 font-semibold">TikTok</h3>
                <p className="text-sm text-muted-foreground">
                  Discover short-form leadership insights.
                </p>
              </div>
            </Link>
            <Link
              className="group rounded-md border border-border p-6"
              href="#"
            >
              <div className="flex items-center justify-between gap-4">
                <FaWhatsapp className="size-5" />
                <ArrowUpRight className="size-4 -translate-x-2 translate-y-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </div>
              <div className="mt-4">
                <h3 className="mb-1 font-semibold">Whatsapp</h3>
                <p className="text-sm text-muted-foreground">
                  Connect directly for instant support.
                </p>
              </div>
            </Link>
            <Link
              className="group rounded-md border border-border p-6"
              href="#"
            >
              <div className="flex items-center justify-between gap-4">
                <FaFacebook className="size-5" />
                <ArrowUpRight className="size-4 -translate-x-2 translate-y-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </div>
              <div className="mt-4">
                <h3 className="mb-1 font-semibold">FaceBook</h3>
                <p className="text-sm text-muted-foreground">
                  Join our Discord server and connect with other developers.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Submission Modal */}
      <GenericShadcnFormModal
        isOpen={isTestimonialModalOpen}
        onOpenChange={setIsTestimonialModalOpen}
        title="Share Your Testimonial"
        description="We'd love to hear about your experience with COSTrAD."
        primaryButtonText="Submit Testimonial"
        className="text-background cursor-pointer "
        secondaryButtonText="Cancel"
        onPrimaryButtonClick={handleTestimonialSubmit}
        isLoading={isTestimonialLoading}
        isPrimaryButtonDisabled={isTestimonialSubmitDisabled}
      >
        <TestimonialForm
          onFormChange={setTestimonialData}
          initialData={testimonialData}
        />
      </GenericShadcnFormModal>
    </div>
  );
}
