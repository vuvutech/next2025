"use client";

import { IconCirclePlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ExtensionComponent() {
	const router = useRouter();
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await fetch("/api/institutes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ content }), // ✅ match model field
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error?.message || "Failed to create institute.");
			}

			toast.success("Institute created successfully!");
			setContent(""); // reset form
			document.getElementById("dialog-close-btn")?.click();
			router.refresh();
		} catch (err: unknown) {
			toast.error(err instanceof Error ? err.message : "Something went wrong.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline" size="lg" className="cursor-pointer hidden">
						<IconCirclePlus /> Add New
					</Button>
				</DialogTrigger>
				<DialogContent className=" sm:max-w-[725px] overflow-y-auto">
					<form onSubmit={handleSubmit}>
						<DialogHeader>
							<DialogTitle>Add Institute</DialogTitle>
							<DialogDescription>
								Provide a clear title and message content. This institute will
								be visible to all users once published. Review before
								submitting.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid gap-3">
								<Label htmlFor="content">Content</Label>
								<Textarea
									id="content"
									name="content"
									value={content}
									onChange={(e) => setContent(e.target.value)}
									placeholder="Enter institute content"
									required
									className="h-[250px]"
								/>
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline" id="dialog-close-btn">
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit" disabled={loading}>
								{loading ? "Saving..." : "Save changes"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
