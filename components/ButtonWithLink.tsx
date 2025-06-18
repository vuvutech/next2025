"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ButtonWithLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function ButtonWithLink({
  href,
  children,
  className = "",
  variant = "primary",
}: ButtonWithLinkProps) {
  return (
    <Link href={href}>
      <div className={`button-borders ${className}`}>
        <button className={`${variant}-button`}>{children}</button>
      </div>
    </Link>
  );
}
