import { 
  FileCode, 
  GitBranch, 
  Users, 
  Zap,
  TrendingUp,
  Activity,
  Calendar,
  BarChart3
} from "lucide-react";

import { Card } from "../components/ui/Card";
import { KPI } from "../components/ui/KPI";

export default function UserDashboard() {
  return (
    <div className="relative">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 -translate-x-1/3 -translate-y-1/3 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/3 translate-y-1/3 rounded-full bg-green-300/20 blur-3xl" />
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <header className="pt-8 pb-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-lg">
                V
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Vox Dashboard
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Your coding activity and statistics
                </p>
              </div>
            </div>
          </header>

          {/* Main Stats Grid */}
          <section className="mb-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
            <KPI
              title="Codes Generated"
              value="142"
              hint="This month"
              icon={<FileCode className="h-5 w-5 text-blue-600" />}
              trend="+18%"
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4"
            />
            <KPI
              title="Gists Created"
              value="28"
              hint="Total"
              icon={<GitBranch className="h-5 w-5 text-green-600" />}
              trend="+7%"
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4"
            />
            <KPI
              title="Active Days"
              value="16"
              hint="This month"
              icon={<Calendar className="h-5 w-5 text-purple-600" />}
              trend="+3%"
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4"
            />
            <KPI
              title="Productivity Score"
              value="84%"
              hint="Based on activity"
              icon={<Zap className="h-5 w-5 text-orange-600" />}
              trend="+5%"
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4"
            />
          </section>

          {/* Charts and Detailed Stats */}
          <section className="grid gap-6 lg:grid-cols-2 pb-8">
            {/* Usage Chart Card */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Usage Trend
                </h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  Last 30 days
                </span>
              </div>
              
              {/* Simple bar chart representation */}
              <div className="space-y-2">
                {[
                  { label: "Week 1", value: 65, color: "bg-blue-500" },
                  { label: "Week 2", value: 80, color: "bg-blue-500" },
                  { label: "Week 3", value: 45, color: "bg-blue-500" },
                  { label: "Week 4", value: 90, color: "bg-green-500" },
                ].map((week, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-12">{week.label}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className={`${week.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${week.value}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 w-8">{week.value}%</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Activity Overview */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
              <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
                <Activity className="h-5 w-5 text-green-600" />
                Activity Overview
              </h3>

              <div className="space-y-4">
                {[
                  { label: "Daily Average", value: "3.2 codes", icon: "📊" },
                  { label: "Most Active", value: "Tuesday", icon: "📅" },
                  { label: "Peak Hours", value: "2-4 PM", icon: "⏰" },
                  { label: "Success Rate", value: "92%", icon: "✅" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{stat.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Bottom Stats Row */}
          <section className="grid gap-4 grid-cols-2 lg:grid-cols-4 pb-12">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-xs text-gray-600 mt-1">Languages Used</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">7.2h</div>
              <div className="text-xs text-gray-600 mt-1">Avg Session</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">24</div>
              <div className="text-xs text-gray-600 mt-1">Projects</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <div className="text-xs text-gray-600 mt-1">Uptime</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}