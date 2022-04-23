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
              <a>
                @ {sessionname}　
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul class="menu menu-horizontal p-2 bg-base-100">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>
                # {channelname}　
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
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
                <a href="/update">Update</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">{navtitle}</div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
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
            <div class="card w-96 bg-base-100 shadow-xl dropdown-content">
              <div class="card-body">
                <h2 class="card-title">Ver. 0.5.1</h2>
                <ul>
                  <li>ファイルをアップロードできるようになりました。(仮)</li>
                  <li>オンラインインジケーターのコードを調節/修正しました。</li>
                  <li>送信ボタンを追加しました。</li>
                  <li>
                    react-markdownの設定を変更し、装飾のバリエーションが増え、URLは新規タブで開くようになりました。
                  </li>
                </ul>
                <div class="card-actions justify-end">
                  <a href="/update" className="btn btn-primary">
                    詳しく見る
                  </a>
                </div>
              </div>
            </div>
          </div>
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
                <select data-choose-theme className="select w-full max-w-xs">
                  <option value="">Default</option>
                  <option value="dark">Dark</option>
                  <option value="winter">Winter</option>
                  <option value="emerald">Emerald</option>
                  <option value="cmyk">CMYK</option>
                  <option value="black">Black</option>
                  <option value="cupcake">Cupcake</option>
                  <option value="lofi">Lofi</option>
                </select>
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
