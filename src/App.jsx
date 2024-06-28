import { useEffect, useState } from "react";
import "./styles/main.css";
import LandingPage from "./components/landing/LandingPage";
import Dashboard from "./components/dashboard/Dashboard";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import LoadingSkeleton from "./components/landing/LoadingSkeleton";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const filteredUser = {
          uid: currentUser.uid,
          name: currentUser.displayName || "",
          email: currentUser.email || "",
          points: 0,
          habitList: [],
        };

        setUser(filteredUser);
        const idToken = await currentUser.getIdToken(true);
        
        try {
          const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
          });

          const data = await response.json();
          console.log("User habits:", data.habitList);
        } catch (error) {
          console.error("Error during API call:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
