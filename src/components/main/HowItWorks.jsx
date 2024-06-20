function HowItWorks() {
  return (
    <section className="mx-auto flex h-[65vh] w-full select-none flex-col bg-white px-4 py-4 antialiased sm:mt-0 sm:h-[45vh] sm:justify-center sm:bg-gray-100 sm:py-0 sm:pb-0">
      <div className="mx-auto flex h-[50%] w-full max-w-[1600px] flex-col gap-4 px-0 sm:flex sm:flex-row sm:gap-0 sm:px-4">
        <>
          <ul className="flex w-full flex-col justify-center gap-2 text-[0.8rem] tracking-wide sm:w-1/2 sm:gap-4 sm:text-xl">
            <h1 className="mx-auto mt-2 h-auto w-full max-w-[1600px] justify-center px-0 text-xl font-bold tracking-tight underline decoration-purple-hbt sm:mt-0 sm:text-4xl">
              How it works:
            </h1>
            <li>
              💻 <strong className="opacity-90">[Sign up]</strong>
              <br /> Create a <span className="font-semibold text-gradient">free</span> account to
              get started.
            </li>
            <li>
              📝 <strong className="opacity-90">[Add your habits]</strong>
              <br /> Customize your habit list to match your{" "}
              <span className="font-semibold text-gradient">goals.</span>
            </li>
            <li>
              👀 <strong className="opacity-90">[Track daily]</strong>
              <br /> Log your <span className="font-semibold text-gradient">progress</span> every
              day.
            </li>
            <li>
              🏅 <strong className="opacity-90">[Earn rewards]</strong>
              <br /> Earn points and badges as you achieve your{" "}
              <span className="font-semibold text-gradient">milestones</span>.
            </li>
          </ul>
        </>
        <>
          <ul className="flex w-full flex-col justify-center gap-3 text-[0.8rem] tracking-wide sm:w-1/2 sm:gap-4 sm:text-xl">
            <h1 className="mx-auto mt-0 h-auto w-full max-w-[1600px] justify-center px-0 text-xl font-bold tracking-tight underline decoration-purple-hbt sm:text-4xl">
              Features:
            </h1>
            <li>
              📅 <strong className="opacity-90">[Daily habits]</strong>
              <br /> Keep track of your daily habits with an{" "}
              <span className="font-semibold text-gradient">easy-to-use interface.</span>
            </li>
            <li>
              🔔 <strong className="opacity-90">[Reminders]</strong>
              <br /> <span className="font-semibold text-gradient">Set reminders</span> to ensure
              you never miss a habit.
            </li>
            <li>
              📈 <strong className="opacity-90">[Progress charts]</strong>
              <br /> Visualize your progress with{" "}
              <span className="font-semibold text-gradient">detailed charts and graphs.</span>
            </li>
            <li>
              🏆 <strong className="opacity-90">[Rewards system]</strong>
              <br /> Earn <span className="font-semibold text-gradient">points and rewards</span> as
              you complete your habits.
            </li>
          </ul>
        </>
      </div>
    </section>
  );
}

export default HowItWorks;
