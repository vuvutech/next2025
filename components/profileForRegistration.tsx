"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PasswordInput } from "./ui/password-input";
import SeperatorWithText from "./ui/seperatorWithText";
import { signIn, signUp } from "@/lib/auth-client";
import { Calendar } from "lucide-react";
import { X, Loader2 } from "lucide-react";

export type RegisterLoginProps = {
  costradCallbackUrl?: string | null;
};

export interface ProfileForm {
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

export function ProfileForRegistration({
  costradCallbackUrl,
}: RegisterLoginProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl =
    costradCallbackUrl || searchParams.get("callbackUrl") || "/apply";

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>();

  const onSubmit = async (data: ProfileForm) => {
    setLoading(true);
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast.success("Profile saved!");
      router.push(callbackUrl);
    } catch {
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Profile To Register</CardTitle>
        <CardDescription>
          Enter your profile details—a one-time requirement for all users
          registering on the Costrad platform.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Gender */}
          <div>
            <Label>Gender</Label>
            <Select {...register("gender", { required: "Gender is required" })}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
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
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <Label>Date of Birth</Label>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <Input
                type="date"
                {...register("dateOfBirth", { required: "Required" })}
              />
            </div>
            {errors.dateOfBirth && (
              <p className="text-red-500">{errors.dateOfBirth.message}</p>
            )}
          </div>

          {/* Marital Status & Religion */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Marital Status</Label>
              <Select {...register("maritalStatus")}>
                <SelectTrigger>
                  <SelectValue placeholder="Marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SINGLE">Single</SelectItem>
                  <SelectItem value="MARRIED">Married</SelectItem>
                  <SelectItem value="DIVORCED">Divorced</SelectItem>
                  <SelectItem value="WIDOWED">Widowed</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Religion</Label>
              <Select {...register("religion")}>
                <SelectTrigger>
                  <SelectValue placeholder="Religion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CHRISTIANITY">Christianity</SelectItem>
                  <SelectItem value="ISLAM">Islam</SelectItem>
                  <SelectItem value="HINDUISM">Hinduism</SelectItem>
                  <SelectItem value="BUDDHISM">Buddhism</SelectItem>
                  <SelectItem value="JUDAISM">Judaism</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                  <SelectItem value="NONE">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <Label>Telephone</Label>
            <Input
              {...register("telephone", { required: "Telephone is required" })}
            />
            {errors.telephone && (
              <p className="text-red-500">{errors.telephone.message}</p>
            )}
          </div>
          <div>
            <Label>Mobile (optional)</Label>
          </div>
          <Input {...register("mobile")} />

          {/* Address */}
          <div>
            <Label>Address</Label>
            <Input {...register("address")} placeholder="Street address" />
          </div>
          <div>
            <Label>Address Line 2</Label>
            <Input
              {...register("addressLine2")}
              placeholder="Apt, suite, etc."
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>City</Label>
              <Input {...register("city")} />
            </div>
            <div>
              <Label>State</Label>
              <Input {...register("state")} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Country</Label>
              <Input {...register("country")} />
            </div>
            <div>
              <Label>Zipcode</Label>
              <Input {...register("zipcode")} />
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <Label>Emergency Contact Name</Label>
            <Input {...register("emergencyContactName")} />
          </div>
          <div>
            <Label>Emergency Contact Telephone</Label>
            <Input {...register("emergencyContactTelephone")} />
          </div>

          {/* Bio & Profession */}
          <div>
            <Label>Profession</Label>
            <Input {...register("profession")} />
          </div>
          <div>
            <Label>Biography</Label>
            <Input {...register("biography")} placeholder="Brief bio" />
          </div>

          {/* Qualifications */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Highest Qualification</Label>
              <Select {...register("highestQualification")}>
                <SelectTrigger>
                  <SelectValue placeholder="Qualification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
                  <SelectItem value="BACHELORS">Bachelors</SelectItem>
                  <SelectItem value="MASTERS">Masters</SelectItem>
                  <SelectItem value="DOCTORATE">Doctorate</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Language Preference</Label>
              <Select {...register("languagePreference")}>
                <SelectTrigger>
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ENGLISH">English</SelectItem>
                  <SelectItem value="FRENCH">French</SelectItem>
                  <SelectItem value="SPANISH">Spanish</SelectItem>
                  <SelectItem value="GERMAN">German</SelectItem>
                  <SelectItem value="CHINESE">Chinese</SelectItem>
                  <SelectItem value="ARABIC">Arabic</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Links & IDs */}
          <div>
            <Label>LinkedIn URL</Label>
            <Input {...register("linkedIn")} />
          </div>
          <div>
            <Label>Personal Website</Label>
            <Input {...register("personalWebsite")} />
          </div>
          <div>
            <Label>Student ID</Label>
            <Input {...register("studentId")} />
          </div>

          {/* Social Handles */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Twitter</Label>
              <Input {...register("twitter")} />
            </div>
            <div>
              <Label>Facebook</Label>
              <Input {...register("facebook")} />
            </div>
            <div>
              <Label>Instagram</Label>
              <Input {...register("instagram")} />
            </div>
            <div>
              <Label>YouTube</Label>
              <Input {...register("youtube")} />
            </div>
            <div>
              <Label>GitHub</Label>
              <Input {...register("github")} />
            </div>
            <div>
              <Label>TikTok</Label>
              <Input {...register("tiktok")} />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Save Profile"}
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <div className="text-center text-xs text-muted-foreground">
          By completing this form, you agree to our{" "}
          <a href="/terms" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          .
        </div>
      </CardFooter>
    </Card>
  );
}
