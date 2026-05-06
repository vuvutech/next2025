"use client";

import { useCallback, useState } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: "institute" | "edition";
  url: string;
}

interface SearchResponse {
  institutes: SearchResult[];
  editions: SearchResult[];
}

function SearchResultItem({
  result,
  onClick,
}: {
  result: SearchResult;
  onClick: () => void;
}) {
  return (
    <Link
      href={result.url}
      onClick={onClick}
      className="block p-3 rounded-md hover:bg-accent transition-colors"
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "shrink-0 px-2 py-0.5 text-xs font-medium rounded",
            result.type === "institute"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
          )}
        >
          {result.type === "institute" ? "Institute" : "Edition"}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium truncate">{result.title}</h4>
          {result.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {result.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResponse>({
    institutes: [],
    editions: [],
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults({ institutes: [], editions: [] });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&type=all`,
      );
      const data = (await res.json()) as SearchResponse;
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      const timeoutId = setTimeout(() => search(value), 300);
      return () => clearTimeout(timeoutId);
    },
    [search],
  );

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setQuery("");
      setResults({ institutes: [], editions: [] });
    }
  }, []);

  const handleResultClick = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults({ institutes: [], editions: [] });
  }, []);

  const totalResults = results.institutes.length + results.editions.length;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Search" className="cursor-pointer">
          <SearchIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[540px] max-h-[80vh] overflow-hidden flex flex-col"
        showCloseButton={false}
      >
        <DialogHeader className="shrink-0">
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Search for institutes and editions
          </DialogDescription>
        </DialogHeader>

        <div className="shrink-0">
          <Input
            type="search"
            placeholder="Search institutes, programs..."
            value={query}
            onChange={handleSearch}
            autoFocus
            className="h-12"
          />
        </div>

        <div className="flex-1 overflow-y-auto mt-4 -mx-6 px-6">
          {loading ? (
            <div className="py-8 text-center text-muted-foreground">
              Searching...
            </div>
          ) : query.length < 2 ? (
            <div className="py-8 text-center text-muted-foreground">
              Type at least 2 characters to search
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <>
              {results.institutes.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Institutes ({results.institutes.length})
                  </h3>
                  <div className="space-y-1">
                    {results.institutes.map((result) => (
                      <SearchResultItem
                        key={`inst-${result.id}`}
                        result={result}
                        onClick={handleResultClick}
                      />
                    ))}
                  </div>
                </div>
              )}

              {results.editions.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Editions ({results.editions.length})
                  </h3>
                  <div className="space-y-1">
                    {results.editions.map((result) => (
                      <SearchResultItem
                        key={`ed-${result.id}`}
                        result={result}
                        onClick={handleResultClick}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter className="shrink-0 mt-4">
          <div className="text-xs text-muted-foreground">
            Press <kbd className="kbd">Esc</kbd> to close
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
