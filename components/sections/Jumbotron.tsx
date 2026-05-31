"use client";

import clsx from "clsx";
import Image from "next/image";
import { useDevice } from "@/hooks/useDevice";
import { useHasMounted } from "@/hooks/useHasMounted";

interface JumbotronProps {
	heroImage?: string;
	height?: string;
	shade?: string;
	className?: string;
	coverPosition?: string;
}

export default function Jumbotron({
	heroImage = "/images/contact.jpg",
	height = "md:h-[450px]",
	// shade = "5",
	className,
	coverPosition = "object-top",
}: JumbotronProps) {
	const { isMobile } = useDevice();
	const hasMounted = useHasMounted();

	const shouldAnimate = hasMounted && !isMobile;

	return (
		<header className="relative w-full">
			<div className="md:min-w-[1440px]  mx-auto ">
				{/* Hero Section */}
				<div className={`relative w-full h-[470px] ${height} overflow-hidden`}>
					<Image
						loading="eager"
						src={heroImage}
						alt="Hero image"
						fill
						className={clsx(
							"object-cover",
							shouldAnimate && "kenburns",
							coverPosition,
							className,
						)}
						placeholder="blur"
						blurDataURL="data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADwAQCdASoIAAUAAUAmJaQAA3AA/v60AAAA"
					/>

					{/* <div className={`absolute inset-0 bg-black/${shade}`} /> */}
				</div>
			</div>
		</header>
	);
}
