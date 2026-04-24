import {
  FaBell,
  FaBook,
  FaBox,
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaCode,
  FaCubes,
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaHome,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPlus,
  FaRegBookmark,
  FaRegCommentDots,
  FaRegEdit,
  FaRegStar,
  FaRocket,
  FaSearch,
  FaSignOutAlt,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import { FiChevronDown, FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const sideNav = [
  ["Overview", FaHome, ""],
  ["Repositories", FaBook, "71"],
  ["Projects", FaCubes, "18"],
  ["Packages", FaBox, "8"],
  ["Stars", FaRegStar, "132"],
  ["Followers", FaUsers, "124"],
  ["Following", FaUsers, "86"],
  ["Discussions", FaRegCommentDots, ""],
  ["Saved", FaRegBookmark, ""],
  ["Activity", FaGlobe, ""],
];

const pinnedRepos = [
  ["airflow", "Apache Airflow – A platform to programmatically author, schedule, and monitor workflows", "Python", "24.6k", "5.1k"],
  ["meshery", "Meshery, the cloud native manager", "JavaScript", "8.7k", "1.2k"],
  ["layer5", "Layer5, expect more from your infrastructure", "JavaScript", "4.3k", "742"],
  ["Website_SAST", "SASTxNST/Website_SAST", "JavaScript", "2.1k", "341"],
  ["Nebula_Backed", "SASTxNST/Nebula_Backed", "Python", "1.8k", "219"],
  ["Property_Price_Prediction", "ML model for property price prediction", "Jupyter Notebook", "1.2k", "158"],
];

const heatmap = Array.from({ length: 230 }, (_, i) => (i * 7) % 5);

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-[#020611] text-white">
      <header className="fixed left-0 right-0 top-0 z-50 flex h-[70px] items-center border-b border-slate-800 bg-[#030814]/95 px-5 backdrop-blur">
        <div className="flex w-[260px] items-center gap-3">
          <div className="text-3xl">🪐</div>
          <h1 className="text-2xl font-black tracking-wide">YANTRIX</h1>
        </div>

        <div className="hidden h-10 w-[620px] items-center gap-3 rounded-xl border border-slate-800 bg-[#050b15] px-4 lg:flex">
          <FaSearch className="text-slate-500" />
          <input
            placeholder="Search datasets, missions, code, discussions..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500"
          />
          <kbd className="rounded border border-slate-700 px-2 text-slate-400">/</kbd>
        </div>

        <nav className="ml-auto hidden items-center gap-9 text-sm font-semibold text-slate-300 xl:flex">
          {["Explore", "Datasets", "Orbital IDE", "Models", "Missions", "Challenges"].map(
            (item) => (
              <button key={item} className="hover:text-white">
                {item}
              </button>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-5 xl:ml-8">
          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-bold">
            <FaPlus /> New <FiChevronDown />
          </button>
          <FaBell className="text-xl text-slate-300" />
          <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-700 font-bold">
            {user?.name?.charAt(0) ?? "K"}
          </div>
        </div>
      </header>

      <aside className="fixed left-0 top-[70px] hidden h-[calc(100vh-70px)] w-[280px] border-r border-slate-800 bg-[#050b15] px-5 py-7 xl:block">
        <nav className="space-y-3">
          {sideNav.map(([label, Icon, count], index) => (
            <button
              key={label}
              className={`flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left text-sm font-semibold ${
                index === 0
                  ? "border border-violet-500/60 bg-violet-500/15 text-violet-300"
                  : "text-slate-300 hover:bg-white/[0.04]"
              }`}
            >
              <Icon />
              <span className="flex-1">{label}</span>
              {count && (
                <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs">
                  {count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-8 border-t border-slate-800 pt-7">
          <h3 className="mb-4 flex items-center gap-3 text-sm font-bold text-slate-300">
            <FaGlobe /> Organizations
          </h3>
          <div className="flex gap-3">
            {["S", "A", "M", "Y"].map((item) => (
              <div
                key={item}
                className="grid h-9 w-9 place-items-center rounded-lg bg-slate-800 font-bold text-cyan-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </aside>

      <section className="pt-[88px] xl:ml-[280px]">
        <div className="grid gap-5 px-5 pb-10 xl:grid-cols-[1fr_380px] xl:px-6">
          <div className="space-y-5">
            <section className="overflow-hidden rounded-xl border border-slate-800 bg-[#07101d]">
              <div className="relative px-6 py-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.28),transparent_24%),radial-gradient(circle_at_55%_10%,rgba(139,92,246,0.25),transparent_22%),linear-gradient(135deg,#07101d_0%,#0b1931_50%,#07101d_100%)]" />
                <div className="absolute bottom-0 right-0 h-40 w-[620px] rounded-tl-full bg-[radial-gradient(ellipse_at_top,rgba(70,132,255,0.35),rgba(20,39,82,0.7)_40%,transparent_70%)]" />
                <div className="absolute right-32 top-12 hidden text-7xl lg:block">🛰️</div>

                <div className="relative flex flex-col gap-6 md:flex-row">
                  <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-full border-4 border-slate-700 bg-slate-800">
                    <img
                      src="https://api.dicebear.com/9.x/personas/svg?seed=Kavya"
                      alt="profile"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-4 right-3 h-5 w-5 rounded-full border-4 border-[#07101d] bg-green-500" />
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center gap-3">
                      <h2 className="text-3xl font-black">{user?.name ?? "Kavya Katal"}</h2>
                      <span className="rounded bg-violet-600 px-2 py-1 text-xs font-bold">
                        PRO
                      </span>
                    </div>

                    <p className="mt-1 text-slate-300">
                      {user?.githubId ? `@${user.githubId}` : "kavyakatal"}
                    </p>

                    <div className="mt-4 space-y-2 text-sm text-slate-300">
                      <p className="flex items-center gap-3">
                        <FaUsers /> he/him
                      </p>
                      <p className="flex items-center gap-3">
                        <FaBuilding /> Student at Newton School of Technology
                      </p>
                      <p className="flex items-center gap-3">
                        <FaMapMarkerAlt /> Faridabad, Haryana, India
                      </p>
                      <p className="flex items-center gap-3">
                        <FaCalendarAlt /> Joined on 24 Apr 2024
                      </p>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <button className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-bold hover:bg-slate-700">
                        <FaRegEdit className="mr-2 inline" />
                        Edit profile
                      </button>
                      <button className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-bold hover:bg-slate-700">
                        Customize profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="rounded-lg bg-red-500/10 px-4 py-2 text-sm font-bold text-red-300 hover:bg-red-500/20"
                      >
                        <FaSignOutAlt className="mr-2 inline" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>

                <div className="relative mt-7 grid grid-cols-2 gap-3 rounded-lg border border-slate-800 bg-[#07101d]/80 p-4 md:grid-cols-4 xl:grid-cols-7">
                  {[
                    ["1,205", "Contributions", FaCubes],
                    ["26", "Repositories", FaBook],
                    ["18", "Projects", FaCubes],
                    ["8", "Packages", FaBox],
                    ["132", "Stars received", FaStar],
                    ["124", "Followers", FaUsers],
                    ["86", "Following", FaUsers],
                  ].map(([num, label, Icon]) => (
                    <div key={String(label)} className="flex items-center gap-3 border-slate-800 xl:border-r last:border-r-0">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-violet-500/10 text-violet-400">
                        <Icon />
                      </div>
                      <div>
                        <p className="font-bold">{num}</p>
                        <p className="text-xs text-slate-400">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-slate-800 bg-[#07101d] p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">Pinned</h2>
                <button className="text-sm font-semibold text-blue-400">Customize pins</button>
              </div>

              <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {pinnedRepos.map(([name, desc, lang, stars, forks]) => (
                  <div key={name} className="rounded-lg border border-slate-800 bg-[#050b15] p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <FaBook className="text-slate-400" />
                      <h3 className="font-bold text-blue-400">{name}</h3>
                      <span className="rounded-full border border-slate-700 px-2 text-xs text-slate-400">
                        Public
                      </span>
                      <FiMoreVertical className="ml-auto text-slate-500" />
                    </div>
                    <p className="min-h-12 text-sm text-slate-400">{desc}</p>
                    <div className="mt-4 flex items-center gap-5 text-sm text-slate-400">
                      <span>{lang === "JavaScript" ? "🟡" : lang === "Python" ? "🔵" : "🟠"} {lang}</span>
                      <span>☆ {stars}</span>
                      <span>⑂ {forks}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1.8fr_1fr]">
                <div>
                  <h3 className="mb-4 text-lg font-bold">
                    1,205 contributions in the last year
                  </h3>
                  <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto">
                    {heatmap.map((level, index) => (
                      <div
                        key={index}
                        className={`h-3 w-3 rounded-sm ${
                          level === 0
                            ? "bg-slate-800"
                            : level === 1
                            ? "bg-indigo-950"
                            : level === 2
                            ? "bg-indigo-800"
                            : level === 3
                            ? "bg-indigo-600"
                            : "bg-violet-400"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="mb-4 text-lg font-bold">Contribution summary</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {[
                        ["67%", "Commits"],
                        ["18%", "Issues"],
                        ["8%", "Code review"],
                        ["7%", "Discussions"],
                      ].map(([num, label]) => (
                        <div key={label} className="rounded-lg border border-slate-800 bg-[#050b15] p-4">
                          <p className="text-xl font-black">{num}</p>
                          <p className="text-sm text-slate-400">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-bold">Recent activity</h3>
                  <div className="space-y-5 text-sm text-slate-400">
                    {[
                      ["2h ago", "Pushed to airflow", "Fix DAG parsing issue in scheduler"],
                      ["1d ago", "Created dataset", "NOAA-21 Telemetry Stream v2.1"],
                      ["3d ago", "Opened discussion", "Best practices for orbit propagation"],
                      ["5d ago", "Starred meshery/meshery", ""],
                    ].map(([time, title, sub]) => (
                      <div key={title} className="grid grid-cols-[60px_1fr] gap-3">
                        <span>{time}</span>
                        <div>
                          <p className="font-semibold text-slate-300">{title}</p>
                          {sub && <p className="mt-1 text-xs">{sub}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <div className="rounded-xl border border-slate-800 bg-[#07101d] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">About</h2>
                <FaRegEdit className="text-slate-400" />
              </div>
              <p className="text-sm leading-6 text-slate-300">
                Enthusiast of Artificial Intelligence and Machine Learning with a
                passion for space technology and open source.
              </p>

              <div className="mt-5 space-y-3 text-sm text-slate-400">
                <p className="flex items-center gap-3">
                  <FaEnvelope /> {user?.email ?? "kavyakatal09@gmail.com"}
                </p>
                <p className="flex items-center gap-3">
                  <FaLinkedin /> linkedin.com/in/kavya-katal
                </p>
                <p className="flex items-center gap-3">
                  <FaGithub /> @{user?.githubId ?? "KatalKavya96"}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#07101d] p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">Achievements</h2>
                <button className="text-sm text-violet-400">View all</button>
              </div>
              <div className="flex flex-wrap gap-4 text-4xl">
                {["🛰️", "🚀", "🤖", "🏆", "🧬", "🌟"].map((item) => (
                  <span key={item} className="grid h-14 w-14 place-items-center rounded-full bg-slate-800">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#07101d] p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">Organizations</h2>
                <button className="text-sm text-violet-400">View all</button>
              </div>
              <div className="flex gap-4">
                {["S", "A", "M", "Y"].map((item) => (
                  <div key={item} className="grid h-14 w-14 place-items-center rounded-lg bg-slate-800 text-xl font-black text-cyan-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#07101d] p-6">
              <h2 className="mb-5 text-lg font-bold">Top languages</h2>
              <div className="mb-5 flex h-3 overflow-hidden rounded-full">
                <div className="w-[54%] bg-blue-500" />
                <div className="w-[24%] bg-yellow-400" />
                <div className="w-[13%] bg-orange-500" />
                <div className="w-[9%] bg-violet-500" />
              </div>
              <div className="space-y-3 text-sm">
                {[
                  ["Python", "54.2%", "bg-blue-500"],
                  ["JavaScript", "23.7%", "bg-yellow-400"],
                  ["Jupyter Notebook", "12.6%", "bg-orange-500"],
                  ["Other", "9.5%", "bg-violet-500"],
                ].map(([lang, percent, color]) => (
                  <div key={lang} className="flex items-center gap-3 text-slate-300">
                    <span className={`h-2 w-2 rounded-full ${color}`} />
                    <span className="flex-1">{lang}</span>
                    <span>{percent}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}