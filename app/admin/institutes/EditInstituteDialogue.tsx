"use client";

import { useRouter } from "next/navigation";
import { IconPencilCog } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export type InstituteForm = {
  id: string;
  slug: string; // ✅ Make sure this is available
  overview: string;
  featured: boolean;
  approved: boolean;
};

interface EditInstituteSheetProps {
  institute: InstituteForm | null;
}

export default function EditInstituteSheet({
  institute,
}: EditInstituteSheetProps) {
  const router = useRouter();

  const handleClick = () => {
    if (institute?.slug) {
      router.push(`/admin/institutes/${institute.slug}/edit`);
    }
  };

  return (
    <Button className="cursor-pointer" variant="ghost" size="icon" onClick={handleClick} disabled={!institute?.slug}>
      <IconPencilCog size={20} />
    </Button>
  );
}
