import { RiDoubleQuotesL } from "react-icons/ri";
import ReadOnlyRating from "./Rating";

function Reviews() {
  const clientStyles = {
    name: "text-sm sm:text-2xl font-medium tracking-tight mb-0.5 sm:mb-2",
    text: "text-xs sm:text-sm leading-5 sm:leading-6 tracking-wide mb-0.5 sm:mb-2",
    place: "text-gradient font-semibold text-xs sm:text-lg h-sm:text-base tracking-wide",
    icon: "text-purple-hbt text-2xl sm:text-5xl h-sm:text-4xl scale-x-[-1]",
    container: "flex flex-col w-[50%] sm:w-[25%] items-center text-center px-4 sm:px-0",
  };

  return (
    <section className="flex h-[25vh] w-full select-none flex-col bg-white sm:h-[25vh]">
      <div className="flex justify-center gap-0 sm:gap-14">
        <div className={clientStyles.container}>
          <RiDoubleQuotesL className={clientStyles.icon} />
          <h1 className={clientStyles.name}>John Smith</h1>
          <p className={clientStyles.text}>
            I love the rewards system. It keeps me motivated to stay on track.
          </p>
          <ReadOnlyRating />
          <p className={clientStyles.place}>Abbotsford</p>
        </div>
        <div className={clientStyles.container}>
          <RiDoubleQuotesL className={clientStyles.icon} />
          <h1 className={clientStyles.name}>Jane Doe</h1>
          <p className={clientStyles.text}>
            This app has transformed the way I approach my daily routines!
          </p>
          <ReadOnlyRating />
          <p className={clientStyles.place}>Five Dock</p>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
