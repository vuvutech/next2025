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
import { Card, CardContent, CardDescription } from "./ui/card";
import { CardHeader } from "@/components/ui/card";

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
    <div className="h-svh container mx-auto flex flex-col justify-center items-center ">
      <Card className=" w-full max-w-3xl p-2 sm:p-4">
        <CardHeader className="text-xl sm:text-3xl p-2 sm:p-4">
          NOW SELECT AN INSTITUTE
        </CardHeader>
        <CardDescription className="p-2 sm:p-4 text-firefly sm:text-lg">
          Choose your preferred edition from the list above. Once selected,
          click Register to secure your spot at your chosen institute.
        </CardDescription>
        <CardContent className="p-2 sm:p-4">
          <div className="space-y-4 w-full">
            {registrationComplete ? (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg space-y-2">
                <p className="text-lg font-semibold">
                  Registration Complete. Thank You.
                </p>
                <p>You would receive an email from us shortly.</p>
                <p>If you don’t, please check your spam folder.</p>
              </div>
            ) : (
              <>
                <Select onValueChange={onSelect}>
                  <SelectTrigger className="w-full h-20 px-4 py-6">
                    <SelectValue placeholder="Select Edition" />
                  </SelectTrigger>
                  <SelectContent className="w-auto">
                    {editions.map(({ id, title, institute }) => (
                      <SelectItem key={id} value={id} className="h-16">
                        <div className="flex items-center space-x-2">
                          {institute.logo && (
                            <Image
                              src={`/${institute.logo}`}
                              alt={`${institute.name} logo`}
                              width={150}
                              height={150}
                              className=" w-10 h-10  sm:w-12 sm:h-12 object-contain rounded"
                            />
                          )}
                          <div className="text-left">
                            <div className="font-semibold">{title}</div>
                            <div className="text-xs text-muted-foreground relative">
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
        </CardContent>
      </Card>
    </div>
  );
}
