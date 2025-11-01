import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Analytics() {
  const [metrics, setMetrics] = useState({
    active_opportunities: 0,
    submitted_proposals: 0,
    active_contracts: 0,
    win_rate: 0.0
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics/dashboard`, {
        params: { user_id: 'current_user' }
      });
      setMetrics(response.data.metrics);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Active Opportunities" value={metrics.active_opportunities} />
          <MetricCard title="Submitted Proposals" value={metrics.submitted_proposals} />
          <MetricCard title="Active Contracts" value={metrics.active_contracts} />
          <MetricCard title="Win Rate" value={`${(metrics.win_rate * 100).toFixed(1)}%`} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <p className="text-gray-600">Activity timeline will appear here</p>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  );
}