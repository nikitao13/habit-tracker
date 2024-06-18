import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function MainFooter() {
  return (
    <footer className="flex item-center justify-center h-[5vh] py-0 text-[0.7rem] sm:text-base">
      <div className="justify-center items-center flex h-full w-[90%] gap-2">
        <p className="tracking-wider text-gradient">©2024 Nikitao13</p>
        <a
          href="https://github.com/nikitao13"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaGithub className="hover:opacity-70 transition-hover duration-300 ease-in-out" />
        </a>
        <a
          href="https://x.com/lvl99str"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaTwitter className="text-blue-500 hover:opacity-70 transition-hover duration-300 ease-in-out" />
        </a>
      </div>
    </footer>
  );
}

export default MainFooter;
