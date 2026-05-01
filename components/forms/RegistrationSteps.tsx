import RegisterLogin from "@/components/forms/LoginForRegistration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { SignUpForRegistration } from "@/components/forms/SignupForRegistration";
import { SignUpComponent } from "@/components/forms/sign-up";
import LoginForRegistration from "@/components/forms/LoginForRegistration";
import SignInComponent from "@/components/forms/sign-in";

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
          <SignInComponent displayFooterText={false} costradCallbackUrl={"/apply"} />
        </TabsContent>
        <TabsContent id="signup" value="signup">
          <SignUpComponent displayFooterText={false} costradCallbackUrl={"/apply"} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
