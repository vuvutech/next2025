import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface FIRSTAcceptanceEmailProps {
  previewText?: string;
  name?: string;
}

export const FIRSTAcceptanceEmail = ({
  previewText = `Your Acceptance & Zoom Access Pass: FIRST ${new Date().getFullYear()}`,
  name = "Participant",
}: FIRSTAcceptanceEmailProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <Tailwind>
      <Html>
        <Head>
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
              COSTrAD & INSTITUTES is inviting you to a scheduled Zoom meeting.
            </Text>

            <Text className="text-[14px] leading-[24px]">
              Welcome! Your payment has been successfully received, and we are
              pleased to formally issue your acceptance pass for the{" "}
              <strong>
                FUTURISTIC INSTITUTE OF REVOLUTIONARY SCIENCE & TECHNOLOGY
                (FIRST) {currentYear}
              </strong>
              .
            </Text>

            <Text className="text-[14px] leading-[24px]">
              This program is proudly brought to you by the{" "}
              <strong>
                College of Sustainable Transformation and Development (COSTrAD)
              </strong>{" "}
              and its Presidency. Get ready to connect with visionary leaders,
              innovative thinkers, policy influencers, entrepreneurs, and
              change-makers who are shaping the global future.
            </Text>

            {/* Event Highlights Box */}
            <Section className="bg-[#f9f9f9] border-l-4 border-solid border-[#59168b] p-[15px] my-[20px]">
              <Text className="m-0 mb-[8px] text-[14px] leading-[24px]">
                <strong>
                  FUTURISTIC INSTITUTE OF REVOLUTIONARY SCIENCE & TECHNOLOGY
                  (FIRST) {currentYear}
                </strong>
              </Text>
              <Text className="m-0 mb-[8px] text-[14px] leading-[24px]">
                <strong>Time:</strong> Sep 14, 2026 16:00 Universal Time UTC
                Every day, until Sep 19, 2026, 6 occurrence(s)
              </Text>
              <Text className="m-0 mb-[8px] text-[14px] leading-[24px]">
                <strong>Daily Schedule:</strong> 4:00 PM – 7:00 PM GMT (UTC+0 /
                Accra Time)
              </Text>
              <Text className="m-0 mb-[8px] text-[14px] leading-[24px]">
                <strong>Location:</strong> Dedicated Virtual Meeting Platform
                (Zoom)
              </Text>
              <Text className="m-0 mb-[4px] text-[14px] leading-[24px]">
                <strong>Theme:</strong> RESTORING SCIENCE AND TECHNOLOGY TO THE
                ORIGINAL FOR THE FUTURE
              </Text>
            </Section>

            {/* Key Topics */}
            <Section className="bg-[#f9f9f9] border border-solid border-[#eaeaea] rounded p-[15px] my-[20px]">
              <Text className="m-0 mb-[8px] text-[14px] font-bold text-[#59168b]">
                Key Topics:
              </Text>
              <Text className="m-0 mb-[4px] text-[13px] leading-[20px]">
                • Hippocrates&apos; Original Medical Treatment with Lessons for
                the Future
              </Text>
              <Text className="m-0 mb-[4px] text-[13px] leading-[20px]">
                • Health Hacking: Innovation and Human Wellness
              </Text>
              <Text className="m-0 mb-[4px] text-[13px] leading-[20px]">
                • Reclaiming the Healing in Food
              </Text>
              <Text className="m-0 mb-[4px] text-[13px] leading-[20px]">
                • Science and God: Faith and Scientific Inquiry
              </Text>
              <Text className="m-0 mb-[4px] text-[13px] leading-[20px]">
                • Back to Eden: Transforming Science and Technology as a
                Sustainable Tools for the Future
              </Text>
              <Text className="m-0 text-[13px] leading-[20px]">
                • Children and Overworked Brain. ETC.
              </Text>
            </Section>

            {/* Crucial Security Info */}
            <div className="flex items-center gap-[8px] mt-[25px]">
              <ExclamationTriangleIcon className="w-[18px] h-[18px] text-[#c0392b] shrink-0" />
              <Text className="m-0 text-[14px] font-bold text-[#c0392b] uppercase tracking-wide">
                Strict Entry Requirement:
              </Text>
            </div>
            <Text className="text-[14px] leading-[22px] mt-[4px] mb-[20px] bg-[#fdf2f2] p-[12px] border border-solid border-[#f5c6cb] rounded text-[#a94442]">
              To be granted access from the waiting room, you{" "}
              <strong>MUST</strong> join the meeting with your display name
              formatted exactly as:{" "}
              <strong>[(First Name + Last Name) with Country]</strong>.<br />
              <span className="italic font-bold">
                Example: Naa Amartey Ghana
              </span>
            </Text>

            {/* --- ZOOM ACCESS PASS CREDENTIALS --- */}
            <Section className="bg-[#f1f7fe] border border-solid border-[#b3d7ff] rounded p-[20px] my-[25px]">
              <Text className="m-0 mb-[12px] text-[16px] font-bold text-[#59168b] text-center uppercase">
                FUTURISTIC INSTITUTE OF REVOLUTIONARY SCIENCE & TECHNOLOGY
                (FIRST) ZOOM MEETING LINK
              </Text>

              <div className="text-center my-[15px]">
                <Link
                  href="https://us02web.zoom.us/j/86084914373?pwd=JMtQ3za9TBR4bASinbsUaIdlgdv0dr1"
                  className="bg-[#59168b] text-white px-[20px] py-[10px] rounded font-bold text-[14px] inline-block no-underline"
                >
                  Click Here to Join Zoom Meeting
                </Link>
              </div>

              <Text className="m-0 mb-[8px] text-[13px] leading-[20px] text-center break-all">
                https://us02web.zoom.us/j/86084914373?pwd=JMtQ3za9TBR4bASinbsUaIdlgdv0dr1
              </Text>

              <Text className="m-0 mb-[16px] text-[13px] font-bold tracking-wider text-[#64748b] uppercase text-center">
                Virtual Access Credentials
              </Text>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] my-[25px]">
                {/* Meeting ID Block */}
                <div className="bg-white border border-solid border-[#e2e8f0] rounded-md p-[16px] text-center">
                  <Text className="m-0 text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mb-[4px]">
                    Meeting ID
                  </Text>
                  <Text className="m-0 font-mono text-[16px] font-semibold text-[#1e293b] tracking-wide select-all">
                    815 7578 7127
                  </Text>
                </div>

                {/* Passcode Block */}
                <div className="bg-white border border-solid border-[#e2e8f0] rounded-md p-[16px] text-center">
                  <Text className="m-0 text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mb-[4px]">
                    Passcode
                  </Text>
                  <Text className="m-0 font-mono text-[16px] font-bold text-[#59168b] select-all">
                    fiRst@26
                  </Text>
                </div>
              </div>
            </Section>

            <Text className="mt-[25px] text-[14px] leading-[24px]">
              At FIRST {currentYear}, you will gain insightful discussions,
              powerful networking opportunities, transformational learning
              experiences, and fresh ideas that inspire action and impact.
            </Text>

            <Text className="mt-[25px] text-[14px] leading-[24px]">
              We look forward to a highly impactful engagement.
            </Text>

            <Text className="mt-[30px] text-[14px] leading-[18px]">
              Warm regards,
              <br />
              <strong>COSTrAD Administration Team</strong>
            </Text>

            <Text className="text-xs text-gray-600 mt-6">
              If you have any questions or need further clarification about your
              registration, please don&apos;t hesitate to contact us. Our
              support team ({" "}
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

FIRSTAcceptanceEmail.PreviewProps = {
  name: "Participant",
} as FIRSTAcceptanceEmailProps;

export default FIRSTAcceptanceEmail;
