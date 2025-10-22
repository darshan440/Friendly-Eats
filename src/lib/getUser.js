"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "@/src/lib/firebase/clientApp.js";

export function useUser() {
  const [user, setUser] = useState();
  // keep ui in the sync
  useEffect(() => {
    return onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // force refresh token and log token
        const tokenResult = await authUser.getIdTokenResult(true);
        console.log("✅ Logged in as:", authUser.uid);
        console.log("🗝️ Token claims: ", tokenResult.claims);
        console.log(
          "🪪 Token snippet: ",
          tokenResult.token.substring(0, 50) + "..."
        );
      } else {
        console.log("🌵 no user logged in.");
      }

      setUser(authUser);
    });
  }, []);

  return user;
}
