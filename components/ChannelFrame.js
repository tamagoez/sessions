import { getWindowSize } from "~/utils/GetWindowSize";
import { ImNewTab } from "react-icons/im";

export default function ChannelFrame({ id, sid }) {
  if (process.browser) {
    const { height } = getWindowSize();
  } else {
    const height = 500;
  }

  if (process.browser) {
    //document.getElementById("chat-frame").style.display = "hidden";
    //document.getElementById("chat-frame").onload = function () {
    //  alert("myframe is loaded");
    //};
    // const subwinurl = "window.open('" + "/app/frame/chat/" + id + "/" + sid + "','subwin','width=300,height=300'); return false;"
  }

  function subwinopen() {
    window.open(
      "/app/frame/chat/" + id + "/" + sid,
      "subwin",
      "width=400,height=500"
    );
    return false;
  }

  return (
    <div>
      <div class="drawer drawer-mobile w-full">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex items-center justify-center">
          <div class="flex-col lg:hidden">
            <label for="my-drawer-2" class="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <button
              className="btn btn-square btn-ghost"
              onClick={() => subwinopen()}
            >
              <ImNewTab />
            </button>
          </div>
          <div class="divider divider-horizontal" />
          <iframe
            id="chat-frame"
            title="Chat Frame"
            width="100%"
            height={height - 50}
            src={"/app/frame/chat/" + id + "/" + sid}
          ></iframe>
        </div>
        <div class="drawer-side">
          <label for="my-drawer-2" class="drawer-overlay"></label>
          <ul class="menu p-4 overflow-y-auto w-64 bg-base-100 text-base-content">
            <li class="hover-bordered">
              <a onClick={() => subwinopen()}>
                <ImNewTab /> Open in child window
              </a>
            </li>
            <li>
              <a href="/app/chat/1/1">Testの奴</a>
            </li>
            <li>
              <a href="/app/chat/5/1">雑談用の八奴</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
