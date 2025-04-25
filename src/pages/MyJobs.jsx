import React from 'react'
import { Header, JobBid } from '../components'
import { useGlobalState } from '../store'

const MyJobs = () => {
  const [mygigs] = useGlobalState('mygigs')

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-500 font-serif mb-3">
            {mygigs.length > 0 ? 'Your Golden Tasks' : 'Your Tasks'}
          </h1>
          <p className="text-lg text-amber-200/80 max-w-2xl mx-auto">
            {mygigs.length > 0
              ? 'Tasks illuminated by golden opportunity'
              : 'Your golden opportunities await assignment'}
          </p>
        </div>

        {mygigs.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
            {mygigs.map((mygig, i) => (
              <div
                key={i}
                className="bg-gray-800/50 rounded-xl p-6 border border-amber-600/40 backdrop-blur-sm transition-all hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10"
              >
                <JobBid jobListing={mygig} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-800/40 rounded-xl border border-amber-600/40">
            <div className="mx-auto h-20 w-20 text-amber-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-amber-500 mb-2 font-serif">
              No Tasks Assigned
            </h3>
            <p className="text-amber-200/70 mb-6 max-w-md mx-auto">
              Your golden tasks will appear here when assigned
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default MyJobs