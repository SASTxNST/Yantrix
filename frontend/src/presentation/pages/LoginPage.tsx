import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCode,
  FaDatabase,
  FaEnvelope,
  FaGithub,
  FaGoogle,
  FaLock,
  FaMicrosoft,
  FaRegBuilding,
  FaShieldAlt,
  FaTrophy,
} from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [remember, setRemember] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(form);
      navigate("/profile");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen w-full overflow-y-auto bg-[#020611] p-5 text-white">
      <section className="relative min-h-[calc(100vh-40px)] w-full overflow-hidden rounded-[28px] border border-white/15 bg-[#030814]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_43%_22%,rgba(104,65,255,0.44),transparent_25%),radial-gradient(circle_at_8%_12%,rgba(59,130,246,0.18),transparent_24%),linear-gradient(135deg,#020611_0%,#07101e_46%,#020611_100%)]" />
        <div className="absolute inset-0 opacity-45 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:86px_86px]" />
        <div className="absolute -bottom-40 -left-24 h-[360px] w-[920px] rounded-[100%] border-t border-blue-300/60 bg-[radial-gradient(ellipse_at_top,rgba(70,132,255,0.55),rgba(13,24,52,0.86)_34%,rgba(2,6,17,0)_72%)] shadow-[0_-18px_70px_rgba(59,130,246,0.45)]" />

        <div className="relative grid min-h-[calc(100vh-40px)] grid-cols-1 gap-8 px-5 py-8 sm:px-8 lg:px-10 xl:grid-cols-[1.03fr_0.97fr] 2xl:px-14 2xl:py-10">
          <aside className="hidden flex-col justify-between xl:flex">
            <div>
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-500/10 text-3xl">
                  🪐
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-[0.12em]">
                    YANTRIX
                  </h1>
                  <p className="text-sm font-semibold text-violet-400">
                    Build. Simulate. Discover.
                  </p>
                </div>
              </div>

              <div className="mt-16 max-w-[560px]">
                <h2 className="text-[48px] font-black leading-[1.15] 2xl:text-6xl">
                  Your Mission.
                  <br />
                  <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    Our Platform.
                  </span>
                </h2>

                <p className="mt-6 max-w-[500px] text-lg leading-8 text-slate-300">
                  Yantrix is the all-in-one platform for space data,
                  simulations, collaboration, and discoveries that propel
                  humanity forward.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    [
                      FaDatabase,
                      "Space Datasets",
                      "Access domain-specific space data.",
                      "text-violet-400 border-violet-500/30 bg-violet-500/10",
                    ],
                    [
                      FaCode,
                      "Orbital IDE",
                      "Code, simulate and visualize missions.",
                      "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
                    ],
                    [
                      FiBox,
                      "Models & Embeddings",
                      "Leverage intelligent space insights.",
                      "text-blue-400 border-blue-500/30 bg-blue-500/10",
                    ],
                    [
                      FaTrophy,
                      "Challenges & More",
                      "Solve real-world space problems.",
                      "text-amber-400 border-amber-500/30 bg-amber-500/10",
                    ],
                  ].map(([Icon, title, desc, color]) => (
                    <div key={String(title)} className="flex items-center gap-4">
                      <div
                        className={`grid h-12 w-12 place-items-center rounded-xl border text-xl ${color}`}
                      >
                        <Icon />
                      </div>
                      <div>
                        <h3 className="font-bold">{title}</h3>
                        <p className="mt-1 text-sm text-slate-400">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-10 w-fit rounded-2xl border border-white/10 bg-white/[0.07] px-6 py-5 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <FaShieldAlt className="text-3xl text-violet-400" />
                <p className="max-w-64 text-sm font-semibold text-slate-200">
                  Trusted by space professionals and researchers worldwide
                </p>
              </div>

              <div className="mt-4 flex items-center gap-3">
                {["🚀", "🛰️", "🔭", "🌌"].map((item) => (
                  <div
                    key={item}
                    className="grid h-9 w-9 place-items-center rounded-full border border-slate-700 bg-slate-950 text-sm"
                  >
                    {item}
                  </div>
                ))}
                <div className="grid h-9 w-16 place-items-center rounded-full border border-slate-700 bg-slate-950 text-sm font-bold text-slate-300">
                  +1.2K
                </div>
              </div>
            </div>
          </aside>

          <section className="flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-[650px] rounded-[28px] border border-violet-500/35 bg-[#060c17]/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8 2xl:p-10"
            >
              <div className="text-center">
                <h2 className="text-3xl font-black">Welcome back</h2>
                <p className="mt-4 text-slate-400">
                  Sign in to continue your journey with{" "}
                  <span className="text-violet-400">Yantrix.</span>
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-xl border border-slate-700 bg-[#050a13]">
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 border-b-2 border-violet-500 bg-white/[0.03] px-4 py-4 font-semibold text-white"
                >
                  <FaEnvelope className="text-violet-400" />
                  Email
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 px-4 py-4 font-semibold text-slate-400"
                >
                  <FaRegBuilding />
                  Organization SSO
                </button>
              </div>

              {error && (
                <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <label className="mt-7 block">
                <span className="text-sm font-medium text-slate-300">
                  Email address
                </span>
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-700 bg-[#050a13] px-4 py-4 focus-within:border-violet-400">
                  <FaEnvelope className="text-slate-500" />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@yantrix.com"
                    className="w-full bg-transparent outline-none placeholder:text-slate-500"
                  />
                </div>
              </label>

              <label className="mt-6 block">
                <span className="text-sm font-medium text-slate-300">
                  Password
                </span>
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-700 bg-[#050a13] px-4 py-4 focus-within:border-violet-400">
                  <FaLock className="text-slate-500" />
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="w-full bg-transparent outline-none placeholder:text-slate-500"
                  />
                </div>
              </label>

              <div className="mt-6 flex items-center justify-between text-sm">
                <label className="flex items-center gap-3 text-slate-300">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    className="h-5 w-5 rounded accent-violet-500"
                  />
                  Remember me
                </label>

                <button type="button" className="font-medium text-violet-400">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-8 w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-4 text-lg font-bold shadow-lg shadow-violet-950/30 transition hover:scale-[1.01] disabled:opacity-60"
              >
                {submitting ? "Signing in..." : "Sign in"}
              </button>

              <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
                <div className="h-px flex-1 bg-slate-800" />
                or continue with
                <div className="h-px flex-1 bg-slate-800" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Google", icon: FaGoogle },
                  { label: "GitHub", icon: FaGithub },
                  { label: "Microsoft", icon: FaMicrosoft },
                  { label: "ORCID", text: "iD" },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      className="rounded-xl border border-slate-700 bg-[#050a13] px-3 py-4 text-sm font-semibold text-slate-300 transition hover:border-violet-500"
                    >
                      {Icon ? (
                        <Icon className="mx-auto mb-2 text-2xl" />
                      ) : (
                        <span className="mx-auto mb-2 grid h-6 w-6 place-items-center rounded-full bg-lime-500 text-xs font-black text-white">
                          {item.text}
                        </span>
                      )}
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <p className="mt-8 text-center text-slate-400">
                New to Yantrix?{" "}
                <Link to="/signup" className="font-semibold text-violet-400">
                  Create an account
                </Link>
              </p>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}