"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon, ChevronDown } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	loading?: boolean;
	addFiltering?: boolean;
	extention?: React.ReactNode | string | null;
}

export function GenericDataTable<TData, TValue>({
	columns,
	data,
	loading = false,
	addFiltering = false,
	extention,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [globalFilter, setGlobalFilter] = React.useState<string>("");

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		getPaginationRowModel: getPaginationRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			globalFilter,
		},
	});

	// Remove formState and isSubmitting if not used, or ensure they are relevant
	// const [formState, setFormState] = React.useState({ content: "", featured: false, approved: true });
	// const [isSubmitting, setIsSubmitting] = React.useState(false);

	return (
		<div className="space-y-4 text-xs ">
			{addFiltering ? (
				<div className="flex flex-col sm:flex-row justify-between items-center py-4">
					<div>
						<Input
							placeholder="Filter all contents..."
							value={globalFilter ?? ""}
							onChange={(event) => setGlobalFilter(event.target.value)}
							className="w-auto min-w-lg"
						/>
					</div>
					<div className="flex flex-row items-center gap-2">
						<div>{extention}</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="ml-auto">
									Columns <ChevronDown />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{table
									.getAllColumns()
									.filter((column) => column.getCanHide())
									.map((column) => (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			) : null}

			<div className="rounded-md border text-xs">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									className={
										header.column.getCanSort()
											? "cursor-pointer select-none"
											: undefined
									}
								>
									{header.column.getCanSort() ? (
										<button
											type="button"
											className="flex items-center gap-1 cursor-pointer"
											onClick={header.column.getToggleSortingHandler()}
											title={
												header.column.getNextSortingOrder() === "asc"
													? "Sort ascending"
													: header.column.getNextSortingOrder() === "desc"
														? "Sort descending"
														: "Clear sort"
											}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
											{{
												asc: <ArrowUpIcon className="ml-1 h-3 w-3" />,
												desc: <ArrowDownIcon className="ml-1 h-3 w-3" />,
											}[header.column.getIsSorted() as string] ?? null}
										</button>
									) : header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className="text-xs">
						{loading ? (
							<TableRow>
								<TableCell colSpan={columns.length}>Loading...</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length}>No data found</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-end gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
