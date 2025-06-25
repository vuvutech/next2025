"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ProfileForm {
  gender: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";
  dateOfBirth: string;
  maritalStatus?: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED" | "OTHER";
  religion?:
    | "CHRISTIANITY"
    | "ISLAM"
    | "HINDUISM"
    | "BUDDHISM"
    | "JUDAISM"
    | "OTHER"
    | "NONE";
  nationality?: string;
  telephone: string;
  mobile?: string;
  address?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  emergencyContactName?: string;
  emergencyContactTelephone?: string;
  biography?: string;
  profession?: string;
  highestQualification?:
    | "HIGH_SCHOOL"
    | "BACHELORS"
    | "MASTERS"
    | "DOCTORATE"
    | "OTHER";
  languagePreference?:
    | "ENGLISH"
    | "FRENCH"
    | "SPANISH"
    | "GERMAN"
    | "CHINESE"
    | "ARABIC"
    | "OTHER";
  linkedIn?: string;
  personalWebsite?: string;
  studentId?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  github?: string;
  tiktok?: string;
}

export default function EditableProfileForm() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<ProfileForm>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        reset(data); // populate form
      } else {
        toast.error("Failed to load profile.");
      }
      setLoading(false);
    };
    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: ProfileForm) => {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      toast.success("Profile updated!");
    } catch (error) {
      toast.error("Could not save profile.");
      console.error(error);
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid sm:grid-cols-4 gap-4">
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
                <SelectItem value="PREFER_NOT_TO_SAY">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <Input type="date" {...register("dateOfBirth")} />
        <Controller
          name="maritalStatus"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Marital Status" />
              </SelectTrigger>
              <SelectContent>
                {["SINGLE", "MARRIED", "DIVORCED", "WIDOWED", "OTHER"].map(
                  (val) => (
                    <SelectItem key={val} value={val}>
                      {val}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          name="religion"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Religion" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "CHRISTIANITY",
                  "ISLAM",
                  "HINDUISM",
                  "BUDDHISM",
                  "JUDAISM",
                  "OTHER",
                  "NONE",
                ].map((val) => (
                  <SelectItem key={val} value={val}>
                    {val}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <Input placeholder="Nationality" {...register("nationality")} />
      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="Telephone" {...register("telephone")} />
        <Input placeholder="Mobile" {...register("mobile")} />
      </div>
      <Input placeholder="Address" {...register("address")} />
      <Input placeholder="Address Line 2" {...register("addressLine2")} />
      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="City" {...register("city")} />
        <Input placeholder="State" {...register("state")} />
        <Input placeholder="Zipcode" {...register("zipcode")} />
        <Input placeholder="Country" {...register("country")} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Input
          placeholder="Emergency Contact Name"
          {...register("emergencyContactName")}
        />
        <Input
          placeholder="Emergency Contact Telephone"
          {...register("emergencyContactTelephone")}
        />
      </div>

      <Textarea placeholder="Biography" {...register("biography")} />
      <Input placeholder="Profession" {...register("profession")} />

      <div className="grid grid-cols-2 gap-2">
        <Controller
          name="highestQualification"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Qualification" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "HIGH_SCHOOL",
                  "BACHELORS",
                  "MASTERS",
                  "DOCTORATE",
                  "OTHER",
                ].map((val) => (
                  <SelectItem key={val} value={val}>
                    {val}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          name="languagePreference"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "ENGLISH",
                  "FRENCH",
                  "SPANISH",
                  "GERMAN",
                  "CHINESE",
                  "ARABIC",
                  "OTHER",
                ].map((val) => (
                  <SelectItem key={val} value={val}>
                    {val}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="LinkedIn URL" {...register("linkedIn")} />
        <Input placeholder="Website" {...register("personalWebsite")} />
        <Input placeholder="Student ID" {...register("studentId")} />
        <Input placeholder="Twitter" {...register("twitter")} />
        <Input placeholder="Facebook" {...register("facebook")} />
        <Input placeholder="Instagram" {...register("instagram")} />
        <Input placeholder="YouTube" {...register("youtube")} />
        <Input placeholder="GitHub" {...register("github")} />
        <Input placeholder="TikTok" {...register("tiktok")} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
}
