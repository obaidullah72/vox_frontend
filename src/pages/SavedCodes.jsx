// src/pages/SavedCodes.jsx
import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getSavedCodes } from "../services";
import {
  Code2,
  Copy,
  Check,
  Calendar,
  Loader2,
  AlertCircle,
  FileCode,
  RefreshCw,
  Search,
  ChevronDown,
  Trash2,
  Eye,
  Share2,
  X,
  Wand2,
  Hash,
  Braces,
  Terminal,
  FileText,
  Type,
  Globe,
} from "lucide-react";

// Toast
const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg text-white animate-slide-up transition-all ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {type === "success" ? <Check className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
      <span className="font-medium">{message}</span>
      <button onClick={onClose}>
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

// Language icons
const languageIcons = {
  "C++": <Hash className="h-3 w-3" />,
  Python: <Terminal className="h-3 w-3" />,
  JavaScript: <Braces className="h-3 w-3" />,
  Java: <FileText className="h-3 w-3" />,
  TypeScript: <Type className="h-3 w-3" />,
  React: <Globe className="h-3 w-3" />,
  default: <Code2 className="h-3 w-3" />,
};

const detectLanguage = (code, prompt = "") => {
  const lower = code.toLowerCase();
  const promptLower = prompt.toLowerCase();

  if (lower.includes("react") || promptLower.includes("react")) return { name: "React", color: "bg-cyan-100 text-cyan-700" };
  if (lower.includes("typescript") || lower.includes(".tsx")) return { name: "TypeScript", color: "bg-blue-100 text-blue-700" };
  if (lower.includes("#include")) return { name: "C++", color: "bg-red-100 text-red-700" };
  if (lower.includes("def ") || lower.includes("print(")) return { name: "Python", color: "bg-yellow-100 text-yellow-700" };
  if (lower.includes("function") || lower.includes("const ") || lower.includes("let ")) return { name: "JavaScript", color: "bg-blue-100 text-blue-700" };
  if (lower.includes("public class") || lower.includes("void main")) return { name: "Java", color: "bg-orange-100 text-orange-700" };
  return { name: "Code", color: "bg-gray-100 text-gray-700" };
};

export default function SavedCodes() {
  const { userId } = useParams();
  const effectiveUserId = userId || "690ce591c363b3391b625c1d";

  const [savedCodes, setSavedCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [showDeleteId, setShowDeleteId] = useState(null);
  const [selectedCode, setSelectedCode] = useState(null);
  const [toast, setToast] = useState(null);
  const searchInputRef = useRef(null);

  // Debounced search
  const debouncedSearch = useRef(null);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    clearTimeout(debouncedSearch.current);
    debouncedSearch.current = setTimeout(() => setSearchTerm(value), 300);
  };

  useEffect(() => {
    if (effectiveUserId) fetchSavedCodes();
  }, [effectiveUserId]);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape" && selectedCode) setSelectedCode(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedCode]);

  const fetchSavedCodes = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await getSavedCodes(effectiveUserId);
      setSavedCodes(result.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load saved codes.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (code, index) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setToast({ message: "Copied to clipboard!", type: "success" });
    setTimeout(() => setCopiedIndex(null), 2000);
  };


  const formatDate = (iso) => {
    const date = new Date(iso);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const filteredAndSorted = useMemo(() => {
    let filtered = savedCodes.filter((item) =>
      item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortBy === "date") return new Date(b.codeGeneratedAt) - new Date(a.codeGeneratedAt);
      if (sortBy === "prompt") return a.prompt.localeCompare(b.prompt);
      if (sortBy === "language") {
        const langA = detectLanguage(a.code, a.prompt).name;
        const langB = detectLanguage(b.code, b.prompt).name;
        return langA.localeCompare(langB);
      }
      return 0;
    });
  }, [savedCodes, searchTerm, sortBy]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Blur orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 -translate-x-1/3 -translate-y-1/3 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/3 translate-y-1/3 rounded-full bg-green-300/20 blur-3xl" />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  V
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">My Saved Codes</h1>
                  <p className="text-sm text-gray-600 mt-0.5">
                    All your AI-generated snippets in one place
                  </p>
                </div>
              </div>
              <button
                onClick={fetchSavedCodes}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-60 transition"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </header>

          {/* Controls */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search by prompt..."
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              >
                <option value="date">Latest First</option>
                <option value="prompt">Prompt A–Z</option>
                <option value="language">Language</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-5 animate-pulse"
                >
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="space-y-2">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="h-3 bg-gray-700 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-gray-800 font-medium mb-2">{error}</p>
              <button
                onClick={fetchSavedCodes}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filteredAndSorted.length === 0 && (
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-16 text-center">
              <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                <FileCode className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {searchTerm ? "No codes found" : "No saved codes"}
              </h3>
              <p className="text-gray-600">
                {searchTerm ? "Try a different search." : "Generate code with Save enabled."}
              </p>
            </div>
          )}

          {/* Code Grid */}
          {!loading && filteredAndSorted.length > 0 && (
            <>
              <div className="mb-6 text-sm text-gray-600">
                Found <span className="font-semibold text-gray-900">{filteredAndSorted.length}</span> code{filteredAndSorted.length > 1 ? "s" : ""}
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredAndSorted.map((item, index) => {
                  const lang = detectLanguage(item.code, item.prompt);
                  const lines = item.code.split("\n");
                  const previewLines = lines.slice(0, 8);
                  const hasMore = lines.length > 8;

                  return (
                    <div
                      key={item._id}
                      className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                    >
                      {/* Header */}
                      <div className="p-5 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                          {item.prompt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(item.codeGeneratedAt)}
                          </span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${lang.color}`}>
                            {languageIcons[lang.name] || languageIcons.default}
                            {lang.name}
                          </span>
                        </div>
                      </div>

                      {/* Code */}
                      <div className="bg-gray-900/95">
                        <div className="flex">
                          {/* Line Numbers */}
                          <div className="w-10 bg-gray-900 border-r border-gray-700 text-gray-600 text-right pr-2 pt-4 text-xs leading-5 select-none">
                            {previewLines.map((_, i) => (
                              <div key={i}>{i + 1}</div>
                            ))}
                            {hasMore && <div>...</div>}
                          </div>

                          {/* Code */}
                          <div className="flex-1 relative">
                            <pre className="text-xs text-gray-300 font-mono p-4 pl-3 overflow-x-auto">
                              <code>
                                {previewLines.join("\n")}
                                {hasMore && "\n// ..."}
                              </code>
                            </pre>

                            {/* Copy Button */}
                            <button
                              onClick={() => handleCopy(item.code, index)}
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex items-center gap-1.5 px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded text-xs font-medium transition-all"
                            >
                              {copiedIndex === index ? (
                                <>
                                  <Check className="h-3 w-3 text-green-400" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Delete Confirm */}
                      {showDeleteId === item._id && (
                        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center p-4 z-10">
                          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xl max-w-xs w-full">
                            <p className="text-sm font-medium text-gray-900 mb-4">
                              Delete this code permanently?
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setShowDeleteId(null)}
                                className="flex-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="flex-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Full Code Modal */}
      {selectedCode && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedCode(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileCode className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedCode.prompt}</h3>
                  <p className="text-xs text-gray-500">{formatDate(selectedCode.codeGeneratedAt)}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCode(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-gray-900/95">
              <div className="relative p-6">
                <pre className="text-sm text-gray-100 font-mono">
                  <code>{selectedCode.code}</code>
                </pre>
                <button
                  onClick={() => handleCopy(selectedCode.code, -1)}
                  className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition"
                >
                  <Copy className="h-4 w-4" />
                  Copy All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}