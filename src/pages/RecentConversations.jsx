import { useEffect } from 'react'
import { getConversations } from '../services/chat'
import { Link } from 'react-router-dom'
import { setGlobalState, useGlobalState, truncate } from '../store'
import Identicon from 'react-identicons'
import { Header } from '../components'

const RecentConversations = () => {
  const [recentConversations] = useGlobalState('recentConversations')
  const [currentUser] = useGlobalState('currentUser')

  useEffect(() => {
    getConversations().then((users) =>
      setGlobalState('recentConversations', users)
    )
  }, [currentUser])

  return (
    <>
      <Header />

      <div className="max-w-2xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
            Your Conversations
          </h1>
          
          <div className="space-y-4">
            {recentConversations?.map((conversation, index) => (
              <Link
                className="flex items-center space-x-4 p-4 hover:bg-indigo-50 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.01] border border-gray-100 hover:border-indigo-200"
                to={`/chats/${conversation.conversationWith.uid}`}
                key={index}
              >
                <div className="relative">
                  <Identicon
                    className="rounded-full shadow-md bg-white p-1"
                    string={conversation.conversationWith.uid}
                    size={40}
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-medium text-gray-800 truncate">
                    {conversation.conversationWith.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    @{truncate(conversation.conversationWith.uid, 4, 4, 11)}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            ))}
            
            {recentConversations.length < 1 && (
              <div className="text-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-500">
                  No conversations yet
                </h3>
                <p className="mt-1 text-gray-400">
                  Start a new chat to see it appear here
                </p>
                <Link
                  to="/contacts"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Find someone to chat with
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default RecentConversations