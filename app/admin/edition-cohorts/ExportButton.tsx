"use client";

import { FileSpreadsheet, FileText } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";

interface ExportButtonProps {
	registrations: any[];
	editionTitle: string;
}

export function ExportButton({
	registrations,
	editionTitle,
}: ExportButtonProps) {
	const rows = registrations.map((r) => ({
		Name: r.user?.name || "Unknown",
		Email: r.user?.email || "",
		"Student ID": r.user?.studentId || "Not specified",
		Telephone: r.user?.profile?.telephone || "",
		Mobile: r.user?.profile?.mobile || "",
		"Institute Edition": editionTitle,
		Approved: r.approved ? "Yes" : "No",
		Paid: r.paid ? "Yes" : "No",
	}));

	const exportExcel = () => {
		const ws = XLSX.utils.json_to_sheet(rows);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Registrations");
		XLSX.writeFile(
			wb,
			`${editionTitle.replace(/\s+/g, "_")}_registrations.xlsx`,
		);
	};

	const exportPDF = () => {
		const doc = new jsPDF("landscape");
		doc.text(`${editionTitle} - Registrations`, 14, 15);

		const tableData = rows.map((r) => [
			r.Name,
			r.Email,
			r["Student ID"],
			r.Telephone,
			r.Mobile,
			r["Institute Edition"],
			r.Approved,
			r.Paid,
		]);

		autoTable(doc, {
			head: [[
				"Name",
				"Email",
				"Student ID",
				"Telephone",
				"Mobile",
				"Institute Edition",
				"Approved",
				"Paid",
			]],
			body: tableData,
			startY: 25,
			styles: { fontSize: 7 },
		});

		doc.save(
			`${editionTitle.replace(/\s+/g, "_")}_registrations.pdf`,
		);
	};

	return (
		<div className="flex items-center gap-2">
			<Button
				variant="outline"
				size="default"
				className="flex items-center gap-1.5 text-xs"
				onClick={exportExcel}
			>
				<FileSpreadsheet className="size-4 text-green-600" />
				Export to Excel
			</Button>
			<Button
				variant="outline"
				size="default"
				className="flex items-center gap-1.5 text-xs"
				onClick={exportPDF}
			>
				<FileText className="size-4 text-destructive" />
				Export to PDF
			</Button>
		</div>
	);
}
