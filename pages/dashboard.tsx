import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sturgeon-ai-prod.vercel.app';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    active_opportunities: 0,
    submitted_proposals: 0,
    active_contracts: 0,
    win_rate: 0.0
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/analytics/dashboard`, {
        params: { user_id: 'demo_user' }
      });
      setMetrics(response.data.metrics);
    } catch (error) {
      // Use mock data
      setMetrics({
        active_opportunities: 45,
        submitted_proposals: 12,
        active_contracts: 3,
        win_rate: 0.25
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your overview</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Active Opportunities"
            value={metrics.active_opportunities}
            icon="📊"
            color="blue"
          />
          <MetricCard
            title="Submitted Proposals"
            value={metrics.submitted_proposals}
            icon="📝"
            color="green"
          />
          <MetricCard
            title="Active Contracts"
            value={metrics.active_contracts}
            icon="📋"
            color="purple"
          />
          <MetricCard
            title="Win Rate"
            value={`${(metrics.win_rate * 100).toFixed(0)}%`}
            icon="🎯"
            color="orange"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <QuickAction
            title="Find Opportunities"
            description="Search federal contracts and grants"
            icon="🔍"
            href="/opportunities"
            color="blue"
          />
          <QuickAction
            title="Create Proposal"
            description="AI-powered proposal builder"
            icon="✨"
            href="/proposals"
            color="green"
          />
          <QuickAction
            title="View Analytics"
            description="Track performance and metrics"
            icon="📈"
            href="/analytics"
            color="purple"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem
              title="New opportunity match found"
              description="AI/ML Software Development - Department of Defense"
              time="2 hours ago"
            />
            <ActivityItem
              title="Proposal submitted successfully"
              description="Cybersecurity Infrastructure Modernization"
              time="1 day ago"
            />
            <ActivityItem
              title="Contract awarded"
              description="Cloud Migration Services - GSA"
              time="3 days ago"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, color }: any) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className={`text-3xl font-bold ${colors[color as keyof typeof colors]}`}>{value}</p>
    </div>
  );
}

function QuickAction({ title, description, icon, href, color }: any) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
}

function ActivityItem({ title, description, time }: any) {
  return (
    <div className="border-l-4 border-blue-500 pl-4 py-2">
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-xs text-gray-400 mt-1">{time}</p>
    </div>
  );
}