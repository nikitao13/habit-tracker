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
      const fetchedUser = await fetchHabits(user.uid);
      setHabits(fetchedUser.habitList);
      localStorage.setItem(`habits_${user.uid}`, JSON.stringify(fetchedUser.habitList));
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
      const updatedUser = await addHabit(user.uid, newHabit);
      setHabits(updatedUser.habitList);
      localStorage.setItem(`habits_${user.uid}`, JSON.stringify(updatedUser.habitList));
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
      const updatedUser = await deleteHabit(user.uid, habitId);
      setHabits(updatedUser.habitList);
      localStorage.setItem(`habits_${user.uid}`, JSON.stringify(updatedUser.habitList));
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
      const updatedUser = await markHabitAsComplete(user.uid, habitId);
      setHabits(updatedUser.habitList);
      localStorage.setItem(`habits_${user.uid}`, JSON.stringify(updatedUser.habitList));
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
    <section className="mx-auto flex h-[92svh] w-full max-w-[1600px] flex-col bg-white p-4 pt-6 sm:p-6">
      <Console user={user} toggleAddState={toggleAddState} setView={setView} />
      {addState && <HabitForm onSubmit={handleAddHabit} />}
      <div className="mt-4 flex max-w-fit flex-col gap-1 sm:gap-2">
        <h1 className="text-base font-semibold sm:text-lg">User's Habits:</h1>
        {uncompletedHabits.length > 0 &&
          uncompletedHabits.map((habit, index) => (
            <div key={index} className="w-full">
              <h2 className="text-sm font-semibold tracking-wider sm:text-base">{habit.name}</h2>
              <p className="text-sm sm:text-base">Duration: {habit.duration} minutes</p>
              <p className="text-sm sm:text-base">
                Status: {habit.completed ? "Completed" : "Pending"}
              </p>
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
        {view !== "pending" && completedHabits.length > 0 && (
          <>
            {completedHabits.map((habit, index) => (
              <div key={index} className="w-full">
                <h2 className="text-sm font-semibold tracking-wider sm:text-base">{habit.name}</h2>
                <p className="text-sm sm:text-base">Duration: {habit.duration} minutes</p>
                <p className="text-sm sm:text-base">
                  Status: {habit.completed ? "Completed" : "Pending"}
                </p>
                <div className="mb-4 flex gap-2">
                  <FaCheck
                    className={`text-lg sm:text-xl ${habit.completed ? "text-gray-400" : "text-green-600 hover:cursor-pointer"}`}
                    onClick={() => !habit.completed && handleCompleteHabit(habit._id)}
                  />
                  <FaDeleteLeft
                    className="text-lg text-red-600 hover:cursor-pointer sm:text-xl"
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
