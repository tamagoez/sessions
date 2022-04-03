import Layout from "~/components/Layout";
import Message from "~/components/Message";
import MessageInput from "~/components/MessageInput";
import { useRouter } from "next/router";
import { useStore, addMessage } from "~/lib/Store";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "~/lib/UserContext";
import { CheckSessionMember, CheckChannelMember } from "~/lib/CheckUser";
import supabase from "~/utils/supabaseClient";
import { ChannelName, SessionName } from "~/lib/GetName";
import getfromsec from "~/lib/GetFromSec";

import deleteLStorage from "~/utils/deleteLStorage";

const ChannelsPage = (props) => {
  const router = useRouter();
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

  if (process.browser) {
    deleteLStorage();
    const usersession = supabase.auth.session();
    const userid = usersession.user.id;
    const sessioncheck = CheckSessionMember(userid, sessionId);
    const channelcheck = CheckChannelMember(userid, channelId);
    if (sessioncheck) {
      console.log("[Main] This user is a member of this session");
    } else {
      router.push("/404");
    }
  }

  const { messages, channels } = useStore({ channelId, hardload });

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
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
          />
        </div>
      </div>
    </div>
  );
};

export default ChannelsPage;
