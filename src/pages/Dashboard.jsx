// src/pages/UserDashboard.jsx
import { useState, useEffect } from "react";
import {
  FileCode,
  GitBranch,
  Calendar,
  Zap,
  TrendingUp,
  Activity,
  Code2,
  Clock,
  Layers,
  Gauge,
  Target,
  BarChart3,
} from "lucide-react";
import { getUserStats } from "../services";
import { Card } from "../components/ui/Card";
import { KPI } from "../components/ui/KPI";

export default function UserDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await getUserStats();
      setStats(result.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load stats.");
    } finally {
      setLoading(false);
    }
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 -translate-x-1/3 -translate-y-1/3 rounded-full bg-blue-300/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/3 translate-y-1/3 rounded-full bg-green-300/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          <header className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-xl bg-gray-200 animate-pulse" />
            <div className="space-y-2">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
            </div>
          </header>

          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 animate-pulse">
                <div className="h-5 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-8 w-16 bg-gray-200 rounded" />
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded mb-3" />
              ))}
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
              <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded mb-3" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 text-center max-w-md">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={fetchStats}
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const data = stats;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Background effects */}
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
                <h1 className="text-2xl font-bold text-gray-900">Vox Dashboard</h1>
                <p className="text-sm text-gray-600 mt-0.5">Your coding activity and statistics</p>
              </div>
            </div>
          </header>

          {/* Main Stats Grid */}
          <section className="mb-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
            <KPI
              title="Codes Generated"
              value={data.codesGenerated.thisMonth}
              hint={`This month (${data.codesGenerated.total} total)`}
              icon={<FileCode className="h-5 w-5 text-blue-600" />}
              trend={null}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4"
            />
            <KPI
              title="Gists Created"
              value={data.gistsCreated.total}
              hint="Total"
              icon={<GitBranch className="h-5 w-5 text-green-600" />}
              trend={null}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4"
            />
            <KPI
              title="Active Days"
              value={data.activeDays}
              hint="This month"
              icon={<Calendar className="h-5 w-5 text-purple-600" />}
              trend={null}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4"
            />
            <KPI
              title="Productivity Score"
              value={data.productivityScore}
              hint="Based on activity"
              icon={<Zap className="h-5 w-5 text-orange-600" />}
              trend={null}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4"
            />
          </section>

          {/* Charts and Detailed Stats */}
          <section className="grid gap-6 lg:grid-cols-2 mb-8">
            {/* Usage Trend Chart */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Usage Trend
                </h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  Last 4 weeks
                </span>
              </div>

              <div className="space-y-3">
                {data.usageTrend.map((week, i) => {
                  const percentage = week.score;
                  const isCurrentWeek = i === 3;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-16">{week.week}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                        <div
                          className={`absolute inset-0 h-full transition-all duration-700 ${
                            isCurrentWeek ? "bg-gradient-to-r from-green-400 to-green-600" : "bg-gradient-to-r from-blue-400 to-blue-600"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 w-12 text-right">
                        {percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Activity Overview */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
              <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
                <Activity className="h-5 w-5 text-green-600" />
                Activity Overview
              </h3>

              <div className="space-y-3">
                {[
                  {
                    label: "Daily Average",
                    value: data.activityOverview.dailyAverage,
                    icon: <BarChart3 className="h-5 w-5 text-blue-600" />,
                    bg: "bg-blue-50",
                  },
                  {
                    label: "Most Active Day",
                    value: data.activityOverview.mostActiveDay,
                    icon: <Calendar className="h-5 w-5 text-purple-600" />,
                    bg: "bg-purple-50",
                  },
                  {
                    label: "Peak Hours",
                    value: data.activityOverview.peakHours,
                    icon: <Clock className="h-5 w-5 text-orange-600" />,
                    bg: "bg-orange-50",
                  },
                  {
                    label: "Success Rate",
                    value: data.activityOverview.successRate,
                    icon: <Target className="h-5 w-5 text-green-600" />,
                    bg: "bg-green-50",
                  },
                  {
                    label: "Languages Used",
                    value: data.activityOverview.languagesUsed,
                    icon: <Code2 className="h-5 w-5 text-indigo-600" />,
                    bg: "bg-indigo-50",
                  },
                ].map((stat, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${stat.bg}`}>
                    <div className="flex items-center gap-3">
                      {stat.icon}
                      <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Languages Used */}
          <section className="mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-blue-600" />
                Languages Used ({data.languageUsageCount} codes)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.languageUsage.map((lang, i) => {
                  const percentage = ((lang.count / data.languageUsageCount) * 100).toFixed(0);
                  return (
                    <div
                      key={i}
                      className="p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-gray-200"
                    >
                      <p className="text-sm font-medium text-gray-700 capitalize">
                        {lang.language.toLowerCase()}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{lang.count}</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div
                          className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{percentage}% of total</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </section>

          {/* Bottom Stats Row */}
          <section className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{data.avgSession}</div>
              <div className="text-xs text-gray-600 mt-1">Avg Session</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{data.projects}</div>
              <div className="text-xs text-gray-600 mt-1">Projects</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{data.uptime}</div>
              <div className="text-xs text-gray-600 mt-1">Uptime</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{data.codesGenerated.total}</div>
              <div className="text-xs text-gray-600 mt-1">Total Codes</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}