import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";

interface SearchResult {
	id: string;
	name: string;
	title: string;
	slug: string;
	description: string;
	type: "institute" | "edition";
	url: string;
}

function truncateDescription(
	text: string | null | undefined,
	maxLength = 100,
): string {
	if (!text) return "";
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength).trim() + "...";
}

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("q")?.trim();
	const type = searchParams.get("type") || "all";

	if (!query || query.length < 2) {
		return NextResponse.json({ institutes: [], editions: [] });
	}

	try {
		const results: { institutes: SearchResult[]; editions: SearchResult[] } = {
			institutes: [],
			editions: [],
		};

		// Search both in parallel
		const [institutes, editions] = await Promise.all([
			type === "all" || type === "institute"
				? prisma.institute.findMany({
						where: {
							AND: [
								{ active: true },
								{
									OR: [
										{ name: { contains: query, mode: "insensitive" } },
										{ overview: { contains: query, mode: "insensitive" } },
										{ about: { contains: query, mode: "insensitive" } },
										{ introduction: { contains: query, mode: "insensitive" } },
									],
								},
							],
						},
						select: {
							id: true,
							name: true,
							slug: true,
							overview: true,
							about: true,
							introduction: true,
						},
						take: 5,
						orderBy: { name: "asc" },
					})
				: Promise.resolve([]),
			type === "all" || type === "edition"
				? prisma.edition.findMany({
						where: {
							AND: [
								{ active: true },
								{
									OR: [
										{ title: { contains: query, mode: "insensitive" } },
										{ overview: { contains: query, mode: "insensitive" } },
										{ about: { contains: query, mode: "insensitive" } },
										{ introduction: { contains: query, mode: "insensitive" } },
									],
								},
							],
						},
						select: {
							id: true,
							title: true,
							slug: true,
							overview: true,
							about: true,
							introduction: true,
							institute: { select: { slug: true } },
						},
						take: 5,
						orderBy: { title: "asc" },
					})
				: Promise.resolve([]),
		]);

		results.institutes = institutes.map((inst) => ({
			id: inst.id,
			name: inst.name,
			title: inst.name,
			slug: inst.slug,
			description: truncateDescription(
				inst.overview || inst.about || inst.introduction,
			),
			type: "institute",
			url: `/institutes/${inst.slug}`,
		}));

		results.editions = editions.map((ed) => ({
			id: ed.id,
			name: ed.title,
			title: ed.title,
			slug: ed.slug,
			description: truncateDescription(
				ed.overview || ed.about || ed.introduction,
			),
			type: "edition",
			url: `/institutes/${ed.institute.slug}/edition/${ed.slug}`,
		}));

		return NextResponse.json(results);
	} catch (error) {
		console.error("Search error:", error);
		return NextResponse.json({ error: "Search failed" }, { status: 500 });
	}
}
