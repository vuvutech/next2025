"use client"

import { SignUpComponent } from "@/components/sign-up";
import { useState } from "react";

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