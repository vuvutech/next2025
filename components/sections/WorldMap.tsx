import Image from "next/image";

export default function WorldMap() {
	return (
		<section className="h-auto max-w-8xl md:px-8 mx-auto pt-8">
			<figure>
				<Image
					className="rounded-3xl"
					src="/images/world-map.svg"
					alt="Image Description"
					width={1200}
					height={400}
				/>
			</figure>
		</section>
	);
}
