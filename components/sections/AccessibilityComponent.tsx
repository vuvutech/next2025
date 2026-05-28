"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { Separator } from "@/components/ui/separator";

export default function AccessibilityComponent() {
	return (
		<div className="space-y-8">
			<FadeIn as="section">
				<h1 className="text-3xl sm:text-6xl">Accessibility</h1>
				<p className="mt-2 text-foreground">
					We are committed to making our programs, facilities, and digital
					platforms accessible to all participants, regardless of ability or
					device.
				</p>
			</FadeIn>

			<Separator />

			{/* Digital Accessibility */}
			<FadeIn as="section" className="space-y-4">
				<h2 className="text-2xl font-semibold">Digital Accessibility</h2>
				<p className="text-muted-foreground">
					Our website has been designed with accessibility and usability in
					mind:
				</p>
				<ul className="list-disc list-inside space-y-1 text-muted-foreground">
					<li>🔳 Fully responsive across mobile, tablet, and desktop</li>
					<li>🌙 Dark mode support for visual comfort</li>
					<li>⌨️ Keyboard navigation for all interactive components</li>
					<li>🪟 Screen-reader friendly labels and ARIA attributes</li>
				</ul>
			</FadeIn>

			<Separator />

			{/* Physical Accessibility */}
			<FadeIn as="section" className="space-y-4">
				<h2 className="text-2xl font-semibold">In-Person Accessibility</h2>
				<p className="text-muted-foreground">
					Our physical venue is fully accessible and designed to accommodate
					diverse needs:
				</p>
				<ul className="list-disc list-inside space-y-1 text-muted-foreground">
					<li>🦽 Wheelchair-accessible entrances and restrooms</li>
					<li>🅿️ Reserved accessible parking spaces</li>
					<li>
						🔊 AV systems with microphone support for large group settings
					</li>
					<li>🚪 Elevator access where applicable</li>
				</ul>
			</FadeIn>

			<Separator />

			{/* Ongoing Commitment */}
			<FadeIn as="section" className="space-y-4">
				<h2 className="text-2xl font-semibold">Our Commitment</h2>
				<p className="text-muted-foreground">
					Accessibility is an ongoing priority. We regularly audit and update
					our services to ensure equity in access to content, tools, and spaces.
				</p>
				<p className="text-muted-foreground">
					If you experience any difficulty or have suggestions to improve
					accessibility, we welcome your feedback.
				</p>
				<p>
					Email:{" "}
					<a
						href="mailto:accessibility@costrad.org"
						className="text-primary underline"
					>
						accessibility@costrad.org
					</a>
				</p>
			</FadeIn>

			<Separator />

			{/* Legal Compliance */}
			<FadeIn as="section" className="space-y-4">
				<h2 className="text-2xl font-semibold">Standards & Guidelines</h2>
				<p className="text-muted-foreground">
					We strive to comply with relevant standards, including:
				</p>
				<ul className="list-disc list-inside space-y-1 text-muted-foreground">
					<li>📘 WCAG 2.1 AA (Web Content Accessibility Guidelines)</li>
					<li>🧑‍⚖️ Ghana’s Disability Act 2006 (Act 715)</li>
					<li>
						🌍 International principles for inclusive education and civic
						engagement
					</li>
				</ul>
			</FadeIn>
		</div>
	);
}
