import express from "express";
import pkg from "body-parser";
import cors from "cors";
import {
  createUser,
  getUserByUID,
  updateUser,
  deleteUser,
  checkUserAndFetchHabits,
} from "./userSchema.js";

const { json } = pkg;

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());

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
  const { uid, name, email } = req.body;

  try {
    const habitList = await checkUserAndFetchHabits(uid, name, email);
    res.status(200).json({ habitList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
