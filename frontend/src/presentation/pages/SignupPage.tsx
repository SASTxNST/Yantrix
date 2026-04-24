import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaDatabase,
  FaCode,
  FaTrophy,
  FaUserAstronaut,
  FaGithub,
  FaGoogle,
  FaMicrosoft,
  FaLock,
  FaEnvelope,
  FaRegUser,
  FaEyeSlash,
  FaRocket,
  FaBuilding,
} from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { GiMicroscope } from "react-icons/gi";
import { useAuth } from "../context/AuthContext";

const roles = [
  { label: "Student", sub: "Learning & exploring", icon: FaUserAstronaut },
  { label: "Researcher", sub: "Academic / R&D", icon: GiMicroscope },
  { label: "Engineer", sub: "Building solutions", icon: FaRocket },
  { label: "Organization", sub: "Team / Company", icon: FaBuilding },
];

export function SignupPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [selectedRole, setSelectedRole] = useState("Student");
  const [accepted, setAccepted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    githubId: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!accepted) {
      setError("Please accept the terms and privacy policy.");
      return;
    }

    setSubmitting(true);

    try {
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone || "9999999999",
        password: form.password,
        githubId: form.githubId || undefined,
      });

      navigate("/profile");
    } catch {
      setError("Signup failed. Please check your details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#020611] text-white">
      <section className="relative min-h-screen grid xl:grid-cols-[1.05fr_0.95fr]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_25%,rgba(111,76,255,0.35),transparent_28%),radial-gradient(circle_at_15%_10%,rgba(46,132,255,0.18),transparent_24%),linear-gradient(135deg,#020611_0%,#06101f_45%,#020611_100%)]" />
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute -bottom-48 -left-20 h-[460px] w-[1100px] rounded-[100%] border-t border-blue-300/60 bg-[radial-gradient(ellipse_at_top,rgba(57,120,255,0.45),rgba(11,21,46,0.85)_32%,rgba(2,6,17,0)_70%)] shadow-[0_-24px_80px_rgba(55,130,255,0.45)]" />

        <aside className="relative hidden xl:flex flex-col justify-between px-14 2xl:px-20 py-12">
          <div>
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-violet-500/10 text-4xl text-violet-400">
                🪐
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-[0.12em]">YANTRIX</h1>
                <p className="font-semibold text-violet-400">
                  Build. Simulate. Discover.
                </p>
              </div>
            </div>

            <div className="mt-20 max-w-xl">
              <h2 className="text-5xl 2xl:text-6xl font-black leading-tight">
                Create your account and{" "}
                <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  start your mission.
                </span>
              </h2>

              <p className="mt-7 max-w-lg text-xl leading-8 text-slate-300">
                Join Yantrix and get access to datasets, orbital IDE, models,
                missions, research and a community building the future of space.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  {
                    icon: FaDatabase,
                    title: "Access Space Datasets",
                    desc: "Telemetry, imagery, orbital data and more.",
                    color: "text-violet-400 border-violet-500/30 bg-violet-500/10",
                  },
                  {
                    icon: FaCode,
                    title: "Code in Orbital IDE",
                    desc: "Simulate missions with built-in space tools.",
                    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
                  },
                  {
                    icon: FiBox,
                    title: "Collaborate & Share",
                    desc: "Work together on models, missions and research.",
                    color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
                  },
                  {
                    icon: FaTrophy,
                    title: "Join Challenges",
                    desc: "Solve real-world space problems and win.",
                    color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex items-center gap-5">
                      <div
                        className={`grid h-14 w-14 place-items-center rounded-xl border text-2xl ${item.color}`}
                      >
                        <Icon />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mb-16 flex w-fit items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-5 backdrop-blur-xl">
            <div className="flex -space-x-3">
              {["K", "S", "A"].map((item) => (
                <div
                  key={item}
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-slate-900 bg-slate-700 text-sm font-bold"
                >
                  {item}
                </div>
              ))}
              <div className="grid h-9 w-14 place-items-center rounded-full border-2 border-slate-900 bg-violet-500/30 text-sm font-bold text-violet-200">
                +2.4K
              </div>
            </div>
            <p className="max-w-48 text-sm font-semibold text-slate-200">
              Trusted by 2,400+ space innovators worldwide
            </p>
          </div>
        </aside>

        <section className="relative flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:px-12">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[720px] rounded-[28px] border border-slate-700/70 bg-[#060c17]/85 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8 lg:p-10 2xl:p-12"
          >
            <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-300">
              Step 1 of 2
            </span>

            <div className="text-center">
              <h2 className="text-3xl font-black">Create your account</h2>
              <p className="mt-3 text-slate-400">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-violet-400">
                  Log in
                </Link>
              </p>
            </div>

            {error && (
              <div className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <label>
                <span className="text-sm font-medium text-slate-300">
                  Full name
                </span>
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-700 bg-[#050a13] px-4 py-3 focus-within:border-violet-400">
                  <FaRegUser className="text-slate-500" />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                  />
                </div>
              </label>

              <label>
                <span className="text-sm font-medium text-slate-300">
                  Username
                </span>
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-700 bg-[#050a13] px-4 py-3 focus-within:border-violet-400">
                  <span className="text-slate-500">@</span>
                  <input
                    name="githubId"
                    value={form.githubId}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  This will be your unique handle on Yantrix.
                </p>
              </label>
            </div>

            <label className="mt-6 block">
              <span className="text-sm font-medium text-slate-300">
                Email address
              </span>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-700 bg-[#050a13] px-4 py-3 focus-within:border-violet-400">
                <FaEnvelope className="text-slate-500" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@yantrix.com"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                />
              </div>
            </label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="hidden"
              placeholder="Phone"
            />

            <label className="mt-6 block">
              <span className="text-sm font-medium text-slate-300">Password</span>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-700 bg-[#050a13] px-4 py-3 focus-within:border-violet-400">
                <FaLock className="text-slate-500" />
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  placeholder="Create a strong password"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                />
                <FaEyeSlash className="text-slate-500" />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                At least 8 characters with uppercase, number and symbol.
              </p>
            </label>

            <label className="mt-6 block">
              <span className="text-sm font-medium text-slate-300">
                Confirm password
              </span>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-700 bg-[#050a13] px-4 py-3 focus-within:border-violet-400">
                <FaLock className="text-slate-500" />
                <input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                />
                <FaEyeSlash className="text-slate-500" />
              </div>
            </label>

            <div className="mt-6">
              <p className="text-sm font-medium text-slate-300">I am a...</p>
              <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const active = selectedRole === role.label;

                  return (
                    <button
                      key={role.label}
                      type="button"
                      onClick={() => setSelectedRole(role.label)}
                      className={`rounded-xl border px-3 py-4 text-center transition ${
                        active
                          ? "border-violet-500 bg-violet-500/15"
                          : "border-slate-700 bg-[#050a13] hover:border-slate-500"
                      }`}
                    >
                      <Icon
                        className={`mx-auto text-2xl ${
                          active ? "text-violet-400" : "text-slate-400"
                        }`}
                      />
                      <p className="mt-2 text-sm font-bold">{role.label}</p>
                      <p className="mt-1 text-[11px] text-slate-500">
                        {role.sub}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm text-slate-400">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(event) => setAccepted(event.target.checked)}
                className="mt-1 h-4 w-4 accent-violet-500"
              />
              <span>
                I agree to Yantrix{" "}
                <span className="text-violet-400">Terms of Service</span> and{" "}
                <span className="text-violet-400">Privacy Policy</span>
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-4 font-bold shadow-lg shadow-violet-950/30 transition hover:scale-[1.01] disabled:opacity-60"
            >
              {submitting ? "Creating account..." : "Create account"}
            </button>

            <div className="mt-7 flex items-center gap-4 text-sm text-slate-500">
              <div className="h-px flex-1 bg-slate-800" />
              or sign up with
              <div className="h-px flex-1 bg-slate-800" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
                    className="rounded-xl border border-slate-700 bg-[#050a13] px-4 py-4 text-sm font-semibold text-slate-300 transition hover:border-violet-500"
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

            <p className="mt-7 text-center text-sm text-slate-400">
              🛡 We respect your privacy. No spam, ever.
            </p>
          </form>
        </section>
      </section>
    </main>
  );
}