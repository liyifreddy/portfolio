import Link from "next/link";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#f5e7cb] text-black">
      <nav className="p-4">
        <div className="container mx-auto flex justify-center items-center">
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className="text-lg hover:text-amber-700 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-lg hover:text-amber-700 transition-colors">
                About Me
              </Link>
            </li>
            <li>
              <Link href="/experience" className="text-lg font-bold">
                Experience
              </Link>
            </li>
            <li>
              <Link href="/project" className="text-lg hover:text-amber-700 transition-colors">
                Project
              </Link>
            </li>
            <li>
              <Link href="/skill" className="text-lg hover:text-amber-700 transition-colors">
                Skill
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Experience</h1>
        
        {/* 这里添加你的经验内容 */}
        <div className="max-w-3xl">
          <p className="text-lg mb-4">
            Content will be filled here...
          </p>
        </div>
      </div>
    </main>
  );
}