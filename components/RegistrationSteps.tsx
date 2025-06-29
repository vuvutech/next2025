import RegisterLogin from "./LoginForRegistration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import React from "react";
import { SignUpForRegistration } from "./SignupForRegistration";
import { SignUpComponent } from "./sign-up";
import LoginForRegistration from "./LoginForRegistration";
import SignInComponent from "./sign-in";

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
