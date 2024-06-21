import MainHeader from "../header/MainHeader";
import Main from "./Main";
import MainFooter from "../footer/MainFooter";

function Dashboard({ user, handleLogout }) {
  return (
    <div className="flex h-[100vh] w-full flex-col">
      <MainHeader user={user} handleLogout={handleLogout} />
      <Main user={user} />
      <MainFooter />
    </div>
  );
}

export default Dashboard;
