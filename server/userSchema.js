import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { getAuth } from "firebase-admin/auth";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const uri = process.env.VITE_MONGODB_URI;

if (!uri) {
  console.error("MongoDB URI is not defined in the environment variables");
}

const client = new MongoClient(uri);

export async function connectDB() {
  if (!client.topology?.isConnected()) {
    await client.connect();
  }
  return client.db("habitly-db").collection("users");
}

export async function createUser(uid, name, email) {
  try {
    const collection = await connectDB();
    const newUser = {
      uid: uid,
      name: name,
      email: email,
      points: 0,
      habitList: [],
      habitsCompleted: 0,
    };
    const result = await collection.insertOne(newUser);
    return {
      _id: result.insertedId,
      ...newUser,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getUserByUID(uid) {
  try {
    const collection = await connectDB();
    const user = await collection.findOne({ uid: uid });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function checkUserAndFetchHabits(idToken) {
  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    let user = await getUserByUID(uid);

    if (!user) {
      const { name, email } = decodedToken;
      user = await createUser(uid, name, email);
    }

    return user;
  } catch (error) {
    console.error("Error checking user and fetching habits:", error);
    throw error;
  }
}

export async function updateUser(uid, updateData) {
  try {
    const collection = await connectDB();
    const result = await collection.updateOne({ uid: uid }, { $set: updateData });
    return result.modifiedCount > 0;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function deleteUser(uid) {
  try {
    const collection = await connectDB();
    const result = await collection.deleteOne({ uid: uid });
    return result.deletedCount > 0;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export async function addHabit(uid, habit) {
  try {
    const collection = await connectDB();
    habit._id = uuidv4();
    const result = await collection.updateOne({ uid: uid }, { $push: { habitList: habit } });
    return result.modifiedCount > 0;
  } catch (error) {
    console.error("Error adding habit:", error);
    throw error;
  }
}

export async function deleteHabit(uid, habitId) {
  try {
    const collection = await connectDB();
    await collection.updateOne({ uid: uid }, { $pull: { habitList: { _id: habitId } } });
    const updatedUser = await collection.findOne({ uid: uid });
    return updatedUser.habitList;
  } catch (error) {
    console.error("Error deleting habit:", error);
    throw error;
  }
}

export async function completeHabit(uid, habitId) {
  try {
    const collection = await connectDB();
    const result = await collection.findOneAndUpdate(
      { uid: uid, "habitList._id": habitId },
      {
        $set: { "habitList.$.completed": true },
        $inc: { habitsCompleted: 1 },
      },
      { returnDocument: "after" }
    );

    if (result.value) {
      return {
        success: true,
        habitsCompleted: result.value.habitsCompleted,
      };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error completing habit:", error);
    throw error;
  }
}
