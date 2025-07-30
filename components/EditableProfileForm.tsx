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
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import Loading from "./Loading";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";

interface ProfileForm {
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
  disabilityAssistance?: boolean;
  disabilityDescription?: string;
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
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ProfileForm>();

  const [loading, setLoading] = useState(true);
  const dateOfBirth = watch("dateOfBirth");
  const disabilityAssistance = watch("disabilityAssistance");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        reset(data);
      } else {
        console.error("Failed to load profile.");
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

  if (loading) return <Loading />;

  return (
    <Card className="w-full max-w-4xl mx-auto my-10 p-2 ">
      <CardHeader className="p-2">
        <CardTitle>Profile Form</CardTitle>
        <CardDescription>Complete your personal profile</CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <Label htmlFor="gender">Gender</Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="gender" className="w-full">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal py-2",
                      !dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 " />
                    {dateOfBirth
                      ? format(new Date(dateOfBirth), "PPP")
                      : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-background cursor-pointer ">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth ? new Date(dateOfBirth) : undefined}
                    onSelect={(date) =>
                      setValue(
                        "dateOfBirth",
                        date?.toISOString().split("T")[0] || "",
                        { shouldValidate: true }
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

            <div className="space-y-1">
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Controller
                name="maritalStatus"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="maritalStatus" className="w-full">
                      <SelectValue placeholder="Marital Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "SINGLE",
                        "MARRIED",
                        "DIVORCED",
                        "WIDOWED",
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

            <div className="space-y-1">
              <Label htmlFor="religion">Belief System</Label>
              <Controller
                name="religion"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="religion" className="w-full">
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
          </div>

          <div className=" grid sm:grid-cols-3 gap-2">
            {[
              ["nationality", "Nationality"],
              ["telephone", "Telephone"],
              ["mobile", "Mobile"],
              ["address", "Address"],
              ["addressLine2", "Address Line 2"],
              ["city", "City"],
              ["state", "State"],
              ["zipcode", "Zipcode"],
              ["country", "Country"],
              ["emergencyContactName", "Emergency Contact Name"],
              ["emergencyContactTelephone", "Emergency Contact Telephone"],
              ["profession", "Profession"],
              ["linkedIn", "LinkedIn"],
              ["personalWebsite", "Personal Website"],
              ["twitter", "Twitter"],
              ["facebook", "Facebook"],
              ["instagram", "Instagram"],
              ["youtube", "YouTube"],
              ["github", "GitHub"],
              ["tiktok", "TikTok"],
            ].map(([name, label]) => (
              <div className="space-y-3" key={name}>
                <Label htmlFor={name}>{label}</Label>
                <Input
                  id={name}
                  placeholder={label}
                  {...register(name as keyof ProfileForm)}
                />
              </div>
            ))}
          </div>

          <div>
            <Label>Biography</Label>
            <Textarea {...register("biography")} placeholder="Brief bio" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="highestQualification">
                Highest Qualification
              </Label>
              <Controller
                name="highestQualification"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="highestQualification" className="w-full">
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
            </div>

            <div className="space-y-1">
              <Label htmlFor="languagePreference">Language Preference</Label>
              <Controller
                name="languagePreference"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="languagePreference" className="w-full">
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
          </div>

          <div className="grid gap-3">
            {/* Disability Assistance */}
            <Card>
              <CardHeader>
                <Label className="block mb-2">
                  Do you require any form of disability assistance or
                  accommodations during the program?
                </Label>
              </CardHeader>
              <CardContent>
                <Controller
                  name="disabilityAssistance"
                  control={control}
                  rules={{
                    validate: (v) =>
                      v === true || v === false
                        ? true
                        : "Please select an option",
                  }}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={(val) => field.onChange(val === "yes")}
                      defaultValue={field.value ? "yes" : undefined}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id="assist-yes" />
                        <Label htmlFor="assist-yes">
                          Yes, I require assistance
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="assist-no" />
                        <Label htmlFor="assist-no">No, I do not</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </CardContent>
              <CardFooter>
                {errors.disabilityAssistance && (
                  <p className="text-red-500 text-sm">
                    {errors.disabilityAssistance.message}
                  </p>
                )}
              </CardFooter>
            </Card>

            {/* Conditional Disability Description */}
            {disabilityAssistance && (
              <Card>
                <CardHeader>
                  <Label>
                    Please describe the nature of the assistance you may need
                  </Label>
                </CardHeader>
                <CardContent>
                  <Textarea
                    {...register("disabilityDescription", {
                      required: "Description is required",
                    })}
                    placeholder="Describe the specific assistance or accommodation you would benefit from"
                  />
                  {errors.disabilityDescription && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.disabilityDescription.message}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <Button className="w-full sm:w-auto" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
