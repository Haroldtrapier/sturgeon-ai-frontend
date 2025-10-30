import { useState, useEffect } from 'react'
import axios from 'axios'
import Dashboard from '../components/Dashboard'
import ContractAnalyzer from '../components/ContractAnalyzer'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Dashboard />
      <ContractAnalyzer />
    </div>
  )
}
