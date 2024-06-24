import MainHeader from "../header/MainHeader";
import MainFooter from "../footer/MainFooter";

const LoadingSkeleton = () => {
  return (
    <div className="flex h-[100vh] w-full flex-col">
      <header className="h-[5vh] w-full">
        <MainHeader />
      </header>
      <div className="flex flex-grow w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-gray-600"></div>
      </div>
      <footer className="h-[3vh] w-full">
        <MainFooter />
      </footer>
    </div>
  );
};

export default LoadingSkeleton;
