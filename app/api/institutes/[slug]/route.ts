import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { baseUrl } from "@/lib/metadata";
import { prisma } from "@/prisma/dbConnect";

export async function GET(
	_request: NextRequest,
	props: { params: Promise<{ slug: string }> },
) {
	const params = await props.params;
	const slug = params.slug;
	if (!slug)
		return NextResponse.json(
			{ error: "Missing institute slug" },
			{ status: 400 },
		);

	try {
		const institute = await prisma.institute.findUnique({
			where: { slug },
			include: { editions: true },
		});
		if (!institute)
			return NextResponse.json(
				{ error: "Institute not found" },
				{ status: 404 },
			);
		return NextResponse.json(institute);
	} catch (error) {
		console.error("❌ Error fetching institute:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function PUT(
	request: NextRequest,
	props: { params: Promise<{ slug: string }> },
) {
	const params = await props.params;

	const identifier = params.slug;

	const json = await request.json();

	const fields = [
		"name",
		"acronym",
		"overview",
		"about",
		"introduction",
		"seo",
		"banner",
		"logo",
		"icon",
	];
	const data: Record<string, unknown> = {};

	for (const field of fields) {
		const value = json[field];
		if (value !== undefined && value !== null && value !== "") {
			data[field] = value;
		}
	}

	try {
		const existing = await prisma.institute.findFirst({
			where: {
				OR: [{ slug: identifier }, { id: identifier }],
			},
		});

		if (!existing) {
			return NextResponse.json(
				{ error: "Institute not found" },
				{ status: 404 },
			);
		}

		const updatedInstitute = await prisma.institute.update({
			where: { id: existing.id },
			data,
		});

		revalidatePath(`${baseUrl}/admin/institutes/${existing.slug}/edit`);

		return NextResponse.json(updatedInstitute);
	} catch (error: unknown) {
		console.error("❌ Error during update:", error);
		const errMessage = error instanceof Error ? error.message : String(error);
		return NextResponse.json(
			{ error: errMessage || "Internal server error" },
			{ status: 500 },
		);
	}
}
