import Link from "next/link";

interface NavigationProps {
  currentPage: "home" | "about" | "experience" | "project" | "skill";
}

export default function Navigation({ currentPage }: NavigationProps) {
  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-center items-center">
        <ul className="flex flex-wrap space-x-4 md:space-x-8 justify-center">
          <li>
            <Link 
              href="/" 
              className={`text-lg ${currentPage === "home" ? "font-bold" : "hover:text-amber-700 transition-colors"}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className={`text-lg ${currentPage === "about" ? "font-bold" : "hover:text-amber-700 transition-colors"}`}
            >
              About Me
            </Link>
          </li>
          <li>
            <Link 
              href="/experience" 
              className={`text-lg ${currentPage === "experience" ? "font-bold" : "hover:text-amber-700 transition-colors"}`}
            >
              Experience
            </Link>
          </li>
          <li>
            <Link 
              href="/project" 
              className={`text-lg ${currentPage === "project" ? "font-bold" : "hover:text-amber-700 transition-colors"}`}
            >
              Project
            </Link>
          </li>
          <li>
            <Link 
              href="/skill" 
              className={`text-lg ${currentPage === "skill" ? "font-bold" : "hover:text-amber-700 transition-colors"}`}
            >
              Skill
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}