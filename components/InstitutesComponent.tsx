'use client';

import { useState, useEffect } from 'react';
import InstituteCardWithImage from '@/components/ui/InstituteCardWithImage';
import { getInstitutes } from '@/app/actions/functions';

type Institute = {
  id: string;
  name: string;
  slug: string;
  overview: string;
  banner?: string;
  acronym: string;
  editions: {
    title?: string;
    startDate?: string;
    endDate?: string;
  }[];
};

interface InstitutesComponentProps {
  initialInstitutes: Institute[] | null;
}

export default function InstitutesComponent({ initialInstitutes }: InstitutesComponentProps) {
  const [institutes, setInstitutes] = useState<Institute[] | null>(initialInstitutes);
  const [loading, setLoading] = useState(false); // Set to false since initial data is provided
  const [error, setError] = useState<string | null>(null);

  // Optional: Fetch data client-side for real-time updates
  useEffect(() => {
    // Only fetch if you want to refresh data client-side (e.g., for polling)
    const fetchInstitutes = async () => {
      try {
        setLoading(true);
        const data = await getInstitutes();
        setInstitutes(data);
      } catch (err) {
        setError('Failed to fetch institutes');
      } finally {
        setLoading(false);
      }
    };
    // Uncomment to enable client-side refresh
    // fetchInstitutes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!institutes || institutes.length === 0) {
    return <div>No institutes found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-8 md:p-2">
      {institutes.map((institute) => {
        const edition = institute.editions[0];
        return (
          <InstituteCardWithImage
            key={institute.id}
            id={institute.id}
            name={institute.name}
            slug={institute.slug}
            overview={institute.overview}
            banner={institute.banner ?? '/images/default-banner.jpg'}
            logo={`/images/logos/${institute.acronym}.png`}
            editionTitle={edition?.title || 'No Edition Available'}
            editionDates={
              edition?.startDate && edition?.endDate
                ? `${formatDate(edition.startDate)} – ${formatDate(edition.endDate)}`
                : 'Dates TBD'
            }
          />
        );
      })}
    </div>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}