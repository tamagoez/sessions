import { useContext } from "react";
import UserContext from "~/lib/UserContext";
import { deleteMessage } from "~/lib/Store";
import TrashIcon from "~/components/TrashIcon";
import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { AvatarUrl } from "~/components/Avatar";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { MdOutlineThumbUpAlt, MdOutlineThumbDownAlt } from "react-icons/md";
import EngagementIcon from "~/components/EngagementIcon";
import { getEng } from "~/lib/Eng";
const { DateTime } = require("luxon");
import { getStatus, getDate } from "~/lib/Status";
// import Image from "next/image";

export function Message({ message }) {
  const { user, userRoles } = useContext(UserContext);

  function delconf(mid) {
    const confresult = confirm("Do you want to delete this message?");
    if (confresult) {
      deleteMessage(mid);
    }
  }

  function getURL(id) {
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

  function imgavatar(id, username) {
    const myLoader = ({ src, width, quality }) => {
      return `${getURL(src)}`;
    };
    if (id) {
      return (
        <Image
          src={getURL(id)}
          alt={"Avatar of " + username}
          placeholder="blur"
          width={100}
          height={100}
          unoptimized={false}
        />
      );
    } else {
      return null;
    }
  }

  function loadstatus(id) {
    const status = getStatus(id);
    console.log("[loadstatus] return: " + status);
    return status;
  }

  function getonlinedate(id) {
    //const originaldate = getDate(id);
    //const statusdate = replacetz(originaldate);
    //console.log("[getonlinedate] return: " + originaldate);
    //return statusdate;
    return "軽量化のために削除";
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
        {user?.id !== message.userid && (
          <div className="dropdown dropdown-right dropdown-end">
            <label tabindex="0">
              <EngagementIcon />
            </label>
            <ul
              tabindex="0"
              className="text-base-content dropdown-content p-2 menu menu-horizontal bg-base-100 rounded-box"
            >
              <li>
                {getEng("heart", message.id, user?.id) ? (
                  <a className="active">
                    <HiHeart />
                  </a>
                ) : (
                  <a>
                    <HiOutlineHeart />
                  </a>
                )}
              </li>
              <li>
                <a>
                  <MdOutlineThumbUpAlt />
                </a>
              </li>
              <li>
                <a>
                  <MdOutlineThumbDownAlt />
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="dropdown dropdown-right dropdown-end">
        <label
          tabindex="0"
          className={
            loadstatus(message.author.id)
              ? "btn btn-ghost btn-circle avatar online"
              : "btn btn-ghost btn-circle avatar offline"
          }
        >
          <div className="w-10 rounded-full">
            <img
              src={getURL(message.author.id)}
              alt={message.author.username}
            />
          </div>
        </label>
        <div
          tabindex="0"
          class="divide-y divide-dashed dropdown-content p-3 shadow bg-base-100 rounded-box w-52"
        >
          <div className="mb-1.5">
            <p className="text-lg font-bold">{message.author.username}</p>
            <p className="text-xs">{message.author.id}</p>
            <p className="text-xs">
              Online: {getonlinedate(message.author.id)}
            </p>
          </div>
          <div className="pt-1.5">
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
            <ReactMarkdown
              remarkPlugins={[gfm]}
              unwrapDisallowed={false}
              linkTarget="_blank"
            >
              {message.message}
            </ReactMarkdown>
          </p>
        </div>
      </div>
    </div>
  );
};

export function MessageSM({ message }) {
  const { user, userRoles } = useContext(UserContext);

  function delconf(mid) {
    const confresult = confirm("Do you want to delete this message?");
    if (confresult) {
      deleteMessage(mid);
    }
  }

  function getURL(id) {
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

  function imgavatar(id, username) {
    const myLoader = ({ src, width, quality }) => {
      return `${getURL(src)}`;
    };
    if (id) {
      return (
        <Image
          src={getURL(id)}
          alt={"Avatar of " + username}
          placeholder="blur"
          width={100}
          height={100}
          unoptimized={false}
        />
      );
    } else {
      return null;
    }
  }

  function loadstatus(id) {
    const status = getStatus(id);
    console.log("[loadstatus] return: " + status);
    return status;
  }

  function getonlinedate(id) {
    //const originaldate = getDate(id);
    //const statusdate = replacetz(originaldate);
    //console.log("[getonlinedate] return: " + originaldate);
    //return statusdate;
    return "軽量化のために削除";
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
        {user?.id !== message.userid && (
          <div className="dropdown dropdown-right dropdown-end">
            <label tabindex="0">
              <EngagementIcon />
            </label>
            <ul
              tabindex="0"
              className="text-base-content dropdown-content p-2 menu menu-horizontal bg-base-100 rounded-box"
            >
              <li>
                {getEng("heart", message.id, user?.id) ? (
                  <a className="active">
                    <HiHeart />
                  </a>
                ) : (
                  <a>
                    <HiOutlineHeart />
                  </a>
                )}
              </li>
              <li>
                <a>
                  <MdOutlineThumbUpAlt />
                </a>
              </li>
              <li>
                <a>
                  <MdOutlineThumbDownAlt />
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="dropdown dropdown-right dropdown-end">
        <div
          tabindex="0"
          class="divide-y divide-dashed dropdown-content p-3 shadow bg-base-100 rounded-box w-52"
        >
          <div className="mb-1.5">
            <p className="text-lg font-bold">{message.author.username}</p>
            <p className="text-xs">{message.author.id}</p>
            <p className="text-xs">
              Online: {getonlinedate(message.author.id)}
            </p>
          </div>
          <div className="pt-1.5">
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
            <ReactMarkdown
              remarkPlugins={[gfm]}
              unwrapDisallowed={false}
              linkTarget="_blank"
            >
              {message.message}
            </ReactMarkdown>
          </p>
        </div>
      </div>
    </div>
  );
};

/* {document.querySelector('#Message').innerHTML = returnmessage(message.message, message.id, message.author.username)} */