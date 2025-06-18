// components/TestimonialForm.tsx
"use client"; // Essential for client-side functionality

import React, { useState, useEffect } from 'react';
// Shadcn Input
import { Label } from "@/components/ui/label";     // Shadcn Label (often used with Input)
// import { Textarea } from "@/components/ui/textarea"
import { Textarea } from "@/components/ui/textarea"; // Update this path if your Textarea component is located elsewhere, e.g. "@/components/Textarea"
// Shadcn Checkbox (if you use it)

// Define the interface for your Testimonial form data
export interface TestimonialFormData { // Export this interface if you need it in other files
  content: string;
  // featured: boolean; // Keep this if you plan to include it in the form
}

// Define the props interface for TestimonialForm
interface TestimonialFormProps {
  initialData?: Partial<TestimonialFormData>;
  onFormChange: (data: TestimonialFormData) => void;
}

export default function TestimonialForm({ initialData = {}, onFormChange }: TestimonialFormProps) {
  const [formData, setFormData] = useState<TestimonialFormData>({
    content: initialData.content || '',
    // featured: initialData.featured || false, // Initialize if featured is part of the form
  });

  useEffect(() => {
    // Call onFormChange whenever form data updates
    onFormChange(formData);
  }, [formData, onFormChange]);

  // Handle changes for both Input and Textarea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle change for Checkbox (if used)
  // const handleCheckboxChange = (checked: boolean) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     featured: checked,
  //   }));
  // };

  return (
    <> {/* Use a fragment to group form elements */}
      <div className="grid w-full items-center gap-1.5"> {/* Shadcn recommended wrapper for Label+Input */}
        <Label htmlFor="testimonial-content">Your Testimonial</Label>
        <Textarea
          id="testimonial-content"
          placeholder="Share your experience here..."
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="resize-y" // Allow vertical resizing
          rows={5} // Set initial rows
        />
      </div>

      {/* If you use a featured checkbox: */}
      {/* <div className="flex items-center space-x-2 mt-4">
        <Checkbox
          id="featured-testimonial"
          checked={formData.featured}
          onCheckedChange={handleCheckboxChange} // Shadcn Checkbox uses onCheckedChange
        />
        <Label htmlFor="featured-testimonial">Feature this testimonial?</Label>
      </div> */}
    </>
  );
}