import React from "react";
import SignInComponent from "@/components/forms/sign-in";
import { SignUpComponent } from "@/components/forms/sign-up";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RegistrationSteps() {
	return (
		<div className="container flex justify-center">
			<Tabs defaultValue="signin" className="rounded-lg w-full max-w-md">
				<TabsList className="w-full">
					<TabsTrigger id="signin" value="signin">
						Login to your account
					</TabsTrigger>
					<TabsTrigger id="signup" value="signup">
						Create Account
					</TabsTrigger>
				</TabsList>

				<TabsContent id="signin" value="signin">
					<SignInComponent
						displayFooterText={false}
						costradCallbackUrl={"/apply"}
					/>
				</TabsContent>
				<TabsContent id="signup" value="signup">
					<SignUpComponent
						displayFooterText={false}
						costradCallbackUrl={"/apply"}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
