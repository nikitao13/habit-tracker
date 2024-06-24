import MainHeader from "../header/MainHeader";
import Main from "./Main";
import MainFooter from "../footer/MainFooter";

function Dashboard({ user, handleLogout }) {
  return (
    <div className="mx-auto h-[100svh] w-full max-w-[1600px] bg-white">
      <MainHeader user={user} handleLogout={handleLogout} />
      <Main user={user} />
      <MainFooter />
    </div>
  );
}

export default Dashboard;
