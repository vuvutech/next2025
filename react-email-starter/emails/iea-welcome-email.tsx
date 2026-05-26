import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface IEARegistrationEmailProps {
  previewText?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  price?: number;
  priceViaZoom?: number;
  theme?: string;
}

export const IEARegistrationEmail = ({
  previewText = `Welcome to the ${new Date().getFullYear()} Institute of Economic Affairs (IEA)`,
  name = "Participant",
  startDate,
  endDate,
  price,
  priceViaZoom,
  theme = "Back to the Future of Economy",
}: IEARegistrationEmailProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head>
        {/* Responsive style override for email clients that process media queries */}
        <style>{`
          @media screen and (max-width: 600px) {
            .desktop-table { display: none !important; }
            .mobile-cards { display: block !important; }
          }
        `}</style>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-[#fdfdfd] px-2 font-sans text-[#333333]">
          <Container className="mx-auto my-[40px] max-w-[600px] bg-white p-[20px] border border-solid border-[#eaeaea] rounded">
            
            <Text className="text-[16px] font-bold mt-0">Shalom {name}!</Text>
            
            <Text className="text-[14px] leading-[24px]">
              The College of Sustainable Development (COSTrAD) and its Presidency warmly welcome you to the {currentYear} Institute of Economic Affairs (IEA).
            </Text>
            
            <Text className="text-[14px] leading-[24px]">
              Thank you for taking the important step to register for this year’s institute.
            </Text>
            
            {/* Highlights Box */}
            <Section className="bg-[#f9f9f9] border-l-4 border-solid border-[#0056b3] p-[15px] my-[20px]">
              <Text className="m-0 mb-[8px] text-[14px] leading-[24px]">
                <strong>Theme:</strong> {theme}
              </Text>
              <Text className="m-0 mb-[8px] text-[14px] leading-[24px]">
                We are delighted to have you join us virtually for IEA {currentYear} and look forward to an engaging, insightful, and impactful experience.
              </Text>
              <Text className="m-0 text-[14px] leading-[24px]">
                <strong>Dates:</strong> The virtual institute is scheduled to hold from June 8–13, {currentYear}, via a dedicated online platform.
              </Text>
            </Section>

            <Text className="mt-[30px] text-[14px] leading-[24px]">
              To accommodate the diverse needs of participants, the following registration packages are available:
            </Text>

            {/* --- DESKTOP TABLE VIEW --- */}
            <table className="desktop-table w-full border-collapse my-[20px] text-[14px] hidden sm:table">
              <thead>
                <tr className="bg-[#f2f2f2] border-b-2 border-solid border-[#dddddd]">
                  <th className="p-[10px] text-left font-bold">Package</th>
                  <th className="p-[10px] text-left w-[100px] font-bold">Investment</th>
                  <th className="p-[10px] text-left font-bold">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-solid border-[#dddddd]">
                  <td className="p-[10px]"><strong>Alumni Package</strong></td>
                  <td className="p-[10px]"><strong>$75</strong></td>
                  <td className="p-[10px] text-[#666666]">(For attendees of previous institutes under COSTrAD)</td>
                </tr>
                <tr className="border-b border-solid border-[#dddddd]">
                  <td className="p-[10px]"><strong>Partners Package</strong></td>
                  <td className="p-[10px]"><strong>$80</strong></td>
                  <td className="p-[10px] text-[#666666]">(For participants from TGAW, GAPNET, and WWW)</td>
                </tr>
                <tr className="border-b border-solid border-[#dddddd]">
                  <td className="p-[10px]"><strong>Early Bird Registration</strong></td>
                  <td className="p-[10px]"><strong>$99</strong></td>
                  <td className="p-[10px] text-[#666666]">(Applicable to registrations completed on or before May 30, {currentYear})</td>
                </tr>
                <tr className="border-b border-solid border-[#dddddd]">
                  <td className="p-[10px]"><strong>Standard Registration</strong></td>
                  <td className="p-[10px]"><strong>$149</strong></td>
                  <td className="p-[10px] text-[#666666]">(Applicable after May 30, {currentYear})</td>
                </tr>
                <tr className="border-b border-solid border-[#dddddd]">
                  <td className="p-[10px]"><strong>One-Day Promo Pass</strong></td>
                  <td className="p-[10px]"><strong>$70</strong></td>
                  <td className="p-[10px]"></td>
                </tr>
                <tr className="border-b border-solid border-[#dddddd]">
                  <td className="p-[10px]"><strong>Scholarship Package</strong></td>
                  <td className="p-[10px]"><strong>Complimentary</strong></td>
                  <td className="p-[10px]"></td>
                </tr>
                <tr className="border-b border-solid border-[#dddddd]">
                  <td className="p-[10px]"><strong>Special Youth Package</strong></td>
                  <td className="p-[10px]"><strong>$15</strong></td>
                  <td className="p-[10px] text-[#666666]">(For participants aged 12–30 years)</td>
                </tr>
              </tbody>
            </table>

            {/* --- MOBILE CARD STACK VIEW (Shows on mobile layout) --- */}
            <Section className="mobile-cards block sm:hidden my-[20px]">
              {[
                { name: "Alumni Package", price: "$75", desc: "(For attendees of previous institutes under COSTrAD)" },
                { name: "Partners Package", price: "$80", desc: "(For participants from TGAW, GAPNET, and WWW)" },
                { name: "Early Bird Registration", price: "$99", desc: `(Applicable to registrations completed on or before May 30, ${currentYear})` },
                { name: "Standard Registration", price: "$149", desc: `(Applicable after May 30, ${currentYear})` },
                { name: "One-Day Promo Pass", price: "$70", desc: "" },
                { name: "Scholarship Package", price: "Complimentary", desc: "" },
                { name: "Special Youth Package", price: "$15", desc: "(For participants aged 12–30 years)" }
              ].map((pkg, index) => (
                <Section key={index} className="border border-solid border-[#dddddd] rounded p-[12px] mb-[12px] bg-white">
                  <Text className="m-0 text-[14px]"><strong>{pkg.name}</strong></Text>
                  <Text className="m-0 text-[14px] text-[#0056b3] font-bold">{pkg.price}</Text>
                  {pkg.desc && <Text className="m-0 text-[13px] text-[#666666] italic">{pkg.desc}</Text>}
                </Section>
              ))}
            </Section>

            <Text className="mt-[30px] text-[14px] leading-[24px]">
              Kindly complete your registration by making payment using the details provided below:
            </Text>
            
            {/* Dynamic Payment Details or Pius Highlight Placeholder */}
            {(startDate || endDate || price !== undefined || priceViaZoom !== undefined) ? (
              <Section className="bg-[#f9f9f9] border border-solid border-[#eaeaea] rounded p-[15px] my-[20px]">
                <Text className="m-0 mb-[10px] text-[16px] font-bold text-[#0056b3]">
                  Your Payment & Schedule Details:
                </Text>
                <table className="w-full text-[14px] border-collapse">
                  <tbody>
                    {startDate && (
                      <tr className="border-b border-solid border-[#eaeaea]">
                        <td className="py-[6px] pr-[10px] font-bold w-[160px]">Start Date:</td>
                        <td className="py-[6px]">{startDate}</td>
                      </tr>
                    )}
                    {endDate && (
                      <tr className="border-b border-solid border-[#eaeaea]">
                        <td className="py-[6px] pr-[10px] font-bold">End Date:</td>
                        <td className="py-[6px]">{endDate}</td>
                      </tr>
                    )}
                    {price !== undefined && price !== null && (
                      <tr className="border-b border-solid border-[#eaeaea]">
                        <td className="py-[6px] pr-[10px] font-bold">Price (In Person):</td>
                        <td className="py-[6px]">${price}</td>
                      </tr>
                    )}
                    {priceViaZoom !== undefined && priceViaZoom !== null && (
                      <tr className="border-b border-solid border-[#eaeaea]">
                        <td className="py-[6px] pr-[10px] font-bold">Price (Via Zoom):</td>
                        <td className="py-[6px]">${priceViaZoom}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </Section>
            ) : (
              <Section className="bg-[#fffbcc] border border-dashed border-[#e6db55] p-[15px] my-[20px] text-center italic text-[14px]">
                (Pius, kindly insert payment details here.)
              </Section>
            )}

            <Text className="mt-[30px] text-[14px] leading-[24px]">
              Thank you once again for registering. We look forward to the meaningful engagements, transformative learning, and future-focused insights that the {currentYear} IEA will inspire.
            </Text>

            <Text className="mt-[30px] text-[14px] leading-[18px]">
              Kind regards,<br />
              <strong>COSTrAD Team</strong>
            </Text>
            
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

IEARegistrationEmail.PreviewProps = {
  previewText: `Welcome to the ${new Date().getFullYear()} Institute of Economic Affairs (IEA)`,
} as IEARegistrationEmailProps;

export default IEARegistrationEmail;