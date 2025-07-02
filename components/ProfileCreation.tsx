"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Country, CountryDropdown } from "@/components/ui/country-dropdown";
import {
  PhoneInput,
  phoneSchema,
  CountryData,
} from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";

// Zod schema
export const FormSchema = z.object({
  gender: z.enum(["MALE", "FEMALE"]),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  maritalStatus: z
    .enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED", "OTHER"])
    .optional(),
  religion: z
    .enum([
      "CHRISTIANITY",
      "ISLAM",
      "HINDUISM",
      "BUDDHISM",
      "JUDAISM",
      "OTHER",
      "NONE",
    ])
    .optional(),
  nationality: z.string().min(1, "Nationality is required"),
  disabilityAssistance: z.boolean().optional(),
  disabilityDescription: z.string().optional(),
  telephone: phoneSchema,
  mobile: phoneSchema
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  address: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().min(1, "Please select a country"),
  zipcode: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactTelephone: phoneSchema
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  biography: z.string().optional(),
  profession: z.string().optional(),
  highestQualification: z
    .enum(["HIGH_SCHOOL", "BACHELORS", "MASTERS", "DOCTORATE", "OTHER"])
    .optional(),
  languagePreference: z
    .enum([
      "ENGLISH",
      "FRENCH",
      "SPANISH",
      "GERMAN",
      "CHINESE",
      "ARABIC",
      "OTHER",
    ])
    .optional(),
  linkedIn: z
    .string()
    .url()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  personalWebsite: z
    .string()
    .url()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  twitter: z
    .string()
    .url()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  facebook: z
    .string()
    .url()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  instagram: z
    .string()
    .url()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  youtube: z
    .string()
    .url()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  github: z
    .string()
    .url()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  tiktok: z
    .string()
    .url()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
});
type FormSchema = z.infer<typeof FormSchema>;

export const ProfileCreation = () => {
  const [countryData, setCountryData] = React.useState<CountryData>();
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
    null
  );
  const [selectedNationality, setSelectedNationality] =
    React.useState<Country | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      gender: "MALE", // or "" if optional
      dateOfBirth: "",
    //   maritalStatus: undefined,
    //   religion: undefined,
    //   nationality: "",
    //   disabilityAssistance: false,
    //   disabilityDescription: "",
    //   telephone: "",
    //   mobile: "",
    //   address: "",
    //   addressLine2: "",
    //   city: "",
    //   state: "",
    //   country: "",
    //   zipcode: "",
    //   emergencyContactName: "",
    //   emergencyContactTelephone: "",
    //   biography: "",
    //   profession: "",
    //   highestQualification: undefined,
    //   languagePreference: undefined,
    //   linkedIn: "",
    //   personalWebsite: "",
    //   twitter: "",
    //   facebook: "",
    //   instagram: "",
    //   youtube: "",
    //   github: "",
    //   tiktok: "",
    },
  });

  function onSubmit(data: FormSchema) {
    toast.success("Profile submitted successfully!");
    console.log(data);
  }

  return (
    <Card className="w-full max-w-4xl mx-auto my-10">
      <CardHeader>
        <CardTitle>Profile Form</CardTitle>
        <CardDescription>Complete your personal profile</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-2">
              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => {
                  const date = field.value ? new Date(field.value) : undefined;

                  return (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="secondary"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreg<SelectTrigger>round"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? format(new Date(field.value), "PPP")
                                : "Select a date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-background cursor-pointer">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(selectedDate) =>
                              field.onChange(
                                selectedDate?.toISOString().split("T")[0] || ""
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
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/* Nationality */}
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Ghanaian" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-2">
              {/* Country Dropdown */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country of Residence</FormLabel>
                    <CountryDropdown
                      placeholder="Select country"
                      defaultValue={field.value}
                      onChange={(country) => {
                        field.onChange(country.alpha3);
                        setSelectedCountry(country);
                        setCountryData(country);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Telephone */}
              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telephone</FormLabel>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        defaultCountry={selectedCountry?.alpha2}
                        onCountryChange={setCountryData}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Profession */}
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profession</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your profession" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Address & Emergency */}
            <div className="grid sm:grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Street address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Apartment, suite, etc." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. 10001" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="City" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="State or region" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emergencyContactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Full name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Emergency Phone */}
            <FormField
              control={form.control}
              name="emergencyContactTelephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      defaultCountry={selectedCountry?.alpha2}
                      onCountryChange={setCountryData}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Disability Description */}
            <FormField
              control={form.control}
              name="disabilityDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disability Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe any disability assistance needed"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Biography */}
            <FormField
              control={form.control}
              name="biography"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tell us about yourself..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Personal Website, Twitter, Facebook */}
            <div className="grid sm:grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="personalWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://yourwebsite.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://twitter.com/yourhandle"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://facebook.com/yourprofile"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Instagram, YouTube, GitHub */}
            <div className="grid sm:grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://instagram.com/yourhandle"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="youtube"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://youtube.com/yourchannel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://github.com/yourusername"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* TikTok, Language, Qualification */}
            <div className="grid sm:grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="tiktok"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TikTok</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://tiktok.com/@yourhandle"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="languagePreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Preferred language" />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="highestQualification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qualification</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select qualification" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
                        <SelectItem value="BACHELORS">Bachelors</SelectItem>
                        <SelectItem value="MASTERS">Masters</SelectItem>
                        <SelectItem value="DOCTORATE">Doctorate</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* LinkedIn */}
            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://linkedin.com/in/you"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
