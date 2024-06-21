import { useEffect, useState } from "react";
import "./styles/main.css";
import LandingPage from "./components/landing/LandingPage";
import Dashboard from "./components/dashboard/Dashboard";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const filteredUser = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        };
        setUser(filteredUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("User state changed:", user);
  }, [user]);

  const handleGoogle = async (e) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);

      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("User habits:", data.habitList);
        })
        .catch((error) => {
          console.error("Error during API call:", error);
        });
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
      {user ? (
        <Dashboard user={user} handleLogout={handleLogout} />
      ) : (
        <LandingPage handleGoogle={handleGoogle} />
      )}
    </main>
  );
}

export default App;
