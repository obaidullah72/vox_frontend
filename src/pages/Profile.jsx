// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import {
  getUserProfile,
  updateUserProfile,
} from "../services";
import {
  Save,
  Loader2,
  Github,
  Calendar,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

/* ──────────────────────── Toast ──────────────────────── */
const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg text-white animate-slide-up transition-all ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {type === "success" ? (
        <CheckCircle className="h-5 w-5" />
      ) : (
        <AlertCircle className="h-5 w-5" />
      )}
      <span className="font-medium">{message}</span>
      <button onClick={onClose}>
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    github: "",
    aboutMe: "",
    preferenceProgramming: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Use lowercase for internal logic, Title Case for display
  const languageMap = {
    javascript: "JavaScript",
    python: "Python",
    "c++": "C++",
    "c#": "C#",
    java: "Java",
    typescript: "TypeScript",
    go: "Go",
    rust: "Rust",
  };

  const languages = Object.values(languageMap); // ["JavaScript", "Python", ...]
  const languageKeys = Object.keys(languageMap); // ["javascript", "python", ...]

  /* ──────────────────────── Load Profile ──────────────────────── */
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const result = await getUserProfile();
      const data = result.data;

      // Normalize API lowercase → Title Case for display
      const normalizedPrefs = (data.preferenceProgramming || []).map(p => 
        languageMap[p.toLowerCase()] || p
      );

      setUser(data);
      setFormData({
        name: data.name || "",
        email: data.email || "",
        github: data.github || "",
        aboutMe: data.aboutMe || "",
        preferenceProgramming: normalizedPrefs,
      });
    } catch (err) {
      setToast({ message: err?.response?.data?.message || "Failed to load profile.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  /* ──────────────────────── Handlers ──────────────────────── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguageToggle = (displayLang) => {
    const lowerKey = Object.entries(languageMap).find(([_, v]) => v === displayLang)?.[0];
    if (!lowerKey) return;

    setFormData((prev) => {
      const current = prev.preferenceProgramming;
      if (current.includes(displayLang)) {
        return { ...prev, preferenceProgramming: current.filter(l => l !== displayLang) };
      } else {
        return { ...prev, preferenceProgramming: [...current, displayLang] };
      }
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Convert Title Case back to lowercase for API
    const apiPrefs = formData.preferenceProgramming.map(displayLang => {
      return Object.entries(languageMap).find(([_, v]) => v === displayLang)?.[0] || displayLang.toLowerCase();
    });

    const payload = {
      name: formData.name.trim(),
      github: formData.github.trim(),
      aboutMe: formData.aboutMe.trim(),
      preferenceProgramming: apiPrefs,
    };

    try {
      await updateUserProfile(user._id, payload);
      setToast({ message: "Profile updated successfully!", type: "success" });
      await fetchProfile(); // Refresh to confirm
    } catch (err) {
      setToast({ message: err?.response?.data?.message || "Failed to save profile.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days} days ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  };

  /* ──────────────────────── Loading ──────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 animate-pulse">
            <div className="flex items-center gap-5 mb-6">
              <div className="h-20 w-20 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-48" />
                <div className="h-4 bg-gray-200 rounded w-64" />
              </div>
            </div>
            <div className="space-y-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-100 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ──────────────────────── Main UI ──────────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-md">
              V
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
              <p className="text-sm text-gray-600">Update your personal information and preferences</p>
            </div>
          </div>
        </header>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-5">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                {formData.name[0]?.toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{formData.name}</h2>
                <p className="text-gray-600">{formData.email}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {formatDate(user.createdAt)}
                  </span>
                  {formData.github && (
                    <a
                      href={formData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="peer w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-transparent"
                placeholder=" "
              />
              <label className="absolute left-4 -top-2.5 bg-white px-1 text-xs font-medium text-gray-600 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600 transition-all">
                Full Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
              />
              <label className="absolute left-4 -top-2.5 bg-white px-1 text-xs font-medium text-gray-600">
                Email Address
              </label>
            </div>

            {/* GitHub */}
            <div className="relative">
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="peer w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-transparent"
                placeholder=" "
              />
              <label className="absolute left-4 -top-2.5 bg-white px-1 text-xs font-medium text-gray-600 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600 transition-all">
                GitHub URL
              </label>
            </div>

            {/* About Me */}
            <div className="relative">
              <textarea
                name="aboutMe"
                rows={3}
                value={formData.aboutMe}
                onChange={handleChange}
                className="peer w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition placeholder-transparent"
                placeholder=" "
              />
              <label className="absolute left-4 -top-2.5 bg-white px-1 text-xs font-medium text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600 transition-all">
                About Me
              </label>
            </div>

            {/* Preferred Languages */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred Programming Languages
              </label>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => {
                  const isSelected = formData.preferenceProgramming.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => handleLanguageToggle(lang)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}