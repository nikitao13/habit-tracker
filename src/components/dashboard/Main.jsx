function Main({ user }) {
  return (
    <div className="mx-auto mt-4 flex w-full max-w-[1600px] flex-grow flex-col bg-gray-100 px-4 py-4">
      <h1 className="text-xl font-semibold tracking-tight text-black/85">
        Welcome, {user.displayName}!
      </h1>
    </div>
  );
}

export default Main;
