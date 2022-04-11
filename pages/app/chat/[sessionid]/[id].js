import { useRouter } from "next/router";
import { useStore } from "~/lib/Store";
import { useEffect, useRef, useState, useMemo } from "react";
import { CheckSessionMember, CheckChannelMember } from "~/lib/CheckUser";
import supabase from "~/utils/supabaseClient";
import NavBar from "~/components/NavBar";
import getfromsec from "~/lib/GetFromSec";
import ChannelFrame from "~/components/ChannelFrame";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

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

  const session = supabase.auth.session();
  if (process.browser) {
    if (!session) {
      const tempredirectlink =
        "/login?next=/app/chat/" + sessionId + "/" + secondchannelId;
      router.push(tempredirectlink);
    }
  }

  if (!session) {
    return null;
  }

  //const [channelname, setChannelname] = useState("Loading");
  //const [sessionname, setSessionname] = useState("Loading");
  const { channels } = useStore({ channelId });

  // Else load up the page
  const [userid, setUserid] = useState(null);
  useEffect(() => {
    if (process.browser) {
      const usersession = supabase.auth.session();
      setUserid(usersession.user.id);
      //const sessioncheck = CheckSessionMember(userid, sessionId);
      //if (sessioncheck) {
//         console.log("[Main] This user is a member of this session");
      //} else {
      //  router.push("/404");
      //}
    }
  }, []);

  // redirect to public channel when current channel is deleted
  const channelname = useMemo(() => getCName(), [channelId])
  const sessionname = useMemo(() => getSName(), [sessionId])

  async function getCName() {
    try {
      // const cname = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("channels")
        .select("name")
        .eq("id", channelId)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        return data.name;
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function getSName() {
    try {
      let { data, error, status } = await supabase
        .from("sessions")
        .select("name")
        .eq("id", sessionId)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        return data.name;
      }
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    if (process.browser)
      document.title = "#" + channelname + " < @" + sessionname + " - Sessions";
  }, [channelname, sessionname]);
  
  
  // Render the channels and messages
  const render = () => (
    <div>
      <div>
        <NavBar sessionname={sessionname} channelname={channelname} />
      </div>
      <div className="flex">
        <div className="grow">
        <ChannelFrame
          channelname={channelname}
          sessionname={sessionname}
          id={sessionId}
          sid={secondchannelId}
        />
        </div>
      </div>
    </div>
  );

  return [render]
};

export default ChannelsPage;
