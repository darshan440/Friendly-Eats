// enforces that this code can only be called on the server
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment
import "server-only";

import { cookies } from "next/headers";
import { initializeServerApp, initializeApp, getApps } from "firebase/app";

import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCclJT_8xssXGHjY6AtgrENCFGPF5YaNVo",
  authDomain: "friendlyeats-codelab-ed9fc.firebaseapp.com",
  projectId: "friendlyeats-codelab-ed9fc",
  storageBucket: "friendlyeats-codelab-ed9fc.firebasestorage.app",
  messagingSenderId: "460365133107",
  appId: "1:460365133107:web:854c69cacf74162739fa46",
};

export async function getAuthenticatedAppForUser() {
  const authIdToken = (await cookies()).get("__session")?.value;
  try {
    const firebaseServerApp = initializeServerApp(
      getApps().length ? getApps()[0] : initializeApp(firebaseConfig),
      { authIdToken }
    );

    const auth = getAuth(firebaseServerApp);
    await auth.authStateReady();

    return { firebaseServerApp, currentUser: auth.currentUser };
  } catch (error) {
    console.error("Error initializing FirebaseServerApp:", error);

    // If token expired → clear it to avoid stale SSR mismatches
    if (error.message.includes("token has expired")) {
      (await cookies()).delete("__session");
    }

    return { firebaseServerApp: null, currentUser: null };
  }
}

