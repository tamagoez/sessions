import Layout from '~/components/Layout'
import Message from '~/components/Message'
import MessageInput from '~/components/MessageInput'
import { useRouter } from 'next/router'
import { useStore, addMessage } from '~/lib/Store'
import { useContext, useEffect, useState } from 'react'
import UserContext from '~/lib/UserContext'
import { CheckSessionMember, CheckChannelMember } from '~/lib/CheckUser'
import supabase from '~/utils/supabaseClient'
import { ChannelName, SessionName } from '~/lib/GetName'
import NavBar from '~/components/NavBar'
import { getWindowSize } from "~/utils/GetWindowSize";

const ChannelsPage = (props) => {  
  const router = useRouter()
  const { id: channelId, sessionid: sessionId } = router.query
  
  if (!router.isReady) {
    return null
  }
  
  const session = supabase.auth.session();
  if (process.browser) {
    if (!session) {
      const tempredirectlink = '/login?next=/app/chat/' + sessionId + '/' + channelId
      router.push(tempredirectlink)
    }
  }
  
  const [channelname, setChannelname] = useState(null)
  const [sessionname, setSessionname] = useState(null)
  useEffect(() => {
    setChannelname = ChannelName(channelId)
    setSessionname = SessionName(sessionId)
  }, [])
  
  const { user, authLoaded, signOut } = useContext(UserContext)
  const { channels } = useStore({ channelId })

  // Else load up the page
  
  if (process.browser) {
    const usersession = supabase.auth.session()
    const userid = usersession.user.id
    const sessioncheck = CheckSessionMember(userid, sessionId)
    const channelcheck = CheckChannelMember(userid, channelId)
    if (sessioncheck) { console.log('[Main] This user is a member of this session') } else { router.push('/404') }
    }

  // redirect to public channel when current channel is deleted
  useEffect(() => {
    if (!channels.some((channel) => channel.id === Number(channelId))) {
      // router.push('/channels/1')
    }
    if (process.browser) {
      document.title = channelId + " - Sessions";
    }
  }, [channels, channelId])
  
  if (process.browser){
    const { height } = getWindowSize();
  } else { const height = 1000 }

  // Render the channels and messages
  return (
    <div>
    <NavBar channelname={channelname} sessionname={sessionname} />
      <iframe id="chat-frame"
          title="Chat Frame"
          width="100%"
          height={height}
          src={"https://web-sessions.vercel.app/app/frame/chat/" + sessionId + "/" + channelId}>
      </iframe>
    </div>
  )
}

export default ChannelsPage
