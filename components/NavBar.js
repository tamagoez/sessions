import { AvatarUrl } from "./Avatar";
import supabase from "~/utils/supabaseClient";

export default function NavBar({ channelname, sessionname, thispage }) {
  const user = supabase.auth.user();

  function getnavtitle() {
    if (channelname) {
      return (
        <div className="text-sm breadcrumbs">
          <ul>
            <li className="hidden md:block">
              <a className="btn btn-ghost normal-case text-lg" href="/app/chat">
                Chat
              </a>
            </li>
            <li className="hidden sm:block">
              <div className="dropdown">
  <label tabindex="0" className="btn m-1">@ {sessionname}</label>
  <ul tabindex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
            </li>
            <li>
              <div className="dropdown">
  <label tabindex="0" className="btn m-1"># {channelname}</label>
  <ul tabindex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
            </li>
          </ul>
        </div>
      );
    } else if (sessionname) {
      return (
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a
                className="btn btn-ghost normal-case text-lg visible"
                href="/app/chat"
              >
                Chat
              </a>
            </li>
            <li>
              <a className="btn btn-ghost normal-case text-xl">
                @ {sessionname}
              </a>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a
                className="btn btn-ghost normal-case text-xl"
                href="/app/dashboard"
              >
                Sessions
              </a>
            </li>
            <li>
              <a className="btn btn-ghost normal-case text-xl">{thispage}</a>
            </li>
          </ul>
        </div>
      );
    }
  }

  if (user) {
    console.log("[NavBar] Got props: " + channelname + " / " + sessionname);
    if (!user.id) {
      return null;
    } else {
      const AURL = AvatarUrl(user.id);
      return getnavbar(AURL);
    }
  } else {
    console.log("not user");
    return null;
  }

  function getnavbar(avatarurl) {
    const navtitle = getnavtitle();
    return (
      <div className="navbar bg-base-100 mb-2 shadow-md rounded-box">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabindex="0" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabindex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="/app/dashboard">Dashboard</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">{navtitle}</div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
          <div className="dropdown dropdown-end">
            <label tabindex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={avatarurl} />
              </div>
            </label>
            <ul
              tabindex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>
                  <button data-toggle-theme="dark,light" data-act-class="ACTIVECLASS" />
                </a>
              </li>
              <li>
                <a className="justify-between" href="/profile">
                  Profile
                </a>
              </li>
              <li>
                <a href="/settings">
                  Settings<span className="badge">New</span>
                </a>
              </li>
              <li>
                <a href="/logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
