/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
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
import { CalendarIcon, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";

export type RegisterLoginProps = {
  costradCallbackUrl?: string | null;
};

export interface ProfileForm {
  gender: "MALE" | "FEMALE";
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
  nationality: string;
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
  // studentId?: string;
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
    setValue,
    watch,
    control,
  } = useForm<ProfileForm>();

  const dateOfBirth = watch("dateOfBirth");

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

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="py-4">
        <CardTitle className="text-lg uppercase">
          Complete Profile To Register
        </CardTitle>
        <CardDescription className="text-lg">
          Enter your profile details—a one-time requirement for all users
          registering on the Costrad platform.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Gender */}
            <div className="w-full">
              <Label>Gender</Label>
              <Controller
                name="gender"
                control={control}
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="w-full bg-background text-foreground">
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 " />
                    {dateOfBirth
                      ? format(new Date(dateOfBirth), "PPP")
                      : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-background">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth ? new Date(dateOfBirth) : undefined}
                    onSelect={(date) =>
                      setValue(
                        "dateOfBirth",
                        date?.toISOString().split("T")[0] || "",
                        {
                          shouldValidate: true,
                        }
                      )
                    }
                    className="rounded-lg bg-background text-foreground border shadow-sm"
                    initialFocus
                    captionLayout="dropdown"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                {...register("dateOfBirth", {
                  required: "Date of Birth is required",
                })}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500">{errors.dateOfBirth.message}</p>
              )}
            </div>
          </div>
          {/* Marital Status & Religion */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Marital Status</Label>
              <Select {...register("maritalStatus")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Marital status" />
                </SelectTrigger>
                <SelectContent className="w-full bg-background text-foreground">
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
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Religion" />
                </SelectTrigger>
                <SelectContent className="w-full bg-background text-foreground">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* Contact Info */}
            <div>
              <Label>Telephone</Label>
              <Input
                {...register("telephone", {
                  required: "Telephone is required",
                })}
              />
              {errors.telephone && (
                <p className="text-red-500">{errors.telephone.message}</p>
              )}
            </div>
            <div>
              <Label>Mobile (optional)</Label>
              <Input {...register("mobile")} />
            </div>
            {/* Bio & Profession */}
            <div>
              <Label>Profession</Label>
              <Input {...register("profession")} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {/* Address */}
            <div>
              <Label>Address</Label>
              <Textarea {...register("address")} placeholder="Street address" />
            </div>
            <div>
              <Label>Address Line 2</Label>
              <Textarea
                {...register("addressLine2")}
                placeholder="Apt, suite, etc."
              />
            </div>
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

          <div className="grid sm:grid-cols-2 gap-2">
            {" "}
            {/* Emergency Contact */}
            <div>
              <Label>Emergency Contact Name</Label>
              <Input {...register("emergencyContactName")} />
            </div>
            <div>
              <Label>Emergency Contact Telephone</Label>
              <Input {...register("emergencyContactTelephone")} />
            </div>
          </div>

          <div>
            <Label>Biography</Label>
            <Textarea {...register("biography")} placeholder="Brief bio" />
          </div>

          {/* Qualifications */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Highest Qualification</Label>
              <Select {...register("highestQualification")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Qualification" />
                </SelectTrigger>
                <SelectContent className="w-full bg-background text-foreground">
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
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="w-full bg-background text-foreground">
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

          <div className="grid sm:grid-cols-2 gap-2">
            {/* Links & IDs */}
            <div>
              <Label>LinkedIn URL</Label>
              <Input {...register("linkedIn")} />
            </div>
            <div>
              <Label>Personal Website</Label>
              <Input {...register("personalWebsite")} />
            </div>
          </div>
          {/* <div>
            <Label>Student ID</Label>
            <Input {...register("studentId")} />
          </div> */}

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

      <CardFooter className="text-center w-full">
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
