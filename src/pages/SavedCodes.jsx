// src/pages/SavedCodes.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  Tag,
} from "lucide-react";

// Simple language detection from code
const detectLanguage = (code) => {
  if (code.includes("#include")) return { name: "C++", color: "bg-red-100 text-red-700" };
  if (code.includes("def ") || code.includes("print(")) return { name: "Python", color: "bg-yellow-100 text-yellow-700" };
  if (code.includes("function") || code.includes("const ")) return { name: "JavaScript", color: "bg-blue-100 text-blue-700" };
  if (code.includes("public class")) return { name: "Java", color: "bg-orange-100 text-orange-700" };
  return { name: "Code", color: "bg-gray-100 text-gray-700" };
};

export default function SavedCodes() {
  const { userId } = useParams();
  const effectiveUserId = userId || "690ce591c363b3391b625c1d";

  const [savedCodes, setSavedCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    if (effectiveUserId) fetchSavedCodes();
  }, [effectiveUserId]);

  const fetchSavedCodes = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await getSavedCodes(effectiveUserId);
      setSavedCodes(result.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load saved codes.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (code, index) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const formatDate = (iso) => {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your saved codes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md text-center">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FileCode className="h-8 w-8 text-blue-600" />
                My Saved Codes
              </h1>
              <p className="text-gray-600 mt-1">All your AI-generated snippets in one place</p>
            </div>
            <button
              onClick={fetchSavedCodes}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        {savedCodes.length > 0 && (
          <div className="mb-6 text-sm text-gray-600">
            Found <span className="font-semibold text-gray-900">{savedCodes.length}</span> saved code{savedCodes.length > 1 ? "s" : ""}
          </div>
        )}

        {/* Empty State */}
        {savedCodes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
            <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-5 flex items-center justify-center">
              <Code2 className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No saved codes</h3>
            <p className="text-gray-600">
              Generate code with <strong>Save</strong> enabled to see it here.
            </p>
          </div>
        ) : (
          /* Code Grid */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedCodes.map((item, index) => {
              const lang = detectLanguage(item.code);
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.prompt}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(item.codeGeneratedAt)}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${lang.color}`}>
                            {lang.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Code */}
                  <div className="p-0 bg-gray-900">
                    <div className="relative">
                      <pre className="text-xs text-gray-300 font-mono p-4 pr-12 overflow-x-auto">
                        <code>{item.code}</code>
                      </pre>

                      {/* Line Numbers */}
                      <div className="absolute left-0 top-0 bottom-0 w-10 bg-gray-800 text-gray-500 text-right pr-2 pt-4 text-xs select-none pointer-events-none">
                        {item.code.split("\n").map((_, i) => (
                          <div key={i} className="leading-5">
                            {i + 1}
                          </div>
                        ))}
                      </div>

                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopy(item.code, index)}
                        className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-md text-xs font-medium transition-all"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-green-400" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}