"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";

type Institute = {
  id: string;
  name: string;
};

interface ComboboxProps {
  institutes: { id: string; name: string }[];
  onSelect: (id: string) => void;
  selectedId?: string;
}

export function InstituteCombobox({
  institutes,
  onSelect,
  selectedId,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string>(selectedId ?? "");

  useEffect(() => {
    if (selectedId) setSelected(selectedId);
  }, [selectedId]);

  const selectedInstitute = institutes.find((i) => i.id === selected);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedInstitute ? selectedInstitute.name : "Select institute..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search institute..." className="h-9" />
          <CommandList>
            <CommandEmpty>No institute found.</CommandEmpty>
            <CommandGroup>
              {institutes.map((institute) => (
                <CommandItem
                  key={institute.id}
                  value={institute.id}
                  onSelect={() => {
                    setSelected(institute.id);
                    onSelect(institute.id);
                    setOpen(false);
                  }}
                >
                  {institute.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selected === institute.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
