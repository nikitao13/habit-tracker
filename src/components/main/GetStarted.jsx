function GetStarted() {
  return (
    <section className="antialiased flex flex-col items-center justify-center w-full h-[25vh] mx-auto bg-gray-100">
      <div className="w-1/2 flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold tracking-tight">Start tracking habits today!</h1>
        <p className="tracking-wide">Get started now!</p>
        <div className="flex items-center justify-center w-[10rem] bg-white px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 hover:scale-105 hover:opacity-90 transition-all duration-400 ease-in-out hover:cursor-pointer">
        <h2 className="text-white tracking-tight">Register for free</h2>
        </div>
      </div>
    </section>
  );
}

export default GetStarted;
