import { useContext } from "react";
import UserContext from "~/lib/UserContext";
import { deleteMessage } from "~/lib/Store";
import TrashIcon from "~/components/TrashIcon";
import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { AvatarUrl } from "~/components/Avatar";
const { DateTime } = require("luxon");

const Message = ({ message }) => {
  const { user, userRoles } = useContext(UserContext);

  function delconf(mid) {
    const confresult = confirm("Do you want to delete this message?");
    if (confresult) {
      deleteMessage(mid);
    }
  }

  function getURL(id) {
    // const defgot = "https://hygtcrytqmrpkximlbnx.supabase.in/storage/v1/object/sign/avatars/default.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL2RlZmF1bHQuc3ZnIiwiaWF0IjoxNjQ3OTUyNTYxLCJleHAiOjE5NjMzMTI1NjF9.BJfe97pv_5zPCe0eWPVFYktfVLUfsveX6uBjatX_b6M";
    const urlgot = AvatarUrl(id);
    return urlgot;
  }

  function replacetz(time) {
    // const systemtz = DateTime.now().locale;
    // Settings.defaultZone = "system";
    const defaulttime = DateTime.fromISO(time);
    const rezoned = defaulttime.setZone(DateTime.local().zoneName);
    return rezoned.toFormat("ff").toString();
  }

  return (
    <div
      className={
        user?.id === message.userid
          ? "py-1 flex justify-items-end items-center space-x-3"
          : "py-1 flex items-center space-x-3"
      }
    >
      <div className="text-gray-300 w-4">
        {(user?.id === message.userid ||
          userRoles.some((role) => ["admin", "moderator"].includes(role))) && (
          <button onClick={() => delconf(message.id)}>
            <TrashIcon />
          </button>
        )}
      </div>
      <div class="dropdown dropdown-right dropdown-end">
        <label tabindex="0" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              src={getURL(message.userid)}
              alt={"Avatar of " + message.author.username}
            />
          </div>
        </label>
        <div
          tabindex="0"
          class="divide-y divide-dashed dropdown-content p-2 shadow bg-base-100 rounded-box w-52"
        >
          <div>
            <p className="text-lg font-bold">{message.author.username}</p>
            <p className="text-xs">{message.author.id}</p>
          </div>
          <div>
            <p>{replacetz(message.created_at)}</p>
            <p>ID: {message.id}</p>
          </div>
        </div>
      </div>
      <div id="Message">
        <p className="text-black font-bold" id={message.id}>
          {message.author.username}
        </p>
        <p className="text-slate-500 text-sm">
          {replacetz(message.created_at)}
        </p>
        <div
          className={
            user?.id === message.userid
              ? "rounded-bl-xl shadow-md justify-items-center"
              : "rounded-br-xl shadow-md"
          }
        >
          <p className="text-black-900 m-2">
            <ReactMarkdown plugins={[gfm]} unwrapDisallowed={false}>
              {message.message}
            </ReactMarkdown>
          </p>
        </div>
      </div>
    </div>
  );
};

/* {document.querySelector('#Message').innerHTML = returnmessage(message.message, message.id, message.author.username)} */

export default Message;
