"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { baseUrl } from "@/lib/metadata";
import { getBaseUrl } from "@/config/site";
import { toast } from "sonner";

export type Institute = {
  name: string;
  acronym: string;
  overview: string;
  about: string;
};

export default function EditInstitutePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState<Institute>({
    name: "",
    acronym: "",
    overview: "",
    about: "",
  });

  // Fetch institute
  useEffect(() => {
    if (!slug) {
      setError(true);
      return;
    }

    async function fetchInstitute() {
      try {
        const response = await fetch(`${baseUrl}/api/institutes/${slug}`);
        if (!response.ok) {
          setError(true);
        } else {
          const data: Institute = await response.json();
          setFormState(data);
        }
      } catch (err) {
        console.error("Failed to fetch institute", err);
        setError(true);
      }
    }

    fetchInstitute();
  }, [slug]);

  // Handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Handle rich text change
  const handleAboutChange = (value: string) => {
    setFormState((prev) => ({ ...prev, about: value }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${getBaseUrl()}/api/institutes/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok)
        throw new Error((await res.json()).error || "Failed to update");

      toast.success("Institute updated!");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className="p-6">Institute not found.</div>;
  if (!slug || !formState.name) return <div className="p-6">Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Edit Institute: {formState.name}</h1>
      <div className="grid gap-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="acronym">Acronym</Label>
          <Input
            id="acronym"
            name="acronym"
            value={formState.acronym}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="overview">Overview</Label>
          <Textarea
            id="overview"
            name="overview"
            value={formState.overview}
            onChange={handleChange}
            required
            className="min-h-[150px]"
          />
        </div>
        <div>
          <Label htmlFor="about">About</Label>
          <Textarea
            id="about"
            name="about"
            value={formState.about}
            onChange={handleChange}
            required
            className="min-h-[150px]"
            
          />
          {/* <SimpleEditorWithProps
            initialContent={formState.about}
            fieldName="about"
            onChange={(value) =>
              setFormState((prev) => ({ ...prev, about: value }))
            }
          /> */}
        </div>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}