import { useState } from 'react'
import axios from 'axios'
import styles from '../styles/ContractAnalyzer.module.css'

export default function ContractAnalyzer() {
  const [contractText, setContractText] = useState('')
  const [agency, setAgency] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyze = async (e) => {
    e.preventDefault()
    if (!contractText.trim()) {
      setError('Please enter contract text')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('https://sturgeon-ai-prod.vercel.app/analyze-contract', {
        contract_text: contractText,
        agency: agency || 'Unknown Agency',
        contract_type: 'General'
      })
      setAnalysis(response.data)
    } catch (err) {
      setError('Failed to analyze contract: ' + err.message)
    }
    setLoading(false)
  }

  return (
    <div className={styles.analyzer}>
      <div className={styles.analyzerContainer}>
        <h2>🔍 Contract Analyzer</h2>
        <form onSubmit={handleAnalyze} className={styles.analyzerForm}>
          <div className={styles.formGroup}>
            <label htmlFor="agency">Agency Name</label>
            <input
              id="agency"
              type="text"
              value={agency}
              onChange={(e) => setAgency(e.target.value)}
              placeholder="e.g., Department of Defense"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contract">Contract Text</label>
            <textarea
              id="contract"
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              placeholder="Paste your government contract here..."
              className={styles.formTextarea}
              rows="8"
            />
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? '⏳ Analyzing...' : '🚀 Analyze Contract'}
          </button>
        </form>

        {analysis && (
          <div className={styles.analysisResults}>
            <h3>✅ Analysis Results</h3>
            <div className={styles.resultCard}>
              <p><strong>Status:</strong> {analysis.status}</p>
              <p><strong>Request ID:</strong> {analysis.request_id}</p>
              {analysis.analysis && (
                <>
                  <p><strong>Summary:</strong> {analysis.analysis.contract_summary}</p>
                  <p><strong>Compliance:</strong> {analysis.analysis.compliance_status}</p>
                </>
              )}
              <p><strong>Timestamp:</strong> {new Date(analysis.timestamp).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
