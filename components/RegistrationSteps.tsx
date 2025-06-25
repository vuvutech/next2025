import RegisterLogin from "./LoginForRegistration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import React from "react";
import { SignUpForRegistration } from "./SignupForRegistration";

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
          <RegisterLogin costradCallbackUrl={"/apply"} />
        </TabsContent>
        <TabsContent id="signup" value="signup">
          <SignUpForRegistration costradCallbackUrl={"/apply"} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
