import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function MainFooter() {
  return (
    <footer className="flex items-center justify-center h-[5vh] text-[0.7rem] sm:text-base">
      <div className="justify-center items-center flex h-full w-full gap-2">
        <p className="tracking-wider text-gradient">©2024 Nikitao13</p>
        <a
          href="https://x.com/lvl99str"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaTwitter className="text-blue-500" />
        </a>
        <a
          href="https://github.com/nikitao13"
          rel="noopener noreferrer"
          target="_blank"
        >
        <FaGithub />
        </a>
      </div>
    </footer>
  );
}

export default MainFooter;
