function Main({ user }) {
  return (
    <div className="flex flex-grow mt-4 px-4 py-4 w-full flex-col bg-gray-100 max-w-[1600px] mx-auto ">
      <h1 className="text-xl font-semibold tracking-tight text-black/85">Welcome, {user.displayName}!</h1>
    </div>
  );
}

export default Main;
