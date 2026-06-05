import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAccraDate } from "@/lib/date";

interface Institute {
	name: string;
	logo?: string;
}

interface Edition {
	title: string;
	institute: Institute;
	startDate?: string; // ISO
	endDate?: string; // ISO
	onlineDelivery?: boolean;
	inPersonDelivery?: boolean;
}

interface RegistrationDetailsProps {
	edition: Edition;
}

export function RegistrationDetails({ edition }: RegistrationDetailsProps) {
	const {
		title,
		institute,
		startDate,
		endDate,
		onlineDelivery,
		inPersonDelivery,
	} = edition;

	let mode = "";
	if (onlineDelivery && inPersonDelivery) mode = "Hybrid";
	else if (onlineDelivery) mode = "Online";
	else if (inPersonDelivery) mode = "In-Person";
	else mode = "N/A";

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">
					Registration Details
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center space-x-4">
					{institute.logo && (
						<Image
							src={institute.logo}
							alt={`${institute.name} logo`}
							width={64}
							height={64}
							className="rounded"
						/>
					)}
					<div>
						<h2 className="text-lg font-medium">{title}</h2>
						<p className="text-sm text-muted-foreground">{institute.name}</p>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<h3 className="text-sm font-medium">Start Date</h3>
						<p>{startDate ? formatAccraDate(startDate, "short") : "TBA"}</p>
					</div>
					<div>
						<h3 className="text-sm font-medium">End Date</h3>
						<p>{endDate ? formatAccraDate(endDate, "short") : "TBA"}</p>
					</div>
				</div>

				<div>
					<h3 className="text-sm font-medium">Mode of Delivery</h3>
					<p>{mode}</p>
				</div>
			</CardContent>
		</Card>
	);
}
