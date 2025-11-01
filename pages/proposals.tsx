import { useState } from 'react';
import axios from 'axios';

export default function ProposalBuilder() {
  const [opportunityId, setOpportunityId] = useState('');
  const [companyInfo, setCompanyInfo] = useState({});
  const [proposal, setProposal] = useState('');
  const [generating, setGenerating] = useState(false);

  const generateProposal = async () => {
    setGenerating(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/generate-proposal`, {
        opportunity_id: opportunityId,
        company_info: companyInfo
      });
      setProposal(response.data.proposal);
    } catch (error) {
      console.error('Error generating proposal:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AI Proposal Builder</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <input
            type="text"
            placeholder="Opportunity ID"
            value={opportunityId}
            onChange={(e) => setOpportunityId(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
          />

          <textarea
            placeholder="Company Information (JSON format)"
            value={JSON.stringify(companyInfo)}
            onChange={(e) => {
              try {
                setCompanyInfo(JSON.parse(e.target.value));
              } catch {}
            }}
            className="w-full px-4 py-2 border rounded mb-4 h-32"
          />

          <button
            onClick={generateProposal}
            disabled={generating}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {generating ? 'Generating...' : 'Generate Proposal'}
          </button>
        </div>

        {proposal && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Generated Proposal</h2>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap">{proposal}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}