"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type Country,
	CountryDropdown,
} from "@/components/ui/country-dropdown";
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
import { Label } from "@/components/ui/label";
import {
	type CountryData,
	PhoneInput,
	phoneSchema,
} from "@/components/ui/phone-input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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
	disabilityAssistance: z.boolean().default(false),
	disabilityDescription: z.string().default(""),
	telephone: phoneSchema,
	mobile: phoneSchema.optional().default(""),
	address: z.string().default(""),
	addressLine2: z.string().default(""),
	city: z.string().default(""),
	state: z.string().default(""),
	country: z.string().min(1, "Please select a country"),
	zipcode: z.string().default(""),
	emergencyContactName: z.string().default(""),
	emergencyContactTelephone: phoneSchema.optional().default(""),
	biography: z.string().default(""),
	profession: z.string().default(""),
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
	linkedIn: z.string().url().optional().default(""),
	personalWebsite: z.string().url().optional().default(""),
	twitter: z.string().url().optional().default(""),
	facebook: z.string().url().optional().default(""),
	instagram: z.string().url().optional().default(""),
	youtube: z.string().url().optional().default(""),
	github: z.string().url().optional().default(""),
	tiktok: z.string().url().optional().default(""),
});
type FormValues = z.infer<typeof FormSchema>;

export const ProfileCreation = () => {
	const [countryData, setCountryData] = React.useState<CountryData>();
	const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
		null,
	);
	const [selectedNationality, setSelectedNationality] =
		React.useState<Country | null>(null);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			gender: "MALE" as const,
			dateOfBirth: "",
			nationality: "",
			telephone: "",
			mobile: "",
			address: "",
			addressLine2: "",
			city: "",
			state: "",
			country: "",
			zipcode: "",
			emergencyContactName: "",
			emergencyContactTelephone: "",
			biography: "",
			profession: "",
			maritalStatus: undefined,
			religion: undefined,
			disabilityAssistance: false,
			disabilityDescription: "",
			highestQualification: undefined,
			languagePreference: undefined,
			linkedIn: "",
			personalWebsite: "",
			twitter: "",
			facebook: "",
			instagram: "",
			youtube: "",
			github: "",
			tiktok: "",
		},
	});

	function onSubmit(data: FormValues) {
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
																!field.value && "text-muted-foreground",
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
																selectedDate?.toISOString().split("T")[0] || "",
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
