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

interface INSTITUTEWelcomeEmailProps {
  previewText?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  price?: number;
  priceViaZoom?: number;
  theme?: string;
}

export const INSTITUTEWelcomeEmail = ({
  previewText = `Welcome to the ${new Date().getFullYear()} Institute Edition`,
  name = "Participant",
  startDate,
  endDate,
  theme = "Institute Edition",
}: INSTITUTEWelcomeEmailProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <Tailwind>
      <Html>
        <Head />

        <Preview>{previewText}</Preview>
        <Body className="mx-auto my-auto bg-[#fdfdfd] px-2 font-sans text-[#333333]">
          <Container className="mx-auto my-[40px] max-w-[700px] bg-white p-[20px] border border-solid border-[#eaeaea] rounded">
            <Text className="text-[16px] font-bold mt-0">Shalom {name}!</Text>

            <Text className="text-[14px] leading-[24px]">
              Welcome to the {currentYear} Edition of the institute, brought to
              you by the College of Sustainable Transformation and Development
              (COSTrAD) and its Presidency.
            </Text>

            <Text className="text-[14px] leading-[24px]">
              Thank you for taking the important step to register for this
              year's institute.
            </Text>

            {/* Highlights Box */}
            <Section className="bg-[#f9f9f9] border-l-4 border-solid border-[#0056b3] p-[15px] my-[20px]">
              <Text className="m-0 mb-[8px] text-[14px] leading-[24px]">
                <strong>Theme:</strong> {theme}
              </Text>
              <Text className="m-0 mb-[8px] text-[14px] leading-[24px]">
                We are delighted to have you join us and look forward to an
                engaging, insightful, and impactful experience.
              </Text>
              <Text className="m-0 text-[14px] leading-[24px]">
                <strong>Dates:</strong> The institute is scheduled for{" "}
                {startDate || "TBD"} to {endDate || "TBD"}.
              </Text>
            </Section>

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
              future-focused insights that the {currentYear} institute will
              inspire.
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
              <a className="text-primary" href="mailto:enquiries@costrad.org">
                enquiries@costrad.org
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
              — Office Hours: Mon–Fri, 9AM–4PM GMT) is always available to
              assist you.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

INSTITUTEWelcomeEmail.PreviewProps = {
  previewText: `Welcome to the ${new Date().getFullYear()} Institute Edition`,
} as INSTITUTEWelcomeEmailProps;

export default INSTITUTEWelcomeEmail;
