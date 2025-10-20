// enforces that this code can only be called on the server
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment
import "server-only";

import { cookies } from "next/headers";
import { initializeServerApp, initializeApp, getApps } from "firebase/app";

import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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

