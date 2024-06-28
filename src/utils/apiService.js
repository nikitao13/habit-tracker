import { auth } from "../../firebase/config";

export const fetchHabits = async (uid) => {
  if (!uid) return [];

  try {
    const idToken = await auth.currentUser.getIdToken(true);
    const response = await fetch(`http://localhost:3000/api/habits/${uid}`, {
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
    return data;
  } catch (error) {
    console.error("Error fetching habits:", error);
    throw error;
  }
};

export const addHabit = async (uid, habit) => {
  try {
    const idToken = await auth.currentUser.getIdToken(true);
    const response = await fetch(`http://localhost:3000/api/habits/${uid}`, {
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
    return data;
  } catch (error) {
    console.error("Error adding habit:", error);
    throw error;
  }
};

export const deleteHabit = async (uid, habitId) => {
  try {
    const idToken = await auth.currentUser.getIdToken(true);
    const response = await fetch(`http://localhost:3000/api/habits/${uid}/${habitId}`, {
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
    return data;
  } catch (error) {
    console.error("Error deleting habit:", error);
    throw error;
  }
};

export const markHabitAsComplete = async (uid, habitId) => {
  try {
    const idToken = await auth.currentUser.getIdToken(true);
    const response = await fetch(`http://localhost:3000/api/habits/complete/${uid}/${habitId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to complete habit");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error completing habit:", error);
    throw error;
  }
};
