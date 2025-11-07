import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { register as registerApi } from "../services";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [github, setGithub] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [preferenceProgramming, setPreferenceProgramming] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // language options for dropdown
  const languages = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "Go",
    "PHP",
    "Ruby",
    "TypeScript",
    "Kotlin",
    "Swift",
  ];

  const formValid = useMemo(() => {
    return (
      name.trim() &&
      email.trim() &&
      password.length >= 6 &&
      github.trim() &&
      aboutMe.trim() &&
      preferenceProgramming.length > 0
    );
  }, [name, email, password, github, aboutMe, preferenceProgramming]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formValid) return;
    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        password,
        github: github.trim(),
        preferenceProgramming,
        aboutMe: aboutMe.trim(),
      };
      const data = await registerApi(payload);
      const msg =
        data?.message || data?.data?.message || "Account created successfully";
      toast.success(msg);
      navigate("/", { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Registration failed";
      toast.error(msg);
    }
  }

  function handlePreferenceChange(e) {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setPreferenceProgramming(selected);
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100">
      <div className="relative mx-auto max-w-6xl grid md:grid-cols-2 min-h-screen">
        {/* LEFT PANEL */}
        <div className="hidden md:flex items-center justify-center p-10 bg-[url('https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center">
          <div className="backdrop-blur-md bg-black/35 rounded-xl p-8 text-white w-[420px]">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                V
              </div>
              <div className="text-xl font-semibold">VOX Platform</div>
            </div>
            <h2 className="text-3xl font-bold leading-tight">
              Create your developer account
            </h2>
            <p className="mt-3 text-white/85 text-sm">
              Join our platform to showcase your programming skills and connect
              with other developers.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-white rounded-2xl shadow border border-indigo-100 p-6">
            <div className="mb-4 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                V
              </div>
              <h1 className="mt-3 text-2xl font-semibold text-gray-900">
                Create your account
              </h1>
              <p className="text-sm text-gray-500">
                Enter your information to get started
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  placeholder="John Carter"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <span className="text-xs text-gray-400">min 6 characters</span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-12 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    placeholder="********"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-2 my-auto px-2 text-indigo-700 hover:text-indigo-900"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  placeholder="https://github.com/username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Programming Preferences
                </label>
                <select
                  multiple
                  value={preferenceProgramming}
                  onChange={handlePreferenceChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 h-28"
                  required
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Hold Ctrl (Windows) or ⌘ (Mac) to select multiple
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  About Me
                </label>
                <textarea
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  placeholder="Tell us a little about yourself..."
                  rows={3}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!formValid}
                className={`w-full rounded-lg px-4 py-2 font-medium text-white transition-colors ${
                  formValid
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-indigo-300 cursor-not-allowed"
                }`}
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-indigo-700 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
