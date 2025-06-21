import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="block p-2">
      <Toaster />

      <div>{children}</div>
    </div>
  );
}
