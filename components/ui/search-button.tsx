"use client";

import { useCallback, useState } from "react";
import { SearchIcon, Building2, BookOpen, ArrowRight, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
      className="group flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-all duration-200"
    >
      <div
        className={cn(
          "shrink-0 flex items-center justify-center w-10 h-10 rounded-lg",
          result.type === "institute"
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
            : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
        )}
      >
        {result.type === "institute" ? (
          <Building2 className="w-5 h-5" />
        ) : (
          <BookOpen className="w-5 h-5" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
          {result.title}
        </h4>
        {result.description && (
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
            {result.description}
          </p>
        )}
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
    </Link>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-4 p-3 rounded-lg animate-pulse">
          <div className="shrink-0 w-10 h-10 rounded-lg bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="py-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        <SearchIcon className="w-8 h-8 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground">
        No results found for{" "}
        <span className="font-medium text-foreground">&ldquo;{query}&rdquo;</span>
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        Try searching for institute names or program titles
      </p>
    </div>
  );
}

function InitialState() {
  return (
    <div className="py-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
        <SearchIcon className="w-8 h-8 text-primary" />
      </div>
      <p className="text-muted-foreground">Search for institutes and editions</p>
      <p className="text-sm text-muted-foreground mt-2">
        Type at least 2 characters to begin
      </p>
    </div>
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

  const handleClear = () => {
    setQuery("");
    setResults({ institutes: [], editions: [] });
  };

  const totalResults = results.institutes.length + results.editions.length;
  const showResults = query.length >= 2 && !loading;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Search"
          className="cursor-pointer relative"
        >
          <SearchIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px] max-h-[85vh] overflow-hidden p-0 gap-0"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <SearchIcon className="w-5 h-5" />
          </div>
          <Input
            type="search"
            placeholder="Search institutes, programs..."
            value={query}
            onChange={handleSearch}
            autoFocus
            className="h-14 pl-12 pr-20 text-base border-0 border-b rounded-none focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {query && (
              <button
                onClick={handleClear}
                className="p-1 hover:bg-muted rounded-full transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              Esc
            </kbd>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingSkeleton />
              </motion.div>
            ) : query.length < 2 ? (
              <motion.div
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <InitialState />
              </motion.div>
            ) : totalResults === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EmptyState query={query} />
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {results.institutes.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Institutes
                      <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">
                        {results.institutes.length}
                      </span>
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
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Editions
                      <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">
                        {results.editions.length}
                      </span>
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="shrink-0 px-4 py-3 border-t bg-muted/30">
          <p className="text-xs text-muted-foreground text-center">
            Press <kbd className="kbd kbd-sm">Esc</kbd> to close
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}