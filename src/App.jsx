import "./styles/main.css";
import MainHeader from "./components/header/MainHeader";
import BuildHealthy from "./components/main/BuildHealthy";
import GetStarted from "./components/main/GetStarted";
import MainFooter from "./components/footer/MainFooter";

function App() {
  return (
    <div className="wrapper w-full h-[100vh] bg-white overflow-hidden sm:overflow-auto">
      <div className="app-container max-w-[1600px] bg-white h-auto w-full mx-auto">
        <MainHeader />
        <BuildHealthy />
      </div>
      <GetStarted />
      <div className="app-container max-w-[1600px] bg-white h-auto w-full mx-auto">
        <MainFooter />
      </div>
    </div>
  );
}
export default App;
