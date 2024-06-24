function Console({ user, toggleAddState, setView }) {
  return (
    <>
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
          New Habit
        </button>
        <button
          onClick={() => setView("all")}
          className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-500 px-3 py-1 text-sm font-extralight text-white transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:opacity-90"
        >
          All
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
    </>
  );
}

export default Console;
