import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface IEARegistrationEmailProps {
  previewText?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  price?: number;
  priceViaZoom?: number;
  theme?: string;
}

export const IEARegistrationEmail = ({
  previewText = `Welcome to the ${new Date().getFullYear()} Institute of Economic Affairs (IEA)`,
  name = "Participant",
  startDate,
  endDate,
  startTime,
  endTime,
  theme = "Back to the Future of Economy",
}: IEARegistrationEmailProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <Tailwind>
      <Html>
        <Head>
          {/* Responsive style override for email clients that process media queries */}
          <style>{`
            @media screen and (max-width: 700px) {
              .desktop-table { display: none !important; }
              .mobile-cards { display: block !important; }
            }
          `}</style>
        </Head>
        <Preview>{previewText}</Preview>
        <Body className="mx-auto my-auto bg-[#fdfdfd] px-2 font-sans text-[#333333]">
          <Container className="mx-auto my-[40px] max-w-[700px] bg-white p-[20px] border border-solid border-[#eaeaea] rounded">
            <Text className="text-[16px] font-bold mt-0">Shalom {name}!</Text>

            <Text className="text-[14px] leading-[24px]">
              Welcome to the {currentYear} Edition of the{" "}
              <strong>Institute of Economic</strong>
              <strong>Affairs (IEA)</strong>, brought to you by the College of
              Sustainable Transformation and Development (COSTrAD) and its
              Presidency.
            </Text>

            <Text className="text-[14px] leading-[24px]">
              Thank you for taking the important step to register for this
              year’s institute.
            </Text>

            {/* Highlights Box */}
            <Section className="bg-[#f9f9f9] border-l-4 border-solid border-[#0056b3] p-[15px] my-[20px]">
              <Text className="m-0 mb-[8px] text-[14px] leading-[24px]">
                <strong>Theme:</strong> {theme}
              </Text>
              <Text className="m-0 mb-[8px] text-[14px] leading-[24px]">
                We are delighted to have you join us virtually for IEA{" "}
                {currentYear} and look forward to an engaging, insightful, and
                impactful experience.
              </Text>
              <Text className="m-0 mb-[8px] text-[14px] leading-[24px]">
                <strong>Dates:</strong>{" "}
                {startDate
                  ? `The institute runs from ${startDate}`
                  : "Date TBD"}
                {endDate ? ` to ${endDate}` : ""}.
              </Text>
              <Text className="m-0 mb-[8px] text-[14px] leading-[24px]">
                <strong>Daily Schedule:</strong> {startTime || "4:00 PM"} –{" "}
                {endTime || "7:00 PM"} GMT (UTC+0 / Accra Time)
              </Text>
            </Section>

            <Text className="mt-[30px] text-[14px] leading-[24px]">
              To accommodate the diverse needs of participants, the following
              registration packages are available:
            </Text>

            {/* --- DESKTOP TABLE VIEW --- */}
            <table className=" w-full border-collapse my-[20px] text-[14px] ">
              <thead>
                <tr className="bg-[#f2f2f2] border-b-2 border-solid border-[#dddddd] w-full">
                  <th className="p-[10px] text-left font-bold">Package</th>
                  <th className="p-[10px] text-left w-[100px] font-bold">
                    Investment
                  </th>
                  <th className="p-[10px] text-left font-bold">Details</th>
                </tr>
              </thead>
              <tbody className="w-full">
                <tr className="border-b border-solid border-[#dddddd] w-full">
                  <td className="p-[10px]">
                    <strong>Alumni Package</strong>
                  </td>
                  <td className="p-[10px]">
                    <strong>$75</strong>
                  </td>
                  <td className="p-[10px] text-[#666666]">
                    (For attendees of previous institutes under COSTrAD)
                  </td>
                </tr>
                <tr className="border-b border-solid border-[#dddddd] w-full">
                  <td className="p-[10px]">
                    <strong>Partners Package</strong>
                  </td>
                  <td className="p-[10px]">
                    <strong>$80</strong>
                  </td>
                  <td className="p-[10px] text-[#666666]">
                    (For participants from TGAW, GAPNET, and WWW)
                  </td>
                </tr>
                <tr className="border-b border-solid border-[#dddddd] w-full">
                  <td className="p-[10px]">
                    <strong>Early Bird Registration</strong>
                  </td>
                  <td className="p-[10px]">
                    <strong>$99</strong>
                  </td>
                  <td className="p-[10px] text-[#666666]">
                    (Applicable to registrations completed on or before May 30,{" "}
                    {currentYear})
                  </td>
                </tr>
                <tr className="border-b border-solid border-[#dddddd] w-full">
                  <td className="p-[10px]">
                    <strong>Standard Registration</strong>
                  </td>
                  <td className="p-[10px]">
                    <strong>$149</strong>
                  </td>
                  <td className="p-[10px] text-[#666666]">
                    (Applicable after May 30, {currentYear})
                  </td>
                </tr>
                <tr className="border-b border-solid border-[#dddddd] w-full">
                  <td className="p-[10px]">
                    <strong>One-Day Promo Pass</strong>
                  </td>
                  <td className="p-[10px]">
                    <strong>$70</strong>
                  </td>
                  <td className="p-[10px]"></td>
                </tr>
                <tr className="border-b border-solid border-[#dddddd] w-full">
                  <td className="p-[10px]">
                    <strong>Scholarship Package</strong>
                  </td>
                  <td className="p-[10px]">
                    <strong>Complimentary</strong>
                  </td>
                  <td className="p-[10px]"></td>
                </tr>
                <tr className="border-b border-solid border-[#dddddd] w-full">
                  <td className="p-[10px]">
                    <strong>Special Youth Package</strong>
                  </td>
                  <td className="p-[10px]">
                    <strong>$15</strong>
                  </td>
                  <td className="p-[10px] text-[#666666]">
                    (For participants aged 12–30 years)
                  </td>
                </tr>
              </tbody>
            </table>

            <Text className="mt-[30px] text-[14px] leading-[24px]">
              {/* Kindly complete your registration by making payment using the
              details provided below: */}
            </Text>

            {/* Dynamic Payment Details or Pius Highlight Placeholder */}
            {startDate || endDate ? (
              <Section className="bg-[#f9f9f9] border border-solid border-[#eaeaea] rounded p-[15px] my-[20px]">
                <Text className="m-0 mb-[10px] text-[16px] font-bold text-[#0056b3]">
                  Your Payment & Schedule Details:
                </Text>
                <table className="w-full text-[14px] border-collapse">
                  <tbody className="w-full">
                    {startDate && (
                      <tr className="border-b border-solid border-[#eaeaea] w-full">
                        <td className="py-[6px] pr-[10px] font-bold w-[160px]">
                          Start Date:
                        </td>
                        <td className="py-[6px]">{startDate}</td>
                      </tr>
                    )}
                    {endDate && (
                      <tr className="border-b border-solid border-[#eaeaea] w-full">
                        <td className="py-[6px] pr-[10px] font-bold">
                          End Date:
                        </td>
                        <td className="py-[6px]">{endDate}</td>
                      </tr>
                    )}
                    {startTime && endTime && (
                      <tr className="w-full">
                        <td className="py-[6px] pr-[10px] font-bold">
                          Daily Schedule:
                        </td>
                        <td className="py-[6px]">
                          {startTime} – {endTime} GMT (UTC+0 / Accra Time)
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </Section>
            ) : (
              <Section className="hidden bg-[#fffbcc] border border-dashed border-[#e6db55] p-[15px] my-[20px] text-center italic text-[14px]"></Section>
            )}

            <Text className="mt-[30px] text-[14px] leading-[24px]">
              <strong>
                Payment details would be communicated to you shortly.
              </strong>
            </Text>

            <Text className="mt-[30px] text-[14px] leading-[24px]">
              Thank you once again for registering. We look forward to the
              meaningful engagements, transformative learning, and
              future-focused insights that the {currentYear} IEA will inspire.
            </Text>

            <Text className="mt-[30px] text-[14px] leading-[18px]">
              Kind regards,
              <br />
              <strong>COSTrAD Team</strong>
            </Text>

            <Text className="text-xs text-gray-600 mt-6">
              If you have any questions or need further clarification about your
              registration, please don't hesitate to contact us. Our support
              team ({" "}
              <a className="text-primary" href="mailto:ieaoffice@costrad.org">
                ieaoffice@costrad.org
              </a>{" "}
              ,
              <a
                className="text-primary"
                href="mailto:correspondence@costrad.org"
              >
                correspondence@costrad.org
              </a>{" "}
              | Phone:{" "}
              <a className="text-primary" href="tel:+233200201334">
                +233 20 020 1334
              </a>{" "}
              — Office Hours: Mon–Fri, 9AM–4PM GMT (UTC+0 / Accra Time)) is
              always available to assist you.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

IEARegistrationEmail.PreviewProps = {
  previewText: `Welcome to the ${new Date().getFullYear()} Institute of Economic Affairs (IEA)`,
} as IEARegistrationEmailProps;

export default IEARegistrationEmail;
