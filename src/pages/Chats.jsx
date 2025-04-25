import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { setGlobalState, useGlobalState, truncate } from '../store'
import Identicon from 'react-identicons'
import { getMessages, sendMessage, listenForMessage } from '../services/chat'
import { Header } from '../components'
import { motion, AnimatePresence } from 'framer-motion'

const Chats = () => {
  const { id } = useParams()
  const [messages] = useGlobalState('messages')
  const [currentUser] = useGlobalState('currentUser')
  const [message, setMessage] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    getMessages(id).then((msgs) => setGlobalState('messages', msgs))
    const unsubscribe = listenForMessage(id).then((msg) => {
      setGlobalState('messages', (prev) => [...prev, msg])
      scrollToBottom()
    })

    return () => unsubscribe && unsubscribe()
  }, [currentUser])

  const onSendMessage = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const msg = await sendMessage(id, message)
    setGlobalState('messages', (prev) => [...prev, msg])
    setMessage('')
    scrollToBottom()
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <>
      <Header />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-[calc(100vh-6rem)] max-w-3xl mx-auto border border-amber-500/30 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black mt-6 shadow-xl shadow-amber-500/10"
      >
        {/* Chat Header */}
        <motion.div 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="bg-gradient-to-r from-amber-900/50 to-amber-800/30 py-4 px-6 text-lg font-serif font-semibold sticky top-0 z-10 border-b border-amber-500/20"
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Identicon string={id} size={24} className="rounded-full border border-amber-400/50" />
            </motion.div>
            <span className="text-amber-300">Conversation with </span>
            <span className="text-white font-mono">{truncate(id, 4, 4, 11)}</span>
          </div>
        </motion.div>

        {/* Chat Messages */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/80 to-black/80 scrollbar-thin scrollbar-thumb-amber-900/50"
        >
          {messages.length ? (
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                >
                  <Message
                    message={msg.text}
                    uid={msg.sender.uid}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mt-10 p-6 bg-amber-900/10 rounded-xl border border-amber-500/20 backdrop-blur-sm"
            >
              <motion.div 
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="mx-auto h-12 w-12 text-amber-400 mb-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </motion.div>
              <p className="text-amber-300 font-serif">No messages yet</p>
              <p className="text-amber-200/60 text-sm mt-1">Send the first golden message</p>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </motion.div>

        {/* Input Area */}
        <motion.form
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onSubmit={onSendMessage}
          className="flex items-center border-t border-amber-500/20 px-4 py-3 bg-gradient-to-r from-amber-900/30 to-amber-800/20"
        >
          <motion.input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-800/70 text-amber-100 border border-amber-500/30 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder-amber-500/50"
            placeholder="Type your golden words..."
            whileFocus={{ 
              scale: 1.02,
              boxShadow: "0 0 0 2px rgba(245, 158, 11, 0.5)"
            }}
          />
          <motion.button
            type="submit"
            className="ml-3 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-amber-500/20"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(245, 158, 11, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Send
          </motion.button>
        </motion.form>
      </motion.div>
    </>
  )
}

const Message = ({ message, uid }) => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const isSender = uid === connectedAccount

  return (
    <motion.div 
      className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
      whileHover={{ scale: 1.01 }}
    >
      <motion.div
        className={`max-w-[70%] px-4 py-3 rounded-xl shadow-lg ${
          isSender
            ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black rounded-br-none'
            : 'bg-gray-800/70 text-amber-100 border border-amber-500/20 rounded-bl-none'
        }`}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <motion.div
            whileHover={{ rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <Identicon 
              string={uid} 
              size={20} 
              className={`rounded-full ${isSender ? 'border border-amber-600' : 'border border-amber-400/50'}`} 
            />
          </motion.div>
          <span className={`text-xs font-semibold ${isSender ? 'text-amber-800' : 'text-amber-400/70'}`}>
            {truncate(uid, 4, 4, 11)}
          </span>
        </div>
        <p className={isSender ? 'text-gray-900' : 'text-amber-100'}>{message}</p>
      </motion.div>
    </motion.div>
  )
}

export default Chats