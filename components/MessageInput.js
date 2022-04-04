import { useState } from "react";

const MessageInput = ({ onSubmit }) => {
  const [messageText, setMessageText] = useState("");

  const submitOnEnter = (event) => {
    // Watch for enter key
    if (event.keyCode === 13) {
      onSubmit(messageText);
      setMessageText("");
    }
  };

  return (
    <>
      <input
        className="bg-base-100 border border-solid border-gray-300 appearance-none rounded w-full py-2 px-3 text-black-800 leading-tight focus:shadow-outline"
        type="text"
        placeholder="Type a Message (MarkDown available)"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => submitOnEnter(e)}
      />
    </>
  );
};

export default MessageInput;
