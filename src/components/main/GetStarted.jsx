function GetStarted() {
  return (
    <section className="select-none antialiased flex flex-col items-center justify-center w-full h-[20vh] sm:h-[50vh] mx-auto bg-gray-100">
      <div className="sm:w-1/2 flex flex-col items-center justify-center gap-4 sm:gap-8">
        <h1 className="text-xl sm:text-4xl font-bold tracking-tight">
          Start tracking habits{" "}
          <span className="underline decoration-purple-hbt">today!</span>
        </h1>
        <p className="text-sm sm:text-base tracking-wide">Get started now!</p>
        <div className="flex items-center justify-center sm:w-[10rem] bg-white px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 hover:scale-105 hover:opacity-90 transition-all duration-300 ease-in-out hover:cursor-pointer">
          <h2 className="text-xs sm:text-base text-white tracking-tight">
            Register for free
          </h2>
        </div>
      </div>
    </section>
  );
}

export default GetStarted;
