import React from 'react'
import { Header, JobBid } from '../components'
import { useGlobalState } from '../store'

const MyBids = () => {
  const [mybidjobs] = useGlobalState('mybidjobs')

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-100">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-amber-500 sm:text-4xl font-serif">
            {mybidjobs.length > 0 ? 'Your Golden Opportunities' : 'Your Applications'}
          </h1>
          <p className="mt-3 text-lg text-gray-300">
            {mybidjobs.length > 0
              ? 'All your precious bids in one sacred space'
              : 'Your golden opportunities will manifest here'}
          </p>
        </div>

        {mybidjobs.length > 0 ? (
          <div className="space-y-6">
            {mybidjobs.map((mybidjob, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow-lg border border-amber-500/20 overflow-hidden transition-all duration-300 hover:shadow-amber-500/10 hover:border-amber-400/30"
              >
                <JobBid jobListing={mybidjob} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/50 rounded-xl p-12 text-center border border-amber-500/20 backdrop-blur-sm">
            <div className="mx-auto h-24 w-24 text-amber-400 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-amber-300 mb-2 font-serif">
              No bids yet
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Your golden opportunities will appear here when you place your bids
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBids