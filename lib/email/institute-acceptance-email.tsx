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

interface InstituteAcceptanceEmailProps {
	previewText?: string;
	name?: string;
	instituteName: string; // e.g., "Institute of Economic Affairs"
	instituteShortName: string; // e.g., "IEA"
	startDate?: string;
	endDate?: string;
	startTime?: string;
	endTime?: string;
	theme?: string;
	zoomLink: string;
	zoomMeetingId: string;
	zoomPasscode: string;
	instituteEmail?: string; // Dynamic office email (fallback to default if omitted)
}

export const InstituteAcceptanceEmail = ({
	previewText,
	name = "Participant",
	instituteName,
	instituteShortName,
	startDate,
	endDate,
	startTime,
	endTime,
	theme,
	zoomLink,
	zoomMeetingId,
	zoomPasscode,
	instituteEmail,
}: InstituteAcceptanceEmailProps) => {
	const currentYear = new Date().getFullYear();

	// Fallback defaults if optional props aren't provided
	const resolvedPreviewText =
		previewText ||
		`Your Acceptance & Zoom Access Pass: ${instituteShortName} ${currentYear}`;
	const resolvedTheme = theme || "Global Transformation and Development";
	const resolvedInstituteEmail =
		instituteEmail || `${instituteShortName.toLowerCase()}office@costrad.org`;

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
				<Preview>{resolvedPreviewText}</Preview>
				<Body className="mx-auto my-auto bg-[#fdfdfd] px-2 font-sans text-[#333333]">
					<Container className="mx-auto my-[40px] max-w-[700px] bg-white p-[20px] border border-solid border-[#eaeaea] rounded">
						<Text className="text-[16px] font-bold mt-0">Shalom {name}!</Text>

						<Text className="text-[14px] leading-[24px]">
							Welcome to the Future of Transformation! Your payment has been
							successfully received, and we are pleased to formally issue your
							acceptance pass for the{" "}
							<strong>
								{currentYear} Edition of the {instituteName} (
								{instituteShortName})
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
								<strong>Theme:</strong> {resolvedTheme}
							</Text>
							<Text className="m-0 mb-[8px] text-[14px] leading-[24px]">
								<strong>Dates:</strong> {startDate} – {endDate}
							</Text>
							<Text className="m-0 mb-[8px] text-[14px] leading-[24px]">
								<strong>Daily Schedule:</strong> {startTime || "9:00 AM"} –{" "}
								{endTime || "4:00 PM"} GMT (UTC+0 / Accra Time)
							</Text>
							<Text className="m-0 text-[14px] leading-[24px]">
								<strong>Location:</strong> Dedicated Virtual Meeting Platform
								(Zoom)
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
								{instituteName} ({instituteShortName}) ZOOM MEETING LINK
							</Text>

							<div className="text-center my-[15px]">
								<Link
									href={zoomLink}
									className="bg-[#59168b] text-white px-[20px] py-[10px] rounded font-bold text-[14px] inline-block no-underline"
								>
									Click Here to Join Zoom Meeting
								</Link>
							</div>

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
										{zoomMeetingId}
									</Text>
								</div>

								{/* Passcode Block */}
								<div className="bg-white border border-solid border-[#e2e8f0] rounded-md p-[16px] text-center">
									<Text className="m-0 text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mb-[4px]">
										Passcode
									</Text>
									<Text className="m-0 font-mono text-[16px] font-bold text-[#59168b] select-all">
										{zoomPasscode}
									</Text>
								</div>
							</div>
						</Section>

						<Text className="mt-[25px] text-[14px] leading-[24px]">
							At {instituteShortName} {currentYear}, you will gain insightful
							discussions, powerful networking opportunities, transformational
							learning experiences, and fresh ideas that inspire action and
							impact.
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
							registration, please don't hesitate to contact us. Our support
							team ({" "}
							<a
								className="text-primary"
								href={`mailto:${resolvedInstituteEmail}`}
							>
								{resolvedInstituteEmail}
							</a>{" "}
							,{" "}
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

InstituteAcceptanceEmail.PreviewProps = {
	name: "Participant",
	instituteName: "Institute of Economic Affairs",
	instituteShortName: "IEA",
	zoomLink: "https://zoom.us",
	zoomMeetingId: "814 3125 6100",
	zoomPasscode: "IEA</>26",
} as InstituteAcceptanceEmailProps;

export default InstituteAcceptanceEmail;
