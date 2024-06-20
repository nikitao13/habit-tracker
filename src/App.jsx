import "./styles/main.css";
import MainHeader from "./components/header/MainHeader";
import BuildHealthy from "./components/main/BuildHealthy";
import Benefits from "./components/main/Benefits";
import CustomerFeedback from "./components/main/CustomerFeedback";
import Reviews from "./components/main/Reviews";
import GetStarted from "./components/main/GetStarted";
import HowItWorks from "./components/main/HowItWorks";
import MainFooter from "./components/footer/MainFooter";

function App() {
  return (
    <main className="wrapper h-[100vh] w-full overflow-auto bg-white">
      <div className="app-container mx-auto h-auto w-full max-w-[1600px] bg-white">
        <MainHeader />
        <BuildHealthy />
      </div>
      <Benefits />
      <div className="app-container mx-auto h-auto w-full max-w-[1600px] bg-white">
        <CustomerFeedback />
        <Reviews />
      </div>
      <HowItWorks />
      <div className="app-container mx-auto h-auto w-full max-w-[1600px] bg-white">
        <GetStarted />
        <MainFooter />
      </div>
    </main>
  );
}
export default App;
