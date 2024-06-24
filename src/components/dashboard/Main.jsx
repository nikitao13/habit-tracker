import { useState, useEffect } from "react";
import { fetchHabits, addHabit, deleteHabit, markHabitAsComplete } from "../../utils/apiService";
import { FaCheck } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import HabitForm from "./HabitForm";
import Console from "./Console";

function Main({ user }) {
  const [habits, setHabits] = useState([]);
  const [view, setView] = useState("all");
  const [addState, setAddState] = useState(false);
  const [completedOrder, setCompletedOrder] = useState([]);

  useEffect(() => {
    if (user) {
      (async () => {
        const fetchedHabits = await fetchHabits(user);
        setHabits(fetchedHabits);
        const initialCompletedOrder = fetchedHabits
          .filter((habit) => habit.completed)
          .map((habit) => habit._id);
        setCompletedOrder(initialCompletedOrder);
      })();
    }
  }, [user]);

  const handleAddHabit = async (habit) => {
    try {
      const updatedHabits = await addHabit(habit);
      setHabits(updatedHabits);
      setAddState(false);
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };

  const handleDeleteHabit = async (habitId) => {
    try {
      const updatedHabits = await deleteHabit(habitId);
      setHabits(updatedHabits);
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const handleCompleteHabit = async (habitId) => {
    try {
      const updatedHabits = await markHabitAsComplete(habitId);
      setHabits(updatedHabits);
      setCompletedOrder([...completedOrder, habitId]);
    } catch (error) {
      console.error("Error marking habit as complete:", error);
    }
  };

  const toggleAddState = () => {
    setAddState((prevState) => !prevState);
  };

  const filteredHabits = habits
    .filter((habit) => {
      switch (view) {
        case "pending":
          return !habit.completed;
        case "completed":
          return habit.completed;
        case "all":
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (a.completed && b.completed) {
        return completedOrder.indexOf(b._id) - completedOrder.indexOf(a._id);
      }
      return a.completed - b.completed;
    });

  return (
    <section className="mx-auto mt-1 flex w-full max-w-[1600px] flex-grow flex-col bg-gray-100 p-6">
      <Console user={user} toggleAddState={toggleAddState} setView={setView} />
      {addState && <HabitForm onSubmit={handleAddHabit} />}

      <div className="mt-4 flex max-w-fit flex-col gap-2">
        <h1 className="text-lg font-semibold">User's Habits:</h1>
        {filteredHabits.length > 0 ? (
          filteredHabits.map((habit, index) => (
            <div key={index} className="w-full">
              <h2 className="font-semibold tracking-wider">{habit.name}</h2>
              <p>Duration: {habit.duration} minutes</p>
              <p>Status: {habit.completed ? "Completed" : "Pending"}</p>
              <div className="mb-4 flex gap-2">
                <FaCheck
                  className={`text-xl ${habit.completed ? "text-gray-400" : "text-green-600 hover:cursor-pointer"}`}
                  onClick={() => !habit.completed && handleCompleteHabit(habit._id)}
                />
                <FaDeleteLeft
                  className="text-xl text-red-600 hover:cursor-pointer"
                  onClick={() => handleDeleteHabit(habit._id)}
                />
              </div>
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
