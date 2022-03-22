import { getWindowSize } from "~/utils/GetWindowSize";

export default function ChannelFrame({ id, sid }) {
  if (process.browser) {
    const { height } = getWindowSize();
  } else {
    const height = 1000;
  }
  return (
    <div class="drawer drawer-mobile w-full">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex items-center justify-center">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-2" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <iframe
          id="chat-frame"
          title="Chat Frame"
          width="100%"
          height={height - 100}
          src={
            "https://web-sessions.vercel.app/app/frame/chat/" + id + "/" + sid
          }
        ></iframe>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-64 bg-base-100 text-base-content">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
