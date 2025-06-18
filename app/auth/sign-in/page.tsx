"use client"

import { useState } from "react";
import SignInComponent from "@/components/sign-in";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // useEffect(() => {
  //   client.oneTap();
  // }, []);
  return (
    <SignInComponent />

  );
}