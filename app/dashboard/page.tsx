import { auth } from "@/lib/auth";
import UserCard from "./user-card";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { PreferencesSection } from "@/components/dashboard/preference-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestimonialCard from "./TestimonialCard";
import RegistrationSection from "@/components/dashboard/registration-section";
import EditableProfileForm from "@/components/EditableProfileForm";

export const dynamic = "force-dynamic";


export default async function DashboardPage() {
  const [session, activeSessions, deviceSessions, organization] =
    await Promise.all([
      auth.api.getSession({
        headers: await headers(),
      }),
      auth.api.listSessions({
        headers: await headers(),
      }),
      auth.api.listDeviceSessions({
        headers: await headers(),
      }),
      auth.api.getFullOrganization({
        headers: await headers(),
      }),
    ]).catch((e: any) => {
      throw redirect("/auth/sign-in");
    });

  return (
    <div className=" mx-auto p-4 m-4 w-full">
      <Tabs defaultValue="account" className="rounded-lg w-full">
        <TabsList>
          <TabsTrigger id="account" value="account">
            Account
          </TabsTrigger>
          <TabsTrigger id="profile" value="profile">
            My Profile
          </TabsTrigger>
          <TabsTrigger id="preferences" value="preferences">
            Preferences
          </TabsTrigger>
          {/* <TabsTrigger id="billing" value="billing">
            Billing & Invoices
          </TabsTrigger> */}
          <TabsTrigger id="testimonials" value="testimonials">
            My Testimonials
          </TabsTrigger>
          <TabsTrigger id="registration" value="registration">
            My Institutes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <UserCard
            session={JSON.parse(JSON.stringify(session))}
            activeSessions={JSON.parse(JSON.stringify(activeSessions))}
          />
        </TabsContent>
        <TabsContent value="profile">
          {/* <ProfileSection session={session!} /> */}
          <EditableProfileForm />
          {/* <ProfileCreation /> */}
        </TabsContent>
        <TabsContent value="preferences">
          <PreferencesSection />
        </TabsContent>
        {/* <TabsContent id="billing" value="billing">
          <BillingSection />
        </TabsContent> */}
        <TabsContent id="testimonials" value="testimonials">
          <TestimonialCard session={null} />
        </TabsContent>
        <TabsContent value="registration">
          <RegistrationSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
