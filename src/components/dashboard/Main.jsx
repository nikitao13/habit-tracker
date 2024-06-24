import { useState, useEffect } from "react";
import { auth } from "../../../firebase/config";

function Main({ user }) {
  const [habits, setHabits] = useState([]);
  const [view, setView] = useState("all");
  const [addState, setAddState] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: "",
    duration: "",
  });

  const fetchHabits = async () => {
    if (!user) return;

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
      setHabits(data.habitList);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);

  const addHabit = async (habit) => {
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
      setHabits(data.habitList);
      setAddState(false);
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };

  const toggleAddState = () => {
    setAddState((prevState) => !prevState);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const habit = {
      name: newHabit.name,
      duration: parseInt(newHabit.duration, 10),
      completed: false,
    };
    addHabit(habit);
    setNewHabit({
      name: "",
      duration: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHabit((prevHabit) => ({
      ...prevHabit,
      [name]: value,
    }));
  };

  const filteredHabits = habits.filter((habit) => {
    switch (view) {
      case "pending":
        return !habit.completed;
      case "completed":
        return habit.completed;
      case "all":
      default:
        return true;
    }
  });

  return (
    <section className="mx-auto mt-4 flex w-full max-w-[1600px] flex-grow flex-col bg-gray-100 p-6">
      <h1 className="text-xl font-semibold tracking-tight text-black/85">
        Welcome, {user.displayName}!
      </h1>
      <h2>Total Points: 0</h2>
      <h2>Habits Completed: 0</h2>
      <h2>Daily Score: 0</h2>
      <div className="mt-2 flex gap-4">
        <button
          onClick={toggleAddState}
          className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-500 px-3 py-1 text-sm font-extralight text-white transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:opacity-90"
        >
          Add Habit
        </button>
        <button
          onClick={() => setView("all")}
          className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-500 px-3 py-1 text-sm font-extralight text-white transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:opacity-90"
        >
          All Habits
        </button>
        <button
          onClick={() => setView("pending")}
          className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-500 px-3 py-1 text-sm font-extralight text-white transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:opacity-90"
        >
          Pending
        </button>
        <button
          onClick={() => setView("completed")}
          className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-500 px-3 py-1 text-sm font-extralight text-white transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:opacity-90"
        >
          Completed
        </button>
      </div>

      {addState && (
        <form className="mt-4 flex w-[10rem] flex-col gap-2" onSubmit={handleFormSubmit}>
          <input
            name="name"
            placeholder="Habit Name"
            value={newHabit.name}
            onChange={handleInputChange}
            required
          />
          <input
            name="duration"
            placeholder="Duration"
            value={newHabit.duration}
            onChange={handleInputChange}
            required
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-500 px-3 py-1 text-sm font-extralight text-white transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:opacity-90"
          >
            Add Habit
          </button>
        </form>
      )}

      <div className="mt-4 flex flex-col gap-2">
        <h1 className="text-lg font-semibold">User's Habits:</h1>
        {filteredHabits.length > 0 ? (
          filteredHabits.map((habit, index) => (
            <div key={index} className="">
              <h2 className="font-semibold tracking-wider">{habit.name}</h2>
              <p>Duration: {habit.duration} minutes</p>
              <p>Status: {habit.completed ? "Completed" : "Pending"}</p>
            </div>
          ))
        ) : (
          <h2>Time to improve your habits!</h2>
        )}
      </div>
    </section>
  );
}

export default Main;
