"use client";

import React, { useState } from "react";
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
  onRegister: () => Promise<void>; // assume async
  loading?: boolean;
}

export function EditionSelect({
  editions,
  selectedEdition,
  onSelect,
  onRegister,
  loading = false,
}: Props) {
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async () => {
    setSubmitting(true);
    try {
      await onRegister();
      setRegistrationComplete(true);
    } catch (err) {
      console.error("Registration failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container w-full max-w-3xl">
      <div className="space-y-4 w-full">
        {registrationComplete ? (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg space-y-2">
            <p className="text-lg font-semibold">Registration Complete. Thank You.</p>
            <p>You would receive an email from us shortly.</p>
            <p>If you don’t, please check your spam folder.</p>
          </div>
        ) : (
          <>
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
              onClick={handleRegister}
              disabled={!selectedEdition || loading || submitting}
            >
              {submitting || loading ? "Registering..." : "Register"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
