'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export default function Finance() {
  const [user, setUser] = useState<User | null>(null)
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
          <h1 className="text-3xl font-bold">Finance</h1>
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
          {/* Invoice Management */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold">Invoice Management</h3>
            </div>
            <p className="text-gray-300 mb-4">Create and manage invoices</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition-colors">
              New Invoice
            </button>
          </div>

          {/* Payment Tracking */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <h3 className="text-xl font-semibold">Payment Tracking</h3>
            </div>
            <p className="text-gray-300 mb-4">Track payments and receivables</p>
            <button className="w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors">
              View Payments
            </button>
          </div>

          {/* Journal Entries */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-xl font-semibold">Journal Entries</h3>
            </div>
            <p className="text-gray-300 mb-4">Record financial transactions</p>
            <button className="w-full bg-yellow-600 hover:bg-yellow-700 py-2 px-4 rounded transition-colors">
              New Entry
            </button>
          </div>

          {/* Accounts Receivable */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <h3 className="text-xl font-semibold">Accounts Receivable</h3>
            </div>
            <p className="text-gray-300 mb-4">Manage outstanding receivables</p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded transition-colors">
              View A/R
            </button>
          </div>

          {/* Accounts Payable */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
              <h3 className="text-xl font-semibold">Accounts Payable</h3>
            </div>
            <p className="text-gray-300 mb-4">Manage bills and payables</p>
            <button className="w-full bg-red-600 hover:bg-red-700 py-2 px-4 rounded transition-colors">
              View A/P
            </button>
          </div>

          {/* Financial Reports */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-indigo-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="text-xl font-semibold">Financial Reports</h3>
            </div>
            <p className="text-gray-300 mb-4">Generate financial statements</p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded transition-colors">
              View Reports
            </button>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="mt-8 bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Recent Invoices</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-3 text-gray-400">Invoice #</th>
                    <th className="pb-3 text-gray-400">Client</th>
                    <th className="pb-3 text-gray-400">Amount</th>
                    <th className="pb-3 text-gray-400">Status</th>
                    <th className="pb-3 text-gray-400">Due Date</th>
                    <th className="pb-3 text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-3">
                      <code className="text-blue-400">#INV-001</code>
                    </td>
                    <td className="py-3">ABC Logistics</td>
                    <td className="py-3">$2,500.00</td>
                    <td className="py-3">
                      <span className="bg-green-900 text-green-300 px-2 py-1 rounded-full text-xs">
                        Paid
                      </span>
                    </td>
                    <td className="py-3">2025-08-15</td>
                    <td className="py-3">
                      <button className="text-blue-400 hover:text-blue-300 mr-2">View</button>
                      <button className="text-green-400 hover:text-green-300">Download</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3">
                      <code className="text-blue-400">#INV-002</code>
                    </td>
                    <td className="py-3">XYZ Transport</td>
                    <td className="py-3">$1,800.00</td>
                    <td className="py-3">
                      <span className="bg-yellow-900 text-yellow-300 px-2 py-1 rounded-full text-xs">
                        Pending
                      </span>
                    </td>
                    <td className="py-3">2025-08-20</td>
                    <td className="py-3">
                      <button className="text-blue-400 hover:text-blue-300 mr-2">View</button>
                      <button className="text-green-400 hover:text-green-300">Download</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-green-400">$45,280.00</p>
              </div>
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Outstanding A/R</p>
                <p className="text-2xl font-bold text-yellow-400">$12,450.00</p>
              </div>
              <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending A/P</p>
                <p className="text-2xl font-bold text-red-400">$8,920.00</p>
              </div>
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Net Profit</p>
                <p className="text-2xl font-bold text-blue-400">$36,360.00</p>
              </div>
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}