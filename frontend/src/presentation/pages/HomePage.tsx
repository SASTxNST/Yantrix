import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaBook,
  FaBox,
  FaBriefcase,
  FaCheckSquare,
  FaCode,
  FaComments,
  FaDatabase,
  FaHome,
  FaPlus,
  FaRegUserCircle,
  FaRocket,
  FaSearch,
  FaTrophy,
  FaUserFriends,
} from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const navItems = [
  ["Home", FaHome, true],
  ["Datasets", FaCheckSquare],
  ["Orbital IDE", FaCode],
  ["Models & Embeddings", FaBox],
  ["Missions", FaRocket],
  ["Research Vault", FaBriefcase],
  ["Challenges", FaTrophy],
  ["Discussions", FaComments],
  ["Docs", FaBook],
  ["Organizations", FaUserFriends],
] as const;

const modules = [
  ["Datasets", "12.4K+", FaDatabase, "violet"],
  ["Orbital IDE", "Cloud Sandbox", FaCode, "green"],
  ["Models", "& Embeddings", FaBox, "blue"],
  ["Missions", "Active Logs", FaRocket, "cyan"],
  ["Challenges", "56 Live", FaTrophy, "amber"],
  ["Research Vault", "Papers & Code", FaBriefcase, "purple"],
  ["Discussions", "Community", FaComments, "cyan"],
] as const;

export function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#020611] text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-[280px] flex-col border-r border-slate-800/90 bg-[#030814] px-5 py-7 xl:flex">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 text-left"
        >
          <div className="text-4xl">🪐</div>
          <h1 className="text-3xl font-black tracking-wide">YANTRIX</h1>
        </button>

        <nav className="mt-9 flex-1 space-y-3 overflow-y-auto pb-6 pr-1">
          {navItems.map(([label, Icon, active]) => (
            <button
              key={label}
              className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-[16px] transition ${
                active
                  ? "border border-violet-500/70 bg-blue-900/40 text-white"
                  : "text-slate-300 hover:bg-white/[0.04]"
              }`}
            >
              <Icon className={active ? "text-blue-400" : "text-slate-300"} />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-xl border border-blue-500/20 bg-blue-950/40 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-violet-300">Upgrade to Pro</h3>
            <span className="text-2xl">🚀</span>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            Unlock more compute, private spaces and perks.
          </p>

          <button className="mt-5 w-full rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 py-3 font-bold">
            Upgrade Now
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <section className="min-h-screen px-5 py-6 xl:ml-[280px] xl:px-10">
        {/* Topbar */}
        <header className="flex items-center gap-5">
          <div className="hidden h-12 max-w-[700px] flex-1 items-center gap-4 rounded-xl border border-slate-800 bg-[#050b15] px-5 lg:flex">
            <FaSearch className="text-slate-500" />
            <input
              placeholder="Search datasets, missions, code, discussions..."
              className="flex-1 bg-transparent outline-none placeholder:text-slate-500"
            />
            <kbd className="rounded-md border border-slate-800 bg-[#0b1220] px-3 py-1 text-slate-300">
              /
            </kbd>
          </div>

          <div className="ml-auto flex items-center gap-5">
            <button className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#050b15] px-5 py-3 font-semibold">
              <FaPlus />
              New
              <FiChevronDown />
            </button>

            <FaBell className="text-2xl text-slate-300" />

            <button
              onClick={() => navigate("/profile")}
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-700 bg-slate-800 transition hover:scale-105 hover:border-violet-500"
            >
              <FaRegUserCircle className="text-2xl" />
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-violet-500/70 bg-[#050b15]">
          <div className="relative min-h-[360px] px-8 py-14 md:px-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(59,130,246,0.35),transparent_24%),radial-gradient(circle_at_55%_10%,rgba(139,92,246,0.3),transparent_22%),linear-gradient(135deg,#050b15_0%,#07172d_48%,#020611_100%)]" />

            <div className="absolute bottom-0 right-0 h-64 w-[820px] rounded-tl-full bg-[radial-gradient(ellipse_at_top,rgba(70,132,255,0.45),rgba(20,39,82,0.8)_35%,transparent_70%)]" />

            <div className="absolute right-28 top-14 hidden text-8xl opacity-80 lg:block">
              🛸
            </div>

            <div className="relative max-w-xl">
              <h2 className="text-5xl font-black leading-tight">
                One Platform.
                <br />
                <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Infinite Possibilities.
                </span>
              </h2>

              <p className="mt-5 text-xl leading-8 text-slate-300">
                Everything you need to build, simulate, research and collaborate
                in space exploration.
              </p>

              <div className="mt-8 flex max-w-xl items-center gap-4 rounded-xl border border-slate-700 bg-[#07101d]/80 px-5 py-4 backdrop-blur">
                <FaSearch className="text-slate-400" />
                <input
                  placeholder="Search datasets, missions, code, discussions..."
                  className="flex-1 bg-transparent outline-none placeholder:text-slate-500"
                />
                <kbd className="rounded-md bg-slate-800 px-3 py-1 text-slate-300">
                  /
                </kbd>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-7">
          {modules.map(([title, sub, Icon, color]) => (
            <div
              key={title}
              className="rounded-xl border border-slate-800 bg-[#050b15] p-7 transition hover:border-violet-500/60"
            >
              <div
                className={`mb-6 grid h-14 w-14 place-items-center rounded-xl text-3xl ${
                  color === "violet"
                    ? "bg-violet-500/15 text-violet-400"
                    : color === "green"
                    ? "bg-emerald-500/15 text-emerald-400"
                    : color === "blue"
                    ? "bg-blue-500/15 text-blue-400"
                    : color === "amber"
                    ? "bg-amber-500/15 text-amber-400"
                    : color === "purple"
                    ? "bg-purple-500/15 text-purple-400"
                    : "bg-cyan-500/15 text-cyan-400"
                }`}
              >
                <Icon />
              </div>

              <h3
                className={`text-lg font-bold ${
                  title === "Challenges" ? "text-amber-300" : ""
                }`}
              >
                {title}
              </h3>

              <p className="mt-1 text-slate-400">{sub}</p>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}