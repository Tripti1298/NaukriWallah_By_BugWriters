import React, { useEffect } from 'react'
import { getBidders, getJob } from '../services/blockchain'
import { useParams } from 'react-router-dom'
import { useGlobalState } from '../store'
import { ApplicantsCard, Header } from '../components'

const ViewBidders = () => {
  const { id } = useParams()
  const [bidders] = useGlobalState('bidders')
  const [job] = useGlobalState('job')

  const fetchBidders = async () => {
    await getBidders(id)
    await getJob(id)
  }

  useEffect(() => {
    fetchBidders()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {job?.title || 'Job Applicants'}
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                !job?.listed 
                  ? 'bg-red-100 text-red-800' 
                  : bidders?.length > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {!job?.listed 
                  ? 'Position Filled' 
                  : bidders?.length > 0 
                    ? `${bidders.length} Applicants` 
                    : 'Awaiting Applicants'}
              </span>
            </div>
            <p className="mt-1 text-gray-600">
              {bidders?.length > 0 
                ? 'Review applications below' 
                : !job?.listed 
                  ? 'This position has been filled' 
                  : 'Check back later for applicants'}
            </p>
          </div>

          {/* Applicants List */}
          <div className="divide-y divide-gray-200">
            {bidders?.length > 0 ? (
              bidders.map((bidder, i) => (
                <div 
                  key={i}
                  className="transition-all duration-150 hover:bg-gray-50"
                >
                  <ApplicantsCard bidder={bidder} />
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {!job?.listed 
                    ? 'Position Filled' 
                    : 'No applicants yet'}
                </h3>
                <p className="mt-2 text-gray-500 max-w-md mx-auto">
                  {!job?.listed
                    ? 'This job position has been successfully filled.'
                    : 'Potential candidates will appear here once they apply.'}
                </p>
                {job?.listed && (
                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Share this job
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewBidders