// src/components/HabitForm.jsx

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const HabitForm = ({ onSubmit }) => {
  const [newHabit, setNewHabit] = useState({
    name: "",
    duration: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const habit = {
      _id: uuidv4(),
      name: newHabit.name,
      duration: parseInt(newHabit.duration, 10),
      completed: false,
    };
    onSubmit(habit);
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

  return (
    <form
      className="mt-4 flex w-[8rem] flex-col gap-2 text-sm sm:w-[10rem]"
      onSubmit={handleFormSubmit}
    >
      <input
        className="p-1"
        name="name"
        placeholder="Habit Name"
        value={newHabit.name}
        onChange={handleInputChange}
        required
      />
      <input
        className="p-1"
        name="duration"
        placeholder="Duration"
        value={newHabit.duration}
        onChange={handleInputChange}
        required
      />
      <button
        type="submit"
        className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-500 px-3 py-1 text-xs font-extralight text-white transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:opacity-90 sm:text-sm"
      >
        Add Habit
      </button>
    </form>
  );
};

export default HabitForm;
