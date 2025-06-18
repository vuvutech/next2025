"use client"

import { useState } from "react";
import { SignUpComponent } from "@/components/sign-up";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    // <SignInComponent />
    <SignUpComponent />
  );
}