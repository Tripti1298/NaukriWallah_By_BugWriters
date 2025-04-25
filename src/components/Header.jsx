import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connectWallet } from '../services/blockchain'
import { truncate, useGlobalState } from '../store'
import { BsList, BsX } from 'react-icons/bs'
import MobileHeader from './MobileHeader'

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="bg-black w-full mx-auto p-5 flex justify-between items-center border-b border-amber-500/20 sticky top-0 z-50 backdrop-blur-sm bg-opacity-80">
      <Link 
        className="text-amber-400 font-serif text-3xl font-bold tracking-wider" 
        to={'/'}
      >
        NaukriWallah
      </Link>
      
      <div className="items-center space-x-8 md:block hidden">
        <Link 
          to={'/mybids'} 
          className="text-gray-300 hover:text-amber-400 transition-colors duration-300"
        >
          My Bids
        </Link>
        <Link 
          to={'/myjobs'} 
          className="text-gray-300 hover:text-amber-400 transition-colors duration-300"
        >
          My Jobs
        </Link>
        <Link 
          to={'/myprojects'} 
          className="text-gray-300 hover:text-amber-400 transition-colors duration-300"
        >
          My Projects
        </Link>
        <Link 
          to={'/messages'} 
          className="text-gray-300 hover:text-amber-400 transition-colors duration-300"
        >
          Messages
        </Link>

        {connectedAccount ? (
          <button className="bg-gradient-to-r from-amber-600 to-amber-800 text-black font-medium py-2 px-6 rounded-full hover:shadow-lg hover:shadow-amber-500/20 transition-all">
            {truncate(connectedAccount, 4, 4, 11)}
          </button>
        ) : (
          <button
            className="bg-gradient-to-r from-amber-600 to-amber-800 text-black font-medium py-2 px-6 rounded-full hover:shadow-lg hover:shadow-amber-500/20 transition-all"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>

      <div className="md:hidden block relative" onClick={handleToggle}>
        {!isOpen ? (
          <BsList className="text-2xl cursor-pointer text-amber-400" />
        ) : (
          <BsX className="text-2xl cursor-pointer text-amber-400" />
        )}
        <MobileHeader toggle={isOpen} />
      </div>
    </header>
  )
}

export default Header