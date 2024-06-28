function Console({ user, toggleAddState, setView }) {
  return (
    <>
      <h1 className="text-base font-semibold tracking-tight text-black/85 sm:text-xl">
        Welcome, {user.name}!
      </h1>
      <h2 className="text-sm sm:text-base">Total Points: {user.points}</h2>
      <h2 className="text-sm sm:text-base">Habits Completed: 0</h2>
      <h2 className="text-sm sm:text-base">Daily Score: 0</h2>
      <div className="mt-4 flex gap-2 sm:mt-2 sm:gap-4">
        <button
          onClick={toggleAddState}
          className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-500 px-3 py-1 text-xs font-extralight text-white transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:opacity-90 sm:text-sm"
        >
          New Habit
        </button>
        <button
          onClick={() => setView("all")}
          className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-500 px-3 py-1 text-sm font-extralight text-white transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:opacity-90 sm:text-sm"
        >
          All
        </button>
        <button
          onClick={() => setView("pending")}
          className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-500 px-3 py-1 text-sm font-extralight text-white transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:opacity-90 sm:text-sm"
        >
          Pending
        </button>

        <button
          onClick={() => setView("completed")}
          className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-500 px-3 py-1 text-sm font-extralight text-white transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:opacity-90 sm:text-sm"
        >
          Completed
        </button>
      </div>
    </>
  );
}

export default Console;
