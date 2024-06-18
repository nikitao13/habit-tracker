function Benefits() {
  return (
    <section className="select-none antialiased flex items-center w-full h-[30vh] sm:h-[55vh] mx-auto justify-center bg-gray-100">
      <div className="flex flex-col w-[90%] sm:w-1/2 text-left">
        <h1 className="underline decoration-purple-hbt text-xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-4">
          Why track habits?
        </h1>
        <ul className="flex flex-col gap-3 sm:gap-4 tracking-wide text-xs sm:text-lg">
          <li>
            Bring awareness to your daily activities and routines, helping you
            identify areas that need <span className="underline decoration-blue-hbt">improvement</span>. 👀
          </li>
          <li>
            Hold yourself <span className="underline decoration-blue-hbt">accountable</span>, making it more likely you&apos;ll stick
            to your goals. ✅
          </li>
          <li>
            Each small win builds momentum and keeps you <span className="underline decoration-blue-hbt">motivated</span> to continue.
            🚀
          </li>
          <li>
            Breaking down larger goals into smaller, <span className="underline decoration-blue-hbt">managable</span> habits makes
            them less overwhelming. 🎯
          </li>
        </ul>
      </div>
      <div className="w-[0px] sm:w-[30%] bg-white ml-2 h-[0px] sm:h-[60%] mt-4 rounded-lg"></div>
    </section>
  );
}

export default Benefits;
