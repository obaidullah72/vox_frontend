import { useEffect, useState } from "react";
import { FileCode, Clock, Loader2 } from "lucide-react";

export default function GistHistory() {
  const [gists, setGists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call — replace with your backend endpoint later
    setTimeout(() => {
      setGists([
        {
          id: 1,
          title: "Sort an array in Python",
          language: "Python",
          date: "2025-11-06",
        },
        {
          id: 2,
          title: "React Login Form",
          language: "React",
          date: "2025-11-05",
        },
        {
          id: 3,
          title: "File upload API (Node.js)",
          language: "JavaScript",
          date: "2025-11-03",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <FileCode className="h-5 w-5 text-emerald-600" />
          Gist History
        </h2>
        <p className="text-gray-600 mt-1">
          View all the AI-generated gists you’ve created.
        </p>
      </div>

      {/* Gist List */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-500">
            <Loader2 className="animate-spin h-5 w-5 mr-2" /> Loading gists...
          </div>
        ) : gists.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            No gists generated yet.
          </p>
        ) : (
          <div className="divide-y">
            {gists.map((gist) => (
              <div
                key={gist.id}
                className="py-4 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{gist.title}</h4>
                  <p className="text-sm text-gray-500">
                    {gist.language} · {gist.date}
                  </p>
                </div>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
