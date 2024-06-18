import "./styles/main.css";
import MainHeader from "./components/header/MainHeader";
import BuildHealthy from "./components/main/BuildHealthy";
import GetStarted from "./components/main/GetStarted";

function App() {
  return (
    <div className="wrapper w-full h-[100vh] bg-white">
      <div className="app-container max-w-[1024px] bg-white h-auto w-full mx-auto">
        <MainHeader />
        <BuildHealthy />
      </div>
      <GetStarted />
    </div>
  );
}
export default App;
