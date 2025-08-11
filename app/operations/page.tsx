'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import ExcelSpreadsheet from '@/components/ExcelSpreadsheet'
import InvoiceGenerator from '@/components/InvoiceGenerator'

export default function Operations() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState('dashboard')
  const [excelData, setExcelData] = useState<string[][]>([])
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

  const handleDataChange = (data: string[][]) => {
    setExcelData(data)
  }

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
          <h1 className="text-3xl font-bold">Operations</h1>
          <div className="flex space-x-4">
            {activeView !== 'dashboard' && (
              <button
                onClick={() => setActiveView('dashboard')}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
              >
                Back to Operations
              </button>
            )}
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        {activeView === 'spreadsheet' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Transport Data Spreadsheet</h2>
              <p className="text-gray-300 mb-4">
                Enter your transport data using the Excel-like interface below. Use the Invoice Cols button to set up standard invoice columns.
              </p>
              <ExcelSpreadsheet onDataChange={handleDataChange} />
            </div>
            
            {excelData.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Invoice Generation</h2>
                <p className="text-gray-300 mb-4">
                  Generate professional invoices from your spreadsheet data using the Friends Star Transport template.
                </p>
                <InvoiceGenerator excelData={excelData} templateName="friends_star" />
              </div>
            )}
            
            {/* Help Section */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">Column Structure Guide</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <div className="font-medium text-blue-400 mb-2">Primary Columns (A-G):</div>
                  <ul className="space-y-1">
                    <li>A: Date</li>
                    <li>B: Client Name</li>
                    <li>C: Container</li>
                    <li>D: From Location</li>
                    <li>E: To Location</li>
                    <li>F: Rate</li>
                    <li>G: Quantity</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-green-400 mb-2">Additional Columns (H-M):</div>
                  <ul className="space-y-1">
                    <li>H: Token</li>
                    <li>I: VDM</li>
                    <li>J: MEODC</li>
                    <li>K: Washing Due</li>
                    <li>L: Other Charges</li>
                    <li>M: Total</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700 rounded">
                <p className="text-blue-300 text-sm">
                  💡 <strong>Tip:</strong> Use the "Invoice Cols" button in the spreadsheet toolbar to automatically set up these column headers.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeView === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Transaction Management */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold">Transaction Management</h3>
            </div>
            <p className="text-gray-300 mb-4">Create and manage transportation transactions</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition-colors">
              New Transaction
            </button>
          </div>

          {/* Vehicle Routing */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-7 4 7M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              <h3 className="text-xl font-semibold">Vehicle Routing</h3>
            </div>
            <p className="text-gray-300 mb-4">Plan and optimize vehicle routes</p>
            <button className="w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors">
              Route Planner
            </button>
          </div>

          {/* Goods Tracking */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="text-xl font-semibold">Goods Tracking</h3>
            </div>
            <p className="text-gray-300 mb-4">Track shipments and cargo status</p>
            <button className="w-full bg-yellow-600 hover:bg-yellow-700 py-2 px-4 rounded transition-colors">
              Track Goods
            </button>
          </div>

          {/* Template Builder */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              <h3 className="text-xl font-semibold">Template Builder</h3>
            </div>
            <p className="text-gray-300 mb-4">Design custom invoice templates</p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded transition-colors">
              Open Builder
            </button>
          </div>

          {/* Excel Functions */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              <h3 className="text-xl font-semibold">Excel Management</h3>
            </div>
            <p className="text-gray-300 mb-4">Advanced spreadsheet operations</p>
            <button 
              onClick={() => setActiveView('spreadsheet')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 py-2 px-4 rounded transition-colors"
            >
              Open Excel
            </button>
          </div>

          {/* Operations Settings */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-xl font-semibold">Settings</h3>
            </div>
            <p className="text-gray-300 mb-4">Configure operations preferences</p>
            <button className="w-full bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded transition-colors">
              Settings
            </button>
          </div>
          </div>
        )}

        {/* Recent Transactions Table - Only show in dashboard view */}
        {activeView === 'dashboard' && (
        <div className="mt-8 bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-3 text-gray-400">Transaction #</th>
                    <th className="pb-3 text-gray-400">Client</th>
                    <th className="pb-3 text-gray-400">Route</th>
                    <th className="pb-3 text-gray-400">Amount</th>
                    <th className="pb-3 text-gray-400">Status</th>
                    <th className="pb-3 text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-3">
                      <code className="text-blue-400">#TXN-001</code>
                    </td>
                    <td className="py-3">ABC Logistics</td>
                    <td className="py-3">
                      <span className="text-gray-400 text-sm">Dubai → Abu Dhabi</span>
                    </td>
                    <td className="py-3">$2,500.00</td>
                    <td className="py-3">
                      <span className="bg-green-900 text-green-300 px-2 py-1 rounded-full text-xs">
                        Completed
                      </span>
                    </td>
                    <td className="py-3">2025-08-10</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3">
                      <code className="text-blue-400">#TXN-002</code>
                    </td>
                    <td className="py-3">XYZ Transport</td>
                    <td className="py-3">
                      <span className="text-gray-400 text-sm">Sharjah → Dubai</span>
                    </td>
                    <td className="py-3">$1,800.00</td>
                    <td className="py-3">
                      <span className="bg-yellow-900 text-yellow-300 px-2 py-1 rounded-full text-xs">
                        Pending
                      </span>
                    </td>
                    <td className="py-3">2025-08-09</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}