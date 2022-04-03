import { useContext } from "react";
import UserContext from "~/lib/UserContext";
import { deleteMessage } from "~/lib/Store";
import TrashIcon from "~/components/TrashIcon";
import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { AvatarUrl } from "~/components/Avatar";
const { DateTime } = require("luxon");
import Image from 'next/image'

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
  
  const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

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
            {if (message.userid){
             return (
            <Image
              src={getURL(message.userid)}
              alt={"Avatar of " + message.author.username}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              width={100}
              height={100}
            />
            )}
            }
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
        <p className="text-base-content font-bold" id={message.id}>
          {message.author.username}
        </p>
        <p className="text-slate-400 text-sm">
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
