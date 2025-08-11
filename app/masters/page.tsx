'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export default function Masters() {
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
          <h1 className="text-3xl font-bold">Masters</h1>
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
          {/* Client Management */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-xl font-semibold">Client Management</h3>
            </div>
            <p className="text-gray-300 mb-4">Manage customer information and contacts</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition-colors">
                View Clients
              </button>
              <button className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors">
                Add
              </button>
            </div>
          </div>

          {/* Employee Management */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 4.197a4 4 0 11-4-4 4 4 0 014 4z" />
              </svg>
              <h3 className="text-xl font-semibold">Employee Management</h3>
            </div>
            <p className="text-gray-300 mb-4">Manage staff information and roles</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors">
                View Employees
              </button>
              <button className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors">
                Add
              </button>
            </div>
          </div>

          {/* Vehicle Management */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
              <h3 className="text-xl font-semibold">Vehicle Management</h3>
            </div>
            <p className="text-gray-300 mb-4">Manage fleet and vehicle details</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 py-2 px-4 rounded transition-colors">
                View Vehicles
              </button>
              <button className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors">
                Add
              </button>
            </div>
          </div>

          {/* Vendor Management */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="text-xl font-semibold">Vendor Management</h3>
            </div>
            <p className="text-gray-300 mb-4">Manage supplier relationships</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded transition-colors">
                View Vendors
              </button>
              <button className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors">
                Add
              </button>
            </div>
          </div>

          {/* Location Management */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-xl font-semibold">Location Management</h3>
            </div>
            <p className="text-gray-300 mb-4">Manage routes and destinations</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-red-600 hover:bg-red-700 py-2 px-4 rounded transition-colors">
                View Locations
              </button>
              <button className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors">
                Add
              </button>
            </div>
          </div>

          {/* Categories & Types */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-indigo-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <h3 className="text-xl font-semibold">Categories & Types</h3>
            </div>
            <p className="text-gray-300 mb-4">Manage cargo types and categories</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded transition-colors">
                View Categories
              </button>
              <button className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors">
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Master Data Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Clients:</span>
                <span className="font-semibold">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Active Vehicles:</span>
                <span className="font-semibold">28</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Employees:</span>
                <span className="font-semibold">32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Vendors:</span>
                <span className="font-semibold">18</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Recent Additions</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-sm">New client: ABC Transport</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span className="text-sm">Vehicle added: TRK-045</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                <span className="text-sm">Employee: John Smith</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <span className="text-sm">Location: Port Rashid</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Data Health</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Complete Profiles:</span>
                <span className="text-green-400 font-semibold">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Pending Updates:</span>
                <span className="text-yellow-400 font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Data Quality:</span>
                <span className="text-green-400 font-semibold">Excellent</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Last Backup:</span>
                <span className="text-gray-300 font-semibold text-sm">2h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}