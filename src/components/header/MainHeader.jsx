function MainHeader() {
  const headerStyles = {
    hover: "hover:opacity-70 transition-hover duration-300 ease-in-out"
  };

  const { hover } = headerStyles;

  return (
    <header className="select-none  antialiased flex items-center justify-between gap-10 px-4 w-full h-[5vh] tracking-wide">
      <h1 className="pr-1 text-4xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
        habitly
      </h1>
      <nav>
        <ul className="flex gap-2 text-sm">
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
      <div className="bg-white px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 hover:scale-105 hover:opacity-90 transition-all duration-400 ease-in-out hover:cursor-pointer">
        <h2 className="text-white font-semibold tracking-tight">
          Get started
        </h2>
      </div>
    </header>
  );
}

export default MainHeader;
