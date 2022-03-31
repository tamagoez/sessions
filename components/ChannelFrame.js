import { getWindowSize } from "~/utils/GetWindowSize";
import { ImNewTab } from "react-icons/im";
import NavBar from "~/components/NavBar";

export default function ChannelFrame({ id, sid, sessionname, channelname }) {
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
      "width=400,height=550"
    );
    return false;
  }

  return (
    <div>
      <iframe
        id="chat-frame"
        title="Chat Frame"
        width="100%"
        height={height - 100}
        src={"/app/frame/chat/" + id + "/" + sid}
      ></iframe>
    </div>
  );
}
