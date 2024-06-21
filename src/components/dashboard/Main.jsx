function Main({ user }) {
  return (
    <div className="flex h-[100vh] w-full flex-col bg-blue-hbt">
      <h1>Welcome, {user.displayName}!</h1>
    </div>
  );
}

export default Main;