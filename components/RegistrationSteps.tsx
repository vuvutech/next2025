import { LoginForm } from "./login-form";
import RegisterLogin from "./RegisterLogin";
import MainLogo from "./ui/MainLogo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function RegistrationSteps() {
  return (
    <div className=" mx-auto p-4 m-4">
          <Tabs defaultValue="signin" className="rounded-lg min-w-md">
            <TabsList className="w-full">
              <TabsTrigger id="signin" value="signin">
                Login to your account
              </TabsTrigger>
              <TabsTrigger id="signup" value="signup">
                Create Account
              </TabsTrigger>
            </TabsList>

            <TabsContent id="signin" value="signin">
              <RegisterLogin  />
            </TabsContent>
            <TabsContent id="signup" value="signup">
              <RegisterLogin costradCallbackUrl={"/apply"} />
            </TabsContent>
          </Tabs>
        </div>
  );
}
