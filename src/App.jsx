import { useEffect, useState, useCallback } from "react";
import "./styles/main.css";
import LandingPage from "./components/landing/LandingPage";
import Dashboard from "./components/dashboard/Dashboard";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import LoadingSkeleton from "./components/landing/LoadingSkeleton";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshToken = useCallback(async () => {
    if (auth.currentUser) {
      const idToken = await auth.currentUser.getIdToken(true);
      return idToken;
    }
    return null;
  }, []);

  const fetchUserData = useCallback(async (idToken) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();
      setUser(data);
      console.log("User data:", data);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const idToken = await refreshToken();
        if (idToken) {
          await fetchUserData(idToken);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [refreshToken, fetchUserData]);

  useEffect(() => {
    if (user) {
      const refreshInterval = setInterval(
        async () => {
          const newToken = await refreshToken();
          if (newToken) {
            await fetchUserData(newToken);
          }
        },
        55 * 60 * 1000
      );

      return () => clearInterval(refreshInterval);
    }
  }, [user, refreshToken, fetchUserData]);

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.clear();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <main className="wrapper h-[100svh] w-full overflow-auto bg-white">
      {loading ? (
        <LoadingSkeleton />
      ) : user ? (
        <Dashboard user={user} handleLogout={handleLogout} />
      ) : (
        <LandingPage handleGoogle={handleGoogle} />
      )}
    </main>
  );
}

export default App;
