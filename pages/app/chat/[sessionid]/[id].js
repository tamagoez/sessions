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
  const getNames = useMemo(() => {
    getCName()
    getSName()
  }, [channelId, sessionId]);

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
  
  function SideProps() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

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
             <div className="drawer-side">
    <label for="my-drawer" className="drawer-overlay"></label>
    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

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

  return [getNames, render]
};

export default ChannelsPage;
