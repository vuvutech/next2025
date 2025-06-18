"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import React from "react";

export default function GoogleCaptchaWrapper({
  children,
  className
}: {
  children: React.ReactNode;
  className?:  string;
}) {
  const recaptchaKey: string | undefined = process?.env?.RECAPTCHA_SITE_KEY;

  if (!recaptchaKey) {
    console.error(
      "RECAPTCHA_SITE_KEY is not defined in .env.local. Please define it."
    );
  }
  

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}>
      {children}
    </GoogleReCaptchaProvider>
  );
}