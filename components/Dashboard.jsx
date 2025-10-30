import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../styles/Dashboard.module.css'

export default function Dashboard() {
  const [appInfo, setAppInfo] = useState(null)
  const [health, setHealth] = useState(null)
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const [infoRes, healthRes, metricsRes] = await Promise.all([
        axios.get('https://sturgeon-ai-prod.vercel.app/'),
        axios.get('https://sturgeon-ai-prod.vercel.app/health'),
        axios.get('https://sturgeon-ai-prod.vercel.app/metrics')
      ])

      setAppInfo(infoRes.data)
      setHealth(healthRes.data)
      setMetrics(metricsRes.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch dashboard data: ' + err.message)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading Sturgeon AI Dashboard...</p>
      </div>
    )
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <h1>🦀 Sturgeon AI</h1>
            <p>Government Contract Analysis Platform</p>
          </div>
          <button className={styles.refreshBtn} onClick={fetchDashboardData}>
            <i className="fas fa-sync"></i> Refresh
          </button>
        </div>
      </header>

      <main className={styles.mainContent}>
        {error && <div className={styles.errorBox}>{error}</div>}

        <div className={styles.cardsGrid}>
          {appInfo && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>📱 Application Info</h2>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Name:</span>
                  <span className={styles.value}>{appInfo.name}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Version:</span>
                  <span className={styles.value}>{appInfo.version}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Status:</span>
                  <span className={`${styles.value} ${styles.statusReady}`}>{appInfo.status}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Platform:</span>
                  <span className={styles.value}>{appInfo.platform}</span>
                </div>
              </div>
            </div>
          )}

          {health && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>🏥 Health Check</h2>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Status:</span>
                  <span className={`${styles.value} ${styles.statusHealthy}`}>{health.status}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Version:</span>
                  <span className={styles.value}>{health.version}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Timestamp:</span>
                  <span className={styles.value}>{new Date(health.timestamp).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {metrics && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>📊 Metrics</h2>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Status:</span>
                  <span className={`${styles.value} ${styles.statusAvailable}`}>{metrics.status}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Uptime:</span>
                  <span className={styles.value}>{metrics.uptime}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>API Version:</span>
                  <span className={styles.value}>{metrics.api_version}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Ready:</span>
                  <span className={styles.value}>{metrics.ready ? '✅ Yes' : '❌ No'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {appInfo && (
          <div className={styles.featuresSection}>
            <h2>🎯 Key Features</h2>
            <div className={styles.featuresGrid}>
              {appInfo.features && appInfo.features.map((feature, idx) => (
                <div key={idx} className={styles.featureItem}>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
