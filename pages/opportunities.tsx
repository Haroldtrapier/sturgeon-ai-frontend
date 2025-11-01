import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sturgeon-ai-prod.vercel.app';

interface Opportunity {
  id: string;
  title: string;
  description: string;
  agency: string;
  type: string;
  postedDate: string;
  deadline: string;
  amount?: string;
}

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [grants, setGrants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const [contractsRes, grantsRes] = await Promise.all([
        axios.get(`${API_URL}/api/opportunities/search`, {
          params: { keywords: search || 'technology', limit: 25 }
        }),
        axios.get(`${API_URL}/api/grants/search`, {
          params: { keywords: search || 'technology', limit: 25 }
        })
      ]);

      setOpportunities(contractsRes.data.opportunities || []);
      setGrants(grantsRes.data.grants || []);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      // Use mock data if API fails
      setOpportunities(getMockData());
    } finally {
      setLoading(false);
    }
  };

  const getMockData = () => [
    {
      id: '1',
      title: 'AI/ML Software Development Services',
      description: 'Seeking experienced contractors for artificial intelligence and machine learning software development.',
      agency: 'Department of Defense',
      type: 'contract',
      postedDate: '2025-10-25',
      deadline: '2025-12-15',
      amount: '$5M - $10M'
    },
    {
      id: '2',
      title: 'Cybersecurity Infrastructure Modernization',
      description: 'Modernize and enhance cybersecurity infrastructure for federal agencies.',
      agency: 'Department of Homeland Security',
      type: 'contract',
      postedDate: '2025-10-28',
      deadline: '2025-12-20',
      amount: '$15M - $25M'
    },
    {
      id: '3',
      title: 'Cloud Migration Services',
      description: 'Assist with migration of legacy systems to secure cloud infrastructure.',
      agency: 'General Services Administration',
      type: 'contract',
      postedDate: '2025-10-30',
      deadline: '2025-12-30',
      amount: '$8M - $12M'
    }
  ];

  const allItems = [...opportunities, ...grants];
  const filteredItems = filter === 'all' ? allItems : 
    filter === 'contracts' ? opportunities : grants;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Federal Opportunities</h1>
          <p className="text-gray-600">Discover contracts and grants matching your expertise</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search opportunities by keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchOpportunities()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('contracts')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                  filter === 'contracts' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Contracts
              </button>
              <button
                onClick={() => setFilter('grants')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                  filter === 'grants' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Grants
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard title="Total Opportunities" value={allItems.length} />
          <StatCard title="Contracts" value={opportunities.length} />
          <StatCard title="Grants" value={grants.length} />
        </div>

        {/* Opportunities List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading opportunities...</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {(filteredItems.length > 0 ? filteredItems : getMockData()).map((opp, idx) => (
              <OpportunityCard key={idx} opportunity={opp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  );
}

function OpportunityCard({ opportunity }: { opportunity: any }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{opportunity.title}</h3>
          <p className="text-gray-600 mb-4">{opportunity.description}</p>
        </div>
        <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {opportunity.type || 'Contract'}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-500">Agency</p>
          <p className="font-medium text-gray-900">{opportunity.agency || 'Federal Agency'}</p>
        </div>
        <div>
          <p className="text-gray-500">Posted</p>
          <p className="font-medium text-gray-900">{opportunity.postedDate || 'Recently'}</p>
        </div>
        <div>
          <p className="text-gray-500">Deadline</p>
          <p className="font-medium text-gray-900">{opportunity.deadline || 'TBD'}</p>
        </div>
        <div>
          <p className="text-gray-500">Value</p>
          <p className="font-medium text-gray-900">{opportunity.amount || 'N/A'}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Link href={`/opportunities/${opportunity.id}`}>
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition">
            View Details
          </button>
        </Link>
        <Link href={`/proposals/new?opportunity=${opportunity.id}`}>
          <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition">
            Create Proposal
          </button>
        </Link>
      </div>
    </div>
  );
}