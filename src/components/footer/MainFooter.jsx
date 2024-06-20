import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function MainFooter() {
  return (
    <footer className="item-center flex h-[3vh] justify-center px-2 py-0 text-[0.7rem] sm:h-[5vh] sm:text-base">
      <div className="flex h-full w-[100%] items-center justify-start gap-2">
        <p className="tracking-wider text-gradient">©2024 Nikitao13</p>
        <a href="https://github.com/nikitao13" rel="noopener noreferrer" target="_blank">
          <FaGithub className="transition-hover duration-300 ease-in-out hover:opacity-70" />
        </a>
        <a href="https://x.com/lvl99str" rel="noopener noreferrer" target="_blank">
          <FaTwitter className="transition-hover text-blue-500 duration-300 ease-in-out hover:opacity-70" />
        </a>
      </div>
    </footer>
  );
}

export default MainFooter;
