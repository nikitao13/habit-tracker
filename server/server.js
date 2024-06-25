import express from "express";
import pkg from "body-parser";
import cors from "cors";
import { initializeApp, cert } from "firebase-admin/app";
import verifyToken from "../src/utils/verifyToken.js";
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
  completeHabit,
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

app.get("/get-user/:uid", verifyToken, async (req, res) => {
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

app.put("/update-user/:uid", verifyToken, async (req, res) => {
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

app.delete("/delete-user/:uid", verifyToken, async (req, res) => {
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

app.get("/api/habits", verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const user = await getUserByUID(uid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ habitList: user.habitList });
  } catch (error) {
    console.error("Error fetching habits:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/habits", verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
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

app.delete("/api/habits/:habitId", verifyToken, async (req, res) => {
  try {
    const uid = req.uid;
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

app.post("/api/complete-habit", verifyToken, async (req, res) => {
  try {
    const uid = req.uid;
    const { habitId } = req.body;

    if (!habitId) {
      return res.status(400).json({ error: "Missing habitId" });
    }

    const result = await completeHabit(uid, habitId);

    if (result) {
      const user = await getUserByUID(uid);
      res.status(200).json({ habitList: user.habitList });
    } else {
      res.status(404).json({ error: "Habit not found or already completed" });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
