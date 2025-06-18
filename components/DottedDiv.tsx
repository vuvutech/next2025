"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const DottedDiv = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("relative", className)}>
    <div className="absolute top-2  h-[1.5px] w-[100%] bg-muted" />
    <div className="absolute bottom-2  h-[1.5px] w-[100%] bg-muted" />
    <div className="absolute  left-2 h-[100%] w-[1.5px] bg-muted" />
    <div className="absolute  right-2 h-[100%] w-[1.5px] bg-muted" />
    <div className="absolute top-[8.5px] left-[8.5px] z-10 size-2 rounded-full bg-foreground" />
    <div className="absolute top-[8.5px] right-[8.5px] z-10 size-2 rounded-full bg-foreground" />
    <div className="absolute bottom-[8.5px] left-[8.5px] z-10 size-2 rounded-full bg-foreground" />
    <div className="absolute right-[8.5px] bottom-[8.5px] z-10 size-2 rounded-full bg-foreground" />
    {children}
  </div>
);
