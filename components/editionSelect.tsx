"use client";

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Edition {
  id: string;
  title: string;
  institute: {
    name: string;
    logo?: string;
  };
}

interface Props {
  editions: Edition[];
  selectedEdition: string | null;
  onSelect: (value: string) => void;
  onRegister: () => void;
  loading?: boolean;
}

export function EditionSelect({
  editions,
  selectedEdition,
  onSelect,
  onRegister,
  loading = false,
}: Props) {
  return (
    <div className="container w-full max-w-3xl">
      <div className="space-y-4 w-full">
        <Select onValueChange={onSelect}>
          <SelectTrigger className="w-full h-20 text-lg px-6 py-8">
            <SelectValue placeholder="Select Edition" />
          </SelectTrigger>
          <SelectContent>
            {editions.map(({ id, title, institute }) => (
              <SelectItem key={id} value={id} className="h-16">
                <div className="flex items-center space-x-2">
                  {institute.logo && (
                    <Image
                      src={`/${institute.logo}`}
                      alt={`${institute.name} logo`}
                      width={150}
                      height={150}
                      className="w-12 h-12 object-contain rounded"
                    />
                  )}
                  <div className="text-left">
                    <div className="font-semibold">{title}</div>
                    <div className="text-xs text-muted-foreground">
                      {institute.name}
                    </div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          className="w-full"
          onClick={onRegister}
          disabled={!selectedEdition || loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </div>
    </div>
  );
}
