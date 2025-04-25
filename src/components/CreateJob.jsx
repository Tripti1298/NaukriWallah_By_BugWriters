import React, { useState } from 'react'
import { setGlobalState, truncate, useGlobalState } from '../store'
import { FaTimes, FaPlus } from 'react-icons/fa'
import { SiEthereum } from 'react-icons/si'
import { addJobListing } from '../services/blockchain'
import { toast } from 'react-toastify'

const CreateJob = () => {
  const [createModal] = useGlobalState('createModal')
  const [jobTitle, setJobTitle] = useState('')
  const [prize, setPrize] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')

  const closeModal = () => {
    setGlobalState('createModal', 'scale-0')
    setJobTitle('')
    setPrize('')
    setDeadline('')
    setDescription('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (jobTitle === '' || prize === '' || deadline === '' || description === '')
      return

    const params = {
      jobTitle,
      description,
      deadline,
      prize,
    }

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await addJobListing(params)
          .then(async (tx) => {
            closeModal()
            resolve(tx)
          })
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'Job added successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
      bg-gradient-to-br from-[#232526] via-[#414345] to-[#232526] bg-opacity-70 z-50 transition-transform duration-300 ${createModal}`}
      style={{
        backgroundImage: `url('https://cryptologos.cc/logos/ethereum-eth-logo.png'), linear-gradient(135deg, #232526 0%, #414345 100%)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10% bottom 10%',
        backgroundSize: '120px, cover',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div className="bg-white/10 dark:bg-[#1a1a1a]/80 shadow-xl shadow-emerald-500/40 rounded-2xl w-11/12 md:w-2/5 h-[80vh] p-8 relative border border-emerald-400/30 backdrop-blur-md"
        style={{
          boxShadow: '0 8px 32px 0 rgba(34, 193, 195, 0.25), 0 1.5px 5px 0 rgba(52, 73, 94, 0.15)',
        }}
      >
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-emerald-400 via-blue-400 to-purple-500 rounded-full p-3 shadow-lg shadow-emerald-500/30">
          <SiEthereum size={36} className="text-white drop-shadow-lg" />
        </div>
        <button
          onClick={closeModal}
          className="border-0 bg-transparent focus:outline-none absolute top-4 right-4 text-gray-400 hover:text-emerald-400 transition"
        >
          <FaTimes size={22} />
        </button>
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-8 text-emerald-400 tracking-wide">Create a Job</h3>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-1">
              <label htmlFor="jt" className="font-semibold text-sm text-gray-300">Job Title</label>
              <input
                id="jt"
                value={jobTitle}
                placeholder="e.g. Content Writer..."
                type="text"
                className="rounded-md text-sm px-3 py-2 bg-white/20 dark:bg-black/30 text-white focus:ring-2 focus:ring-emerald-400"
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="prize" className="font-semibold text-sm text-gray-300">Prize (ETH)</label>
              <input
                id="prize"
                value={prize}
                placeholder="eg. 0.04"
                step={0.0001}
                type="number"
                className="rounded-md text-sm px-3 py-2 bg-white/20 dark:bg-black/30 text-white focus:ring-2 focus:ring-emerald-400"
                onChange={(e) => setPrize(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="deadline" className="font-semibold text-sm text-gray-300">Deadline</label>
              <input
                id="deadline"
                type="date"
                value={deadline}
                className="rounded-md text-sm px-3 py-2 bg-white/20 dark:bg-black/30 text-white focus:ring-2 focus:ring-emerald-400"
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="desc" className="font-semibold text-sm text-gray-300">Description</label>
              <textarea
                id="desc"
                value={description}
                placeholder="Write something beautiful..."
                className="rounded-md px-3 py-2 bg-white/20 dark:bg-black/30 text-white focus:ring-2 focus:ring-emerald-400 text-sm min-h-[80px]"
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <button
                className="px-9 py-2 bg-gradient-to-tr from-emerald-400 via-blue-400 to-purple-500 text-white rounded-md font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Floating Plus Button Component
const FloatingPlusButton = () => (
  <div className="fixed bottom-8 right-8 z-40">
    <div
      className="bg-gradient-to-tr from-emerald-400/80 via-blue-400/80 to-purple-500/70 shadow-xl rounded-2xl p-4 flex items-center justify-center
      border border-emerald-300/40 backdrop-blur-lg hover:scale-105 transition-transform cursor-pointer"
      style={{
        boxShadow: '0 4px 32px 0 rgba(52, 211, 153, 0.25)',
        minWidth: 72,
        minHeight: 72,
      }}
      onClick={() => setGlobalState('createModal', 'scale-100')}
    >
      <span className="relative flex items-center">
        <FaPlus size={32} className="text-white drop-shadow-lg" />
        <SiEthereum
          size={18}
          className="absolute -top-3 -right-3 text-emerald-300/80 opacity-70 animate-pulse"
        />
      </span>
    </div>
  </div>
)

// Main Exported Component
const CreateJobPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#232526] to-[#18181b] relative overflow-x-hidden">
    {/* Texture overlays for subtle ethereum hint */}
    <div className="pointer-events-none fixed inset-0 z-0 opacity-10">
      <SiEthereum className="absolute left-1/4 top-1/4 text-emerald-400" size={180} />
      <SiEthereum className="absolute right-1/4 bottom-1/4 text-purple-500" size={120} />
    </div>
    {/* Main content */}
    <div className="relative z-10 flex flex-col items-center justify-center pt-32">
      <h1 className="text-4xl font-extrabold text-emerald-400 drop-shadow-lg mb-6">
        Find &amp; Create Blockchain Jobs
      </h1>
      <p className="text-lg text-gray-300 mb-12">
        Post your opportunity and let the Ethereum community shine!
      </p>
    </div>
    <FloatingPlusButton />
    <CreateJob />
  </div>
)

export default CreateJobPage