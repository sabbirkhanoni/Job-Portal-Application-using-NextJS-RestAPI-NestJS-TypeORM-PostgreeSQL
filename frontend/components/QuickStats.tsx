// Server Component
interface AnalyticsData {
  totalUsers: number;
  totalEmployees: number;
  totalJobseekers: number;
  totalJobs: number;
  activeUsers: number;
  inactiveUsers: number;
  pendingApprovals: number;
  totalApplications: number;
}

interface QuickStatsProps {
  analytics: AnalyticsData;
}

export default function QuickStats({ analytics }: QuickStatsProps) {
  const stats = [
    {
      label: 'Employees',
      value: analytics.totalEmployees,
      icon: '👔',
      color: 'text-black',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Job Seekers',
      value: analytics.totalJobseekers,
      icon: '🔍',
      color: 'text-black',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Total Users',
      value: analytics.totalUsers,
      icon: '✓',
      color: 'text-emerald-600',
      bgColor: 'bg-teal-100'
    }
  ];


  return (
    <div className="space-y-6 ">
      <div className="card bg-white shadow-lg w-full">
        <div className="card-body">
          <h2 className="card-title text-xl text-black mb-4">Quick Stats</h2>
          <div className="space-y-3">
            {stats.map((stat, idx) => (
              <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${stat.bgColor}`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{stat.icon}</div>
                  <span className="text-slate-700 font-medium text-lg">{stat.label}</span>
                </div>
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}