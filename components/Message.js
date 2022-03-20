import { useContext } from "react";
import UserContext from "~/lib/UserContext";
import { deleteMessage } from "~/lib/Store";
import TrashIcon from "~/components/TrashIcon";
import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const Message = ({ message }) => {
  const { user, userRoles } = useContext(UserContext);

  function delconf(mid) {
    const confresult = confirm("Do you want to delete this message?");
    if (confresult) {
      deleteMessage(mid);
    }
  }

  return (
    <div className="py-1 flex items-center space-x-2">
      <div className="text-gray-100 w-4">
        {(user?.id === message.userid ||
          userRoles.some((role) => ["admin", "moderator"].includes(role))) && (
          <button onClick={() => delconf(message.id)}>
            <TrashIcon />
          </button>
        )}
      </div>
      <div id="Message">
        <p className="text-black font-bold" id={message.id}>
          {message.author.username}
        </p>
        <p className="text-black">
          <ReactMarkdown plugins={[gfm]} unwrapDisallowed={false}>
            {message.message}
          </ReactMarkdown>
        </p>
      </div>
    </div>
  );
};

/* {document.querySelector('#Message').innerHTML = returnmessage(message.message, message.id, message.author.username)} */

export default Message;
