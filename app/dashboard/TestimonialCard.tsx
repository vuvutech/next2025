"use client";

import { Button } from "@/components/ui/button";

import { useSession } from "@/lib/auth-client";
import { Session } from "@/lib/auth-types";
import { useRouter } from "next/navigation";
import { testimonialcolumns } from "./testimonialcolumns";
import { DataTable } from "./testimonial-data-table";
import { useEffect, useState } from "react";
import GenericShadcnFormModal from "@/components/GenericShadcnFormModal";
import TestimonialForm, {
  TestimonialFormData,
} from "@/components/TestimonialForm";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getCurrentSession } from "../actions/functions";
import { ArrowRight } from "lucide-react";

// Define the type for the contact form inputs
type ContactFormInputs = {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
};

interface UserSession {
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export default function TestimonialCard(props: { session: Session | null }) {
  const router = useRouter();
  const { data } = useSession();
  const session = data || props.session;

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isTestimonialLoading, setIsTestimonialLoading] =
    useState<boolean>(false);
  const [currentUserSession, setCurrentUserSession] =
    useState<UserSession | null>(null); // State to store the fetched user session
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] =
    useState<boolean>(false);
  const [testimonialData, setTestimonialData] = useState<TestimonialFormData>({
    content: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>();

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to submit testimonial. Server error."
        );
      }

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
      //   refresh page
      router.refresh();
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

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/user/testimonials", {
          credentials: "include", // 👈 ensures cookies are sent
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Something went wrong");

        setTestimonials(data);
      } catch (err) {
        console.error("Error loading testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            My Testimonials
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Customize your account settings.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsTestimonialModalOpen(true)}
          className="text-center p-0 justify-start text-primary cursor-pointer gap-x-2 w-auto max-w-[200px] "
        >
          <span>Submit Testimonial</span>
          <ArrowRight className="size-4 inline-block ml-1 pt-1" />
        </Button>
      </div>
      <div>
        <DataTable columns={testimonialcolumns} data={testimonials} />
      </div>

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

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
