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

interface UserBreakdownProps {
  analytics: AnalyticsData;
}

export default function UserBreakdown({ analytics }: UserBreakdownProps) {

  const activityStats = [
    {
      label: 'Active Users',
      value: analytics.activeUsers,
      color: 'bg-green-500',
      icon: '✓',
      percentage: analytics.totalUsers > 0 ? (analytics.activeUsers / analytics.totalUsers) * 100 : 0
    },
    {
      label: 'Inactive Users',
      value: analytics.inactiveUsers,
      color: 'bg-slate-400',
      icon: '○',
      percentage: analytics.totalUsers > 0 ? (analytics.inactiveUsers / analytics.totalUsers) * 100 : 0
    }
  ];

  return (
    <div className="card bg-white shadow-lg">
      <div className="card-body">
        <div>
          <h3 className="text-lg font-semibold text-black mb-4">User Activity</h3>
          <div className="grid grid-cols-2 gap-4">
            {activityStats.map((stat, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 ${stat.color} rounded-full flex items-center justify-center text-white font-bold`}>
                    {stat.icon}
                  </div>
                  <span className="text-slate-600 text-sm">{stat.label}</span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}