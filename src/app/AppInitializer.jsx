"use client";

import { useEffect } from "react";
import { refreshIdTokenAndSetCookie } from "../lib/authClient";

export default function AppInitializer() {
  useEffect(() => {
    refreshIdTokenAndSetCookie();
  }, []);
  return null;
}
