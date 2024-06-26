function GetStarted({ handleGoogle }) {
  return (
    <section className="mx-auto flex h-[22.5vh] w-full select-none flex-col items-center justify-center pt-2 antialiased sm:h-[40vh] sm:pt-0">
      <div className="flex flex-col items-center justify-center gap-4 sm:w-1/2 sm:gap-6">
        <h1 className="text-xl font-bold tracking-tight sm:text-5xl">
          Start tracking habits <span className="underline decoration-purple-hbt">today!</span>
        </h1>
        <p className="text-sm font-semibold tracking-wide text-gradient sm:text-xl">
          Get started now!
        </p>
        <button
          onClick={handleGoogle}
          className="flex items-center justify-center rounded-full bg-white bg-gradient-to-r from-blue-600 to-purple-500 px-4 py-2 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:opacity-90 sm:w-[12rem]"
        >
          <h2 className="text-xs tracking-tight text-white sm:text-lg">Sign in with Google</h2>
        </button>
      </div>
    </section>
  );
}

export default GetStarted;
