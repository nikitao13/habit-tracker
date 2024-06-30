import MainHeader from "../header/MainHeader";
import Main from "./Main";
import MainFooter from "../footer/MainFooter";

function Dashboard({ user, handleLogout, setUser }) {
  return (
    <div className="mx-auto h-[100svh] w-full max-w-[1600px] bg-white">
      <MainHeader user={user} handleLogout={handleLogout} />
      <Main user={user} setUser={setUser} />
      <MainFooter />
    </div>
  );
}

export default Dashboard;
