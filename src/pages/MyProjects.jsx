import React from 'react'
import {
  DeleteJob,
  Header,
  JobListingOwnerActions,
  Payout,
  UpdateJob,
} from '../components'
import { useGlobalState } from '../store'

const MyProjects = () => {
  const [myjobs] = useGlobalState('myjobs')
  const [connectedAccount] = useGlobalState('connectedAccount')

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-amber-500 sm:text-4xl font-serif">
            {myjobs.length > 0 ? 'Your Golden Projects' : 'Your Projects'}
          </h1>
          <p className="mt-3 text-lg text-gray-300">
            {myjobs.length > 0
              ? 'Manage your precious creations'
              : 'Your golden opportunities await'}
          </p>
        </div>

        <div className="space-y-6">
          {myjobs.length > 0 ? (
            myjobs.map((myjob, i) => (
              <div 
                key={i}
                className="bg-gray-800/50 rounded-xl p-6 border border-amber-500/20 backdrop-blur-sm transition-all hover:border-amber-500/40"
              >
                <JobListingOwnerActions
                  jobListing={myjob}
                  editable={myjob.owner == connectedAccount}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-gray-800/50 rounded-xl border border-amber-500/20 backdrop-blur-sm">
              <div className="mx-auto h-24 w-24 text-amber-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-amber-400 mb-2 font-serif">
                No Projects Yet
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                When you create projects, they'll appear here in all their golden glory
              </p>
            </div>
          )}
        </div>

        {/* Modals */}
        <div className="hidden">
          <UpdateJob />
          <DeleteJob />
          <Payout />
        </div>
      </div>
    </div>
  )
}

export default MyProjects