import express from "express";
import pkg from "body-parser";
import cors from "cors";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";
import serviceAccount from "../firebase/habitly.json" assert { type: "json" };
import {
  createUser,
  getUserByUID,
  updateUser,
  deleteUser,
  checkUserAndFetchHabits,
  addHabit,
  deleteHabit,
} from "./userSchema.js";

dotenv.config();

const { json } = pkg;

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());

initializeApp({
  credential: cert(serviceAccount),
});

app.post("/create-user", async (req, res) => {
  const { uid, name, email, points, habitList } = req.body;
  try {
    const newUser = await createUser(uid, name, email, points, habitList);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-user/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await getUserByUID(uid);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/update-user/:uid", async (req, res) => {
  const { uid } = req.params;
  const updateData = req.body;
  try {
    const updated = await updateUser(uid, updateData);
    if (updated) {
      res.status(200).json({ message: "User updated" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/delete-user/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const deleted = await deleteUser(uid);
    if (deleted) {
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "ID token is required" });
  }

  try {
    const habitList = await checkUserAndFetchHabits(idToken);
    res.status(200).json({ habitList });
  } catch (error) {
    console.error("Error checking user and fetching habits:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/habits", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const idToken = authHeader?.split("Bearer ")[1];

    if (!idToken) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decodedToken = await getAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const user = await getUserByUID(uid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ habitList: user.habitList });
  } catch (error) {
    console.error("Error fetching habits:", error);
    if (error.code === "auth/id-token-expired") {
      res.status(401).json({ error: "Token expired" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.post("/api/habits", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const idToken = authHeader?.split("Bearer ")[1];

    if (!idToken) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decodedToken = await getAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const { habit } = req.body;

    const result = await addHabit(uid, habit);

    if (result) {
      const user = await getUserByUID(uid);
      res.status(200).json({ habitList: user.habitList });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error adding habit:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/habits/:habitId", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const idToken = authHeader?.split("Bearer ")[1];

    if (!idToken) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decodedToken = await getAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const { habitId } = req.params;

    const result = await deleteHabit(uid, habitId);

    if (result) {
      const user = await getUserByUID(uid);
      res.status(200).json({ habitList: user.habitList });
    } else {
      res.status(404).json({ message: "Habit not found" });
    }
  } catch (error) {
    console.error("Error deleting habit:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
