import { useState } from 'react'

const MessageInput = ({ onSubmit }) => {
  const [messageText, setMessageText] = useState('')

  const submitOnEnter = (event) => {
    // Watch for enter key
    if (event.keyCode === 13) {
      onSubmit(messageText)
      setMessageText('')
    }
  }

  return (
    <>
      <input
        className="bg-gray-600 appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:shadow-outline"
        type="text"
        placeholder="Send a message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => submitOnEnter(e)}
      />
    </>
  )
}

export default MessageInput
