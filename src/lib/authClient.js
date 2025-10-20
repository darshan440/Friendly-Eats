"use client";

import { getAuth, onIdTokenChanged } from "firebase/auth";

export async function refreshIdTokenAndSetCookie() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return;

  const token = await user.getIdToken(true); // force refresh
  await fetch("/api/set-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
}

// You can export a helper that sets up a listener
export function startAuthListener() {
  const auth = getAuth();
  onIdTokenChanged(auth, async (user) => {
    if (user) {
      await refreshIdTokenAndSetCookie();
    } else {
      // Optional: clear cookie when signed out
      await fetch("/api/set-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: "" }),
      });
    }
  });
}
