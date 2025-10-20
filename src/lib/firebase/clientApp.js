"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCclJT_8xssXGHjY6AtgrENCFGPF5YaNVo",
  authDomain: "friendlyeats-codelab-ed9fc.firebaseapp.com",
  projectId: "friendlyeats-codelab-ed9fc",
  storageBucket: "friendlyeats-codelab-ed9fc.firebasestorage.app",
  messagingSenderId: "460365133107",
  appId: "1:460365133107:web:854c69cacf74162739fa46",
};

// ✅ ensure only one app instance
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const firebaseApp = app;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
