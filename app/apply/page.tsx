"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { useDialog } from "@/providers/DialogProvider";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import RegistrationSteps from "@/components/RegistrationSteps";
// import RegistrationSteps from "./RegistrationSteps";

// ~70% of Profile fields from Prisma schema
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

export default function Apply() {
  const { isOpen, close } = useDialog();
  const { data: session } = useSession();
  const [profileComplete, setProfileComplete] = useState(false);
  const [institutes, setInstitutes] = useState<string[]>([]);
  const [selectedInstitute, setSelectedInstitute] = useState<string | null>(
    null
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileForm>();

  useEffect(() => {
    if (session?.user) {
      fetch("/api/profile")
        .then((res) => res.json())
        .then((profile) => {
          const complete = !!(
            profile.gender &&
            profile.telephone &&
            profile.dateOfBirth &&
            profile.address
          );
          setProfileComplete(complete);
        });
    }
    fetch("/api/institutes")
      .then((res) => res.json())
      .then((data) => setInstitutes(data.map((i: any) => i.name)));
    console.log("Institutes fetched:", institutes);
  }, [session]);

  const onProfileSubmit = (data: ProfileForm) => {
    console.log("Profile data submitted:", data);
    fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => setProfileComplete(true));
  };

  const onRegister = () => {
    if (!selectedInstitute) return;
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ institute: selectedInstitute }),
    }).then(() => close());
  };

  return (
    <div className="mt-4 space-y-6 place-content-start place-items-start ">
      <div className="flex items-center justify-between w-full">
        {!session?.user && <RegistrationSteps />}
      </div>

      {session?.user && !profileComplete && (
        <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-4 gap-4">
            <div>
              <Controller
                name="gender"
                control={control}
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
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
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <Input
                  type="date"
                  {...register("dateOfBirth", {
                    required: "Date of birth is required",
                  })}
                />
              </div>
              {errors.dateOfBirth && (
                <p className="text-red-500">{errors.dateOfBirth.message}</p>
              )}
            </div>

            <div>
              <Select {...register("maritalStatus")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Marital Status" />
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
              <Select {...register("religion")}>
                <SelectTrigger className="w-full">
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
          <Input placeholder="Nationality" {...register("nationality")} />

          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Telephone"
              {...register("telephone", {
                required: "Telephone is required",
              })}
            />
            <Input placeholder="Mobile" {...register("mobile")} />
          </div>
          {errors.telephone && (
            <p className="text-red-500">{errors.telephone.message}</p>
          )}

          <Input placeholder="Address" {...register("address")} />
          <Input placeholder="Address Line 2" {...register("addressLine2")} />
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="City" {...register("city")} />
            <Input placeholder="State" {...register("state")} />
          </div>
          <div className="grid grid-cols-2 gap-2">
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

          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Profession" {...register("profession")} />
            <Input placeholder="Student ID" {...register("studentId")} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select {...register("highestQualification")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Highest Qualification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
                <SelectItem value="BACHELORS">Bachelors</SelectItem>
                <SelectItem value="MASTERS">Masters</SelectItem>
                <SelectItem value="DOCTORATE">Doctorate</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select {...register("languagePreference")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Language Preference" />
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

          <Input placeholder="Biography" {...register("biography")} />

          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="LinkedIn URL" {...register("linkedIn")} />
            <Input
              placeholder="Personal Website"
              {...register("personalWebsite")}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Twitter Handle" {...register("twitter")} />
            <Input placeholder="Facebook Profile" {...register("facebook")} />
            <Input placeholder="Instagram Profile" {...register("instagram")} />
            <Input placeholder="YouTube Channel" {...register("youtube")} />
            <Input placeholder="GitHub Username" {...register("github")} />
            <Input placeholder="TikTok Username" {...register("tiktok")} />
          </div>

          <Button type="submit" className="w-full">
            Save Profile
          </Button>
        </form>
      )}

      {session?.user && profileComplete && (
        <div className="space-y-4 w-full">
          <Select onValueChange={setSelectedInstitute}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Institute" />
            </SelectTrigger>
            <SelectContent>
              {institutes.map((name) => (
                <SelectItem key={name} value={name}>
                  <div>
                    <span>{name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={onRegister} disabled={!selectedInstitute}>
            Register
          </Button>
        </div>
      )}
    </div>
  );
}
