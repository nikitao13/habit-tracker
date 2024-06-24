import { auth } from "../../firebase/config";

export const fetchHabits = async (user) => {
  if (!user) return [];

  try {
    const idToken = await auth.currentUser.getIdToken(true);
    const response = await fetch("http://localhost:3000/api/habits", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch habits");
    }

    const data = await response.json();
    return data.habitList;
  } catch (error) {
    console.error("Error fetching habits:", error);
    throw error;
  }
};

export const addHabit = async (user, habit) => {
  try {
    const idToken = await auth.currentUser.getIdToken(true);
    const response = await fetch("http://localhost:3000/api/habits", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ habit }),
    });

    if (!response.ok) {
      throw new Error("Failed to add habit");
    }

    const data = await response.json();
    return data.habitList;
  } catch (error) {
    console.error("Error adding habit:", error);
    throw error;
  }
};

export const deleteHabit = async (user, habitId) => {
  try {
    const idToken = await auth.currentUser.getIdToken(true);
    const response = await fetch(`http://localhost:3000/api/habits/${habitId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete habit");
    }

    const data = await response.json();
    return data.habitList;
  } catch (error) {
    console.error("Error deleting habit:", error);
    throw error;
  }
};
