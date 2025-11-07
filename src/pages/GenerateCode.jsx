import { useState } from "react";
import {
  Code2,
  Loader2,
  Wand2,
  Copy,
  Check,
  Zap,
  Sparkles,
  Share2,
  Save,
  FileCode,
  GitBranch,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { generateCode } from "../services";

export default function GenerateCode() {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [isShare, setIsShare] = useState(false);
  const [isSave, setIsSave] = useState(true);

  const suggestions = [
    "Create a React hook for API calls",
    "Write a Python function to validate email",
    "JavaScript array sorting with custom comparator",
    "CSS grid layout for dashboard",
    "Node.js Express middleware for auth",
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setGeneratedCode("");
    setCopied(false);
    setError("");
    try {
      const payload = { message: prompt, isShare, isSave };
      const result = await generateCode(payload);
      setGeneratedCode(result.data?.code || "/* No code returned */");
    } catch (err) {
      const backendError = err?.response?.data?.error?.[0];
      setError(
        backendError ||
          err?.response?.data?.message ||
          "Failed to generate code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSuggestionClick = (s) => setPrompt(s);

  // Reusable Toggle Component
  const Toggle = ({ checked, onChange, label, icon: Icon, color }) => {
    return (
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
            checked ? color : "bg-gray-300"
          }`}
        >
          {/* Track */}
          <div className="absolute inset-0 rounded-full bg-white/20" />
          {/* Thumb */}
          <div
            className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
              checked ? "translate-x-5" : ""
            }`}
          >
            <Icon className={`h-3.5 w-3.5 ${checked ? "text-white" : "text-gray-400"}`} />
          </div>
        </div>
        <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
          <Icon className="h-4 w-4" />
          {label}
        </span>
      </label>
    );
  };

  return (
    <div className="relative min-h-screen">
      {/* Background blur orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 -translate-x-1/3 -translate-y-1/3 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/3 translate-y-1/3 rounded-full bg-green-300/20 blur-3xl" />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                V
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  AI Code Generator
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Turn ideas into production-ready code instantly
                </p>
              </div>
            </div>
          </header>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Input Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Prompt Card */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-600" />
                    Describe Your Code
                  </label>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {prompt.length}/500
                  </span>
                </div>

                <textarea
                  rows={5}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Write a React hook to fetch data with loading and error states..."
                  className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800 placeholder-gray-400 resize-none transition-all"
                  maxLength={500}
                />

                {/* Suggestions */}
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Quick Suggestions</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(s)}
                        className="px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Controls Card */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-6 mb-5">
                  {/* Language Select */}
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700">Language:</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-sm font-medium text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="c++">C++</option>
                      <option value="html">HTML/CSS</option>
                      <option value="react">React</option>
                      <option value="node">Node.js</option>
                      <option value="typescript">TypeScript</option>
                    </select>
                  </div>

                  {/* Share Toggle */}
                  <Toggle
                    checked={isShare}
                    onChange={(e) => setIsShare(e.target.checked)}
                    label="Share"
                    icon={Share2}
                    color="bg-green-500"
                  />

                  {/* Save Toggle */}
                  <Toggle
                    checked={isSave}
                    onChange={(e) => setIsSave(e.target.checked)}
                    label="Save"
                    icon={Save}
                    color="bg-purple-500"
                  />

                  {/* Status */}
                  <div className="ml-auto flex items-center gap-2 text-sm">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        loading ? "bg-orange-500 animate-pulse" : "bg-green-500"
                      }`}
                    />
                    <span className="font-medium text-gray-600">
                      {loading ? "Generating..." : "Ready"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Generating Code...
                    </>
                  ) : (
                    <>
                      <Code2 className="h-5 w-5" />
                      Generate Code
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pro Tips */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-600" />
                  Pro Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {[
                    "Be specific about inputs & outputs",
                    "Mention performance or style preferences",
                    "Ask for error handling or tests",
                    "Say 'use hooks' or 'async/await'",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Supported Languages */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-800 mb-3">Languages</h3>
                <div className="flex flex-wrap gap-1.5">
                  {["JS", "Python", "Java", "C++", "React", "Node", "TS", "HTML/CSS"].map(
                    (lang) => (
                      <span
                        key={lang}
                        className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md"
                      >
                        {lang}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="max-w-4xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-8 text-center">
                <Loader2 className="h-10 w-10 text-blue-600 animate-spin mx-auto mb-3" />
                <p className="text-lg font-semibold text-gray-800">
                  AI is crafting your code...
                </p>
                <p className="text-sm text-gray-600">
                  This usually takes a few seconds
                </p>
              </div>
            </div>
          )}

          {/* Generated Code */}
          {generatedCode && !loading && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                <div className="h-1 bg-blue-500" />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                        <h3 className="text-lg font-bold text-white">Generated Code</h3>
                      </div>
                      <span className="px-3 py-1 text-xs font-bold bg-blue-600 text-white rounded-full uppercase tracking-wider">
                        {language}
                      </span>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-blue-400" />
                          <span className="text-sm font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span className="text-sm font-medium">Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="relative bg-gray-800 rounded-lg p-4 border border-gray-700 font-mono text-sm text-gray-100 overflow-x-auto">
                    <pre className="pr-10">
                      <code>{generatedCode}</code>
                    </pre>
                    <div className="absolute left-0 top-0 bottom-0 w-10 bg-gray-900 border-r border-gray-700 text-gray-600 text-right pr-2 pt-4 text-xs leading-6 select-none">
                      {generatedCode.split("\n").map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}