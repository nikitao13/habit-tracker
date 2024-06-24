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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const cachedHabits = localStorage.getItem(`habits_${user.uid}`);
      if (cachedHabits) {
        const parsedHabits = JSON.parse(cachedHabits);
        setHabits(parsedHabits);
        setLoading(false);
      } else {
        fetchAndSetHabits();
      }
    }
  }, [user]);

  const fetchAndSetHabits = async () => {
    try {
      const fetchedHabits = await fetchHabits(user);
      setHabits(fetchedHabits);
      localStorage.setItem(`habits_${user.uid}`, JSON.stringify(fetchedHabits));
    } catch (error) {
      console.error("Error fetching habits:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHabit = async (habit) => {
    const newHabit = { ...habit, createdAt: new Date().toISOString() };
    const newHabits = [...habits, newHabit];
    setHabits(newHabits);
    localStorage.setItem(`habits_${user.uid}`, JSON.stringify(newHabits));
    setAddState(false);

    try {
      const updatedHabits = await addHabit(newHabit);
      setHabits(updatedHabits);
      localStorage.setItem(`habits_${user.uid}`, JSON.stringify(updatedHabits));
    } catch (error) {
      console.error("Error adding habit:", error);
      fetchAndSetHabits();
    }
  };

  const handleDeleteHabit = async (habitId) => {
    const newHabits = habits.filter((habit) => habit._id !== habitId);
    setHabits(newHabits);
    localStorage.setItem(`habits_${user.uid}`, JSON.stringify(newHabits));

    try {
      const updatedHabits = await deleteHabit(habitId);
      setHabits(updatedHabits);
      localStorage.setItem(`habits_${user.uid}`, JSON.stringify(updatedHabits));
    } catch (error) {
      console.error("Error deleting habit:", error);
      fetchAndSetHabits();
    }
  };

  const handleCompleteHabit = async (habitId) => {
    const newHabits = habits.map((habit) =>
      habit._id === habitId
        ? { ...habit, completed: true, completedAt: new Date().toISOString() }
        : habit
    );
    setHabits(newHabits);
    localStorage.setItem(`habits_${user.uid}`, JSON.stringify(newHabits));

    try {
      const updatedHabits = await markHabitAsComplete(habitId);
      setHabits(updatedHabits);
      localStorage.setItem(`habits_${user.uid}`, JSON.stringify(updatedHabits));
    } catch (error) {
      console.error("Error marking habit as complete:", error);
      fetchAndSetHabits();
    }
  };

  const toggleAddState = () => {
    setAddState((prevState) => !prevState);
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

  const uncompletedHabits = filteredHabits.filter((habit) => !habit.completed);
  const completedHabits = filteredHabits.filter((habit) => habit.completed);

  return (
    <section className="mx-auto mt-1 flex w-full max-w-[1600px] flex-grow flex-col bg-gray-100 p-6">
      <Console user={user} toggleAddState={toggleAddState} setView={setView} />
      {addState && <HabitForm onSubmit={handleAddHabit} />}
      <div className="mt-4 flex max-w-fit flex-col gap-2">
        <h1 className="text-lg font-semibold">User's Habits:</h1>
        {uncompletedHabits.length > 0 ? (
          uncompletedHabits.map((habit, index) => (
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
          <h2>No uncompleted habits. Time to improve your habits!</h2>
        )}
        {completedHabits.length > 0 && (
          <>
            <h1 className="text-lg font-semibold">Completed Habits:</h1>
            {completedHabits.map((habit, index) => (
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
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Main;
