import Layout from "~/components/Layout";
// import Message from "~/components/Message";
// import MessageInput from "~/components/MessageInput";
import { useRouter } from "next/router";
import { useStore, getChannelName } from "~/lib/Store";
import { useEffect, useState } from "react";
// import UserContext from "~/lib/UserContext";
import { CheckSessionMember, CheckChannelMember } from "~/lib/CheckUser";
import supabase from "~/utils/supabaseClient";
// import { ChannelName, SessionName } from "~/lib/GetName";
import NavBar from "~/components/NavBar";
// import { getWindowSize } from "~/utils/GetWindowSize";
import getfromsec from "~/lib/GetFromSec";
import ChannelFrame from "~/components/ChannelFrame";

import React from 'react';

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

  // const [channelId, setChannelId] = useState(null);
  // setChannelId(getfromsec(secondchannelId));
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

  const [channelname, setChannelname] = useState("Loading");
  const [sessionname, setSessionname] = useState("Loading");

  // const { user, authLoaded, signOut } = useContext(UserContext);
  const { channels } = useStore({ channelId });

  // Else load up the page
  const [userid, setUserid] = useState(null);
  useEffect(() => {
    if (process.browser) {
      const usersession = supabase.auth.session();
      setUserid(usersession.user.id);
      const sessioncheck = CheckSessionMember(userid, sessionId);
      const channelcheck = CheckChannelMember(userid, channelId);
      if (sessioncheck) {
        console.log("[Main] This user is a member of this session");
      } else {
        router.push("/404");
      }
    }
  }, []);

  // redirect to public channel when current channel is deleted
  useEffect(() => {
    if (process.browser) {
      getCName();
      getSName();
      document.title = "#" + channelname + " @" + sessionname + " - Sessions";
      // setSessionname(SessionName(sessionId))
    }
  }, [channels, channelId]);

  // const [loading, setLoading] = useState(false);
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
        setChannelname(data.name);
      }
    } catch (error) {
      alert(error.message);
    } finally {
    }
  }

  async function getSName() {
    try {
      // const cname = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("sessions")
        .select("name")
        .eq("id", sessionId)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setSessionname(data.name);
      }
    } catch (error) {
      alert(error.message);
    } finally {
    }
  }

  useEffect(() => {
    if (process.browser)
      document.title = "#" + channelname + " < @" + sessionname + " - Sessions";
  }, [channelname, sessionname]);
  
  function SideProps() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <div className="flex-col">
      <button className="btn" ref={btnRef} onClick={onOpen}>
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
      </button>
      </div>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{sessionname} Channels</DrawerHeader>
          <DrawerBody>
            <ul className="menu bg-base-100 w-56 p-2 rounded-box">
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
              <li><a>Item 3</a></li>
          </ul>
          </DrawerBody>
          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

  // Render the channels and messages
  return (
    <div>
      <div>
        <NavBar sessionname={sessionname} channelname={channelname} />
      </div>
      <div className="flex">
        <div>
          <SideProps />
        </div>
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
};

export default ChannelsPage;
