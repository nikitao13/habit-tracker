function MainHeader() {
  const headerStyles = {
    hover:
      "hover:opacity-80 transition-hover duration-300 ease-in-out hover:text-gradient hover:font-bold",
    hoverGrow:
      "hover:opacity-80 transition-hover duration-300 ease-in-out hover:font-black hover:cursor-pointer",
  };

  const { hover, hoverGrow } = headerStyles;

  return (
    <header className="flex h-[5vh] w-[100vw] select-none items-center justify-between px-2 pt-4 tracking-wide antialiased sm:w-full sm:px-6">
      <h1
        className={`pr-1 text-xl font-extrabold tracking-tighter text-gradient sm:text-4xl ${hoverGrow}`}
      >
        habitly
      </h1>
      <nav>
        <ul className="flex gap-4 text-[0.60rem] sm:text-sm">
          <li>
            <a href="#" className={hover}>
              About
            </a>
          </li>
          <li>
            <a href="#" className={hover}>
              Login
            </a>
          </li>
          <li>
            <a href="#" className={hover}>
              Leaderboard
            </a>
          </li>
        </ul>
      </nav>
      <div className="transition-hover whitespace-nowrap rounded-full bg-white bg-gradient-to-r from-blue-600 to-purple-500 px-2 py-1.5 duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:opacity-90 sm:px-4 sm:py-2">
        <h2 className="text-[0.6rem] tracking-tight text-white sm:text-base">Get started</h2>
      </div>
    </header>
  );
}

export default MainHeader;
