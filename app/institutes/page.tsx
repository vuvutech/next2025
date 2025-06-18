// app/institute/page.tsx
import InstitutesComponent from '@/components/InstitutesComponent';
import { getInstitutes } from '@/app/actions/functions';

export const dynamic = 'force-dynamic';

export default async function InstitutesPage() {
  // Fetch institutes data server-side
  const institutes = await getInstitutes();

  return (
    <div className="py-4 sm:py-8">
      <InstitutesComponent initialInstitutes={institutes} />
    </div>
  );
}