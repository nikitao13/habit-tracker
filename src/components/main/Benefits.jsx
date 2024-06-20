function Benefits() {
  return (
    <section className="mx-auto flex h-[30vh] w-full select-none items-center bg-white pl-2 antialiased sm:h-[40vh] sm:bg-gray-100">
      <div className="gap-18 mx-auto flex h-full w-[100%] max-w-[1600px] items-center justify-center px-1 sm:px-4">
        <div className="flex w-full flex-col text-left sm:w-3/4">
          <h1 className="mb-2 text-xl font-bold tracking-tight underline decoration-purple-hbt sm:mb-4 sm:text-4xl">
            Why track habits?
          </h1>
          <ul className="flex flex-col gap-3 text-sm tracking-wide sm:gap-4 sm:text-xl">
            <li>
              Bring awareness to your daily activities and routines, helping you identify areas that
              need <span className="underline decoration-blue-hbt">improvement</span>. 👀
            </li>
            <li>
              Hold yourself <span className="underline decoration-blue-hbt">accountable</span>,
              making it more likely you&apos;ll stick to your goals. ✅
            </li>
            <li>
              Each small win builds momentum and keeps you{" "}
              <span className="underline decoration-blue-hbt">motivated</span> to continue. 🚀
            </li>
            <li>
              Breaking down larger goals into smaller,{" "}
              <span className="underline decoration-blue-hbt">managable</span> habits makes them
              less overwhelming. 🎯
            </li>
          </ul>
        </div>
        <div className="flex h-[0px] w-[0px] rounded-lg bg-gray-300 sm:h-[75%] sm:w-[40%]"></div>
      </div>
    </section>
  );
}

export default Benefits;
