function HowItWorks() {
  return (
    <section className="mx-auto flex h-[25vh] w-full select-none flex-col justify-center bg-gray-100 px-4 antialiased sm:h-[40vh]">
      <div className="mx-auto flex h-[50%] w-full max-w-[1600px] px-4">
        <>
          <ul className="flex w-1/2 flex-col justify-center gap-3 text-xs tracking-wide sm:gap-4 sm:text-lg">
            <h1 className="mx-auto mt-0 h-auto w-full max-w-[1600px] justify-center px-0 text-3xl font-bold tracking-tight underline decoration-purple-hbt">
              How it works:
            </h1>
            <li>
              - <strong>[Sign up]</strong> Create a{" "}
              <span className="font-semibold text-gradient">free</span> account to get started.
            </li>
            <li>
              - <strong>[Add your habits]</strong> Customize your habit list to match your{" "}
              <span className="font-semibold text-gradient">goals.</span>
            </li>
            <li>
              - <strong>[Track daily]</strong> Log your{" "}
              <span className="font-semibold text-gradient">progress</span> every day.
            </li>
            <li>
              - <strong>[Earn rewards]</strong> Earn points and badges as you achieve your{" "}
              <span className="font-semibold text-gradient">milestones</span>.
            </li>
          </ul>
        </>
        <>
          <ul className="flex w-1/2 flex-col justify-center gap-3 text-xs tracking-wide sm:gap-4 sm:text-lg">
            <h1 className="mx-auto mt-0 h-auto w-full max-w-[1600px] justify-center px-0 text-3xl font-bold tracking-tight underline decoration-purple-hbt">
              Features:
            </h1>
            <li>
              📅 <strong>[Daily habits ]</strong> Keep track of your daily habits with an{" "}
              <span className="font-semibold text-gradient">easy-to-use interface.</span>
            </li>
            <li>
              🔔 <strong>[Reminders]</strong>{" "}
              <span className="font-semibold text-gradient">Set reminders</span> to ensure you never
              miss a habit.
            </li>
            <li>
              📈 <strong>[Progress charts]</strong> Visualize your progress with{" "}
              <span className="font-semibold text-gradient">detailed charts and graphs.</span>
            </li>
            <li>
              🏆 <strong>[Rewards system]</strong> Earn{" "}
              <span className="font-semibold text-gradient">points and rewards</span> as you
              complete your habits.
            </li>
          </ul>
        </>
      </div>
    </section>
  );
}

export default HowItWorks;
