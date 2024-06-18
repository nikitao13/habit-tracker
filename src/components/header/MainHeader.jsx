function MainHeader() {
  const headerStyles = {
    hover: "hover:opacity-70 transition-hover duration-300 ease-in-out hover:text-blue-500"
  };

  const { hover } = headerStyles;

  return (
    <header className="select-none antialiased flex items-center justify-between px-2 sm:px-6 w-[100vw] sm:w-full h-[5vh] tracking-wide pt-4">
      <h1 className={`sm:text-4xl text-xl pr-1 font-extrabold tracking-tighter text-gradient ${hover}`}>
        habitly
      </h1>
      <nav>
        <ul className="flex gap-4 text-[0.60rem] sm:text-sm">
          <li>
            <a
              href="#"
              className={hover}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className={hover}
            >
              Login
            </a>
          </li>
          <li>
            <a
              href="#"
              className={hover}
            >
              Leaderboard
            </a>
          </li>
        </ul>
      </nav>
      <div className="px-2 py-1.5 sm:px-4 sm:py-2 bg-white whitespace-nowrap rounded-full bg-gradient-to-r from-blue-600 to-purple-500 hover:scale-105 hover:opacity-90 transition-all duration-400 ease-in-out hover:cursor-pointer">
        <h2 className="text-[0.6rem] sm:text-base text-white font-semibold tracking-tight">
          Get started
        </h2>
      </div>
    </header>
  );
}

export default MainHeader;
