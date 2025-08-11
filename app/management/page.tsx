'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function Management() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Management</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cost Tracking */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="text-xl font-semibold">Cost Tracking</h3>
            </div>
            <p className="text-gray-300 mb-4">Monitor operational costs and expenses</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition-colors">
              View Costs
            </button>
          </div>

          {/* Receivables Management */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <h3 className="text-xl font-semibold">Receivables</h3>
            </div>
            <p className="text-gray-300 mb-4">Manage outstanding receivables and collections</p>
            <button className="w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors">
              View Receivables
            </button>
          </div>

          {/* Payables Management */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
              <h3 className="text-xl font-semibold">Payables</h3>
            </div>
            <p className="text-gray-300 mb-4">Manage bills and payment obligations</p>
            <button className="w-full bg-red-600 hover:bg-red-700 py-2 px-4 rounded transition-colors">
              View Payables
            </button>
          </div>

          {/* Budget Planning */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold">Budget Planning</h3>
            </div>
            <p className="text-gray-300 mb-4">Plan and monitor budgets</p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded transition-colors">
              Budget Tool
            </button>
          </div>

          {/* Performance Analytics */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold">Performance Analytics</h3>
            </div>
            <p className="text-gray-300 mb-4">Analyze business performance metrics</p>
            <button className="w-full bg-yellow-600 hover:bg-yellow-700 py-2 px-4 rounded transition-colors">
              View Analytics
            </button>
          </div>

          {/* Resource Planning */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-indigo-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-xl font-semibold">Resource Planning</h3>
            </div>
            <p className="text-gray-300 mb-4">Plan and allocate resources efficiently</p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded transition-colors">
              Resource Planner
            </button>
          </div>
        </div>

        {/* Management Dashboard Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Monthly Costs</p>
                <p className="text-2xl font-bold text-red-400">$28,450.00</p>
                <p className="text-xs text-gray-500 mt-1">+8.2% from last month</p>
              </div>
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Outstanding A/R</p>
                <p className="text-2xl font-bold text-yellow-400">$45,280.00</p>
                <p className="text-xs text-gray-500 mt-1">32 days avg collection</p>
              </div>
              <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Budget Utilization</p>
                <p className="text-2xl font-bold text-blue-400">78%</p>
                <p className="text-xs text-gray-500 mt-1">$78k of $100k budget</p>
              </div>
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">ROI</p>
                <p className="text-2xl font-bold text-green-400">24.5%</p>
                <p className="text-xs text-gray-500 mt-1">+2.1% this quarter</p>
              </div>
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Management Reports Section */}
        <div className="mt-8 bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Management Reports</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="text-left p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <h3 className="font-semibold mb-2">Cash Flow Statement</h3>
                <p className="text-sm text-gray-400">Monthly cash flow analysis</p>
              </button>
              <button className="text-left p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <h3 className="font-semibold mb-2">Profit & Loss</h3>
                <p className="text-sm text-gray-400">P&L statement and variance analysis</p>
              </button>
              <button className="text-left p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <h3 className="font-semibold mb-2">Balance Sheet</h3>
                <p className="text-sm text-gray-400">Assets, liabilities, and equity</p>
              </button>
              <button className="text-left p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <h3 className="font-semibold mb-2">Budget vs Actual</h3>
                <p className="text-sm text-gray-400">Budget variance report</p>
              </button>
              <button className="text-left p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <h3 className="font-semibold mb-2">KPI Dashboard</h3>
                <p className="text-sm text-gray-400">Key performance indicators</p>
              </button>
              <button className="text-left p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <h3 className="font-semibold mb-2">Executive Summary</h3>
                <p className="text-sm text-gray-400">High-level business overview</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}