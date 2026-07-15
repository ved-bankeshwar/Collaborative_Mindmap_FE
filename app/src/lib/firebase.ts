import { initializeApp, getApps, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import api from "../api/api";

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let initPromise: Promise<void> | null = null;

function configFromEnv(): FirebaseOptions {
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "collaborative-mind-map.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "collaborative-mind-map",
  };
}

export async function ensureFirebaseInitialized(): Promise<void> {
  if (app) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const envConfig = configFromEnv();
    let config = { ...envConfig };

    if (!config.apiKey) {
      try {
        const response = await api.get("/auth/config");
        config.apiKey = response.data.apiKey;
        config.authDomain = response.data.authDomain || config.authDomain;
        config.projectId = response.data.projectId || config.projectId;
      } catch (err) {
        console.error("[Firebase Client] Failed to load config from backend:", err);
      }
    }

    if (!config.apiKey) {
      throw new Error(
        "Firebase API key is missing. Add VITE_FIREBASE_API_KEY to .env or set FIREBASE_API_KEY in the backend .env."
      );
    }

    app = getApps().length ? getApps()[0] : initializeApp(config);
    auth = getAuth(app);
  })();

  return initPromise;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    throw new Error("Firebase Auth is not initialized. Call ensureFirebaseInitialized() first.");
  }
  return auth;
}

export const googleProvider = new GoogleAuthProvider();
