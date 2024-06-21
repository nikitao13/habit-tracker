import MainHeader from "../header/MainHeader";
import BuildHealthy from "./BuildHealthy";
import Benefits from "./Benefits";
import CustomerFeedback from "./CustomerFeedback";
import Reviews from "./Reviews";
import GetStarted from "./GetStarted";
import HowItWorks from "./HowItWorks";
import MainFooter from "../footer/MainFooter";

function LandingPage({ handleGoogle }) {
  return (
    <>
      <div className="app-container mx-auto h-auto w-full max-w-[1600px] bg-white">
        <MainHeader handleGoogle={handleGoogle} />
        <BuildHealthy />
      </div>
      <HowItWorks />
      <div className="app-container mx-auto h-auto w-full max-w-[1600px] bg-white">
        <GetStarted handleGoogle={handleGoogle} />
      </div>
      <Benefits />
      <div className="app-container mx-auto h-auto w-full max-w-[1600px] bg-white">
        <CustomerFeedback />
        <Reviews />
        <MainFooter />
      </div>
    </>
  );
}

export default LandingPage;
