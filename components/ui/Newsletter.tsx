"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucideMailCheck } from "lucide-react";

type NewsletterFormInputs = {
	firstname: string;
	lastname: string;
	email: string;
};

const Newsletter = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<NewsletterFormInputs>();

	const onSubmit: SubmitHandler<NewsletterFormInputs> = async (data) => {
		const formData = {
			name: `${data.firstname} ${data.lastname}`,
			email: data.email,
		};

		await toast.promise(
			(async () => {
				const response = await fetch("/api/talk-to-us", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});

				if (!response.ok) {
					throw new Error("Failed to send message");
				}

				const result = await response.json();
				reset();
				return result;
			})(),
			{
				loading: "Subscribing for future updates...",
				success: "Subscribed successfully!",
				error: "Failed to subscribe",
			}
		);
	};

	return (
		<section className='bg-secondary w-full'>
			<div className='flex flex-col md:flex-row justify-between items-center gap-8 min-h-[500px] py-12 px-4 md:py-16 md:px-8'>
				<div className='flex-1 space-y-4'>
					<p className='font-display text-4xl font-medium tracking-tight sm:text-5xl'>
						Stay up to date
					</p>
					<p className='text-lg text-muted-foreground max-w-xl'>
						Stay informed about all of our exciting events and never
						miss a moment by being among the first to receive
						important updates directly from us.
					</p>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full md:max-w-md space-y-4'
				>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<Input
							placeholder='First name'
							{...register("firstname", { required: true })}
							className={
								errors.firstname ? "border-destructive" : ""
							}
						/>
						<Input
							placeholder='Last name'
							{...register("lastname", { required: true })}
							className={
								errors.lastname ? "border-destructive" : ""
							}
						/>
					</div>
					<Input
						type='email'
						placeholder='Email address'
						{...register("email", { required: true })}
						className={errors.email ? "border-destructive" : ""}
					/>
					<Button
						type='submit'
						className='w-full gap-2 bg-green-950 text-white hover:bg-green-900 uppercase'
					>
						Sign up for Updates
						<LucideMailCheck className='h-4 w-4' />
					</Button>
				</form>
			</div>
		</section>
	);
};

export default Newsletter;
