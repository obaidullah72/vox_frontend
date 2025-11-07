import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSucceeded } from "../redux/slices/authSlice";
import { login as loginApi } from "../services/index";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const tips = [
    "Secure business collaboration environment",
    "Real-time communication dashboard",
    "Powerful role-based access control system",
    "Seamless document management & permissions",
  ];

  const [tipIndex, setTipIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((i) => (i + 1) % tips.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password || submitting) return;
    setError("");
    setSubmitting(true);

    try {
      // API call
      const response = await loginApi({ email, password });
      const token =
        response?.data?.data?.token ||
        response?.data?.token ||
        response?.token;

      if (!token) throw new Error("No token returned from server");

      let expiresAt = null;
      try {
        const decoded = jwtDecode(token);
        if (decoded?.exp) expiresAt = decoded.exp * 1000;
      } catch { }

      const user = response?.data?.data?.user;

      // Redux dispatch
      dispatch(
        loginSucceeded({
          accessToken: token,
          expiresAt,
          user,
        })
      );

      toast.success("Login successful");

      // Redirect
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Login failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100">
      <div className="relative mx-auto max-w-6xl grid md:grid-cols-2 min-h-screen">
        {/* LEFT SECTION */}
        <div className="hidden md:flex items-center justify-center p-10 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center">
          <div className="backdrop-blur-md bg-black/30 rounded-xl p-8 text-white w-[420px]">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                V
              </div>
              <div className="text-xl font-semibold">VOX Platform</div>
            </div>
            <h2 className="text-3xl font-bold leading-tight">
              Collaborate with Confidence.
            </h2>
            <p className="mt-3 text-white/80">
              Secure, fast, and built for modern business workflows.
            </p>

            <div className="mt-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/30 px-4 py-2 text-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-indigo-300 animate-pulse" />
                <span aria-live="polite">{tips[tipIndex]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-white rounded-2xl shadow border border-indigo-100 p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                V
              </div>
              <h1 className="mt-3 text-2xl font-semibold text-gray-900">
                Login to VOX
              </h1>
              <p className="text-sm text-gray-500">
                Access your workspace and communication tools
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="text-sm text-red-600" role="alert">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-12 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    placeholder="********"
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

              <button
                type="submit"
                disabled={submitting}
                className={`w-full text-white rounded-lg px-4 py-2 font-medium transition-colors ${submitting
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
              >
                {submitting ? "Logging in…" : "Login"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-indigo-700 hover:underline">
                Create one
              </Link>
            </div>

            <div className="mt-8 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} VOX • Secure Collaboration Suite
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
