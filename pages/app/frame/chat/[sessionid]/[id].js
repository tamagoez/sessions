import Layout from "~/components/Layout";
import Message from "~/components/Message";
import MessageInput from "~/components/MessageInput";
import { useRouter } from "next/router";
import { useStore, addMessage, additionalload } from "~/lib/Store";
import { useContext, useEffect, useRef, useState, useMemo } from "react";
import UserContext from "~/lib/UserContext";
// import { CheckSessionMember, CheckChannelMember } from "~/lib/CheckUser";
import supabase from "~/utils/supabaseClient";
// import { ChannelName, SessionName } from "~/lib/GetName";
import getfromsec from "~/lib/GetFromSec";
// import { HashLoader } from "react-spinners";
import ReactLoading from "react-loading";
import InfiniteScroll from "react-infinite-scroller";
import getUA from '~/lib/getUA'

// import deleteLStorage from "~/utils/deleteLStorage";

const ChannelsPage = (props) => {
  const router = useRouter();
  const smartphone = useMemo(() => getUA(), []);
  const { id: secondchannelId, sessionid: sessionId } = router.query;
  if (!router.isReady) {
    return null;
  }

  if (secondchannelId === 0) {
    return null;
  }

  const channelId = getfromsec(sessionId, secondchannelId);

  const { user, authLoaded, signOut } = useContext(UserContext);
  const messagesEndRef = useRef(null);

  // Else load up the page

  useEffect(() => {
    if (process.browser) {
      // deleteLStorage();
      const usersession = supabase.auth.session();
      const userid = usersession.user.id;
      // const sessioncheck = CheckSessionMember(userid, sessionId);
      // const channelcheck = CheckChannelMember(userid, channelId);
      //if (sessioncheck) {
      //  console.log("[Main] This user is a member of this session");
      //} else {
      //  router.push("/404");
      //}
    }
  }, []);

  const { messages, channels } = useStore({ channelId, hardload });

  useEffect(() => {
    if (!smartphone){
      console.log(
        "[messagesEndRef] ignore_scroll: " + localStorage.getItem("ignore_scroll")
      );
      if (localStorage.getItem("ignore_scroll") === "true") {
        console.info("[messagesEndRef] scroll: ignore");
        localStorage.setItem("ignore_scroll", "false");
      } else {
        console.info("[messagesEndRef] scroll: execute");
        messagesEndRef.current.scrollIntoView({
          block: "start",
          behavior: "smooth"
        });
      }
    }
  }, [messages]);

  // redirect to public channel when current channel is deleted
  useEffect(() => {
    //if (!channels.some((channel) => channel.id === Number(channelId))) {
    // router.push('/channels/1')
    //}
    if (process.browser) {
      document.title = channelId + " - Sessions";
    }
  }, [channels, channelId]);

  const [hardload, setHardload] = useState(undefined);
  async function getProfile() {
    try {
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select("hardload")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setHardload(data.hardload);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  //項目を読み込む
  const [list, setList] = useState([]);
  const [itemid, setItemid] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loader = <ReactLoading type="spin" />;
  if (smartphone){
    const items = (
      <>
      {list.map((x) => (
        <Message key={x.id} message={x} />
      ))}
    </>
  );
  } else {
    const items = (
      <>
      {list.map((x) => (
        <Message key={x.id} message={x} />
      ))}
    </>
  );
  }
  const loadMore = async (page) => {
    const data = await additionalload(channelId, itemid, 15);
    if (data === false) {
      setHasMore(false);
    } else {
      setItemid(itemid + 15);
      setList([...data, ...list]);
    }
  };

  // Render the channels and messages
  return (
    <div>
      <div className="h-screen">
        <div className="Messages h-full pb-16">
          <div className="p-2 overflow-y-auto">
            {messages.map((x) => (
              <Message key={x.id} message={x} />
            ))}
            <div ref={messagesEndRef} style={{ height: 0 }} />
          </div>
        </div>
        <div className="p-2 absolute bottom-0 left-0 w-full">
          <MessageInput
            onSubmit={async (text) => addMessage(text, channelId, user.id)}
            channelId={channelId}
          />
        </div>
      </div>
    </div>
  );
};

export default ChannelsPage;
