import Layout from '~/components/Layout'
import Message from '~/components/Message'
import MessageInput from '~/components/MessageInput'
import { useRouter } from 'next/router'
import { useStore, addMessage } from '~/lib/Store'
import { useContext, useEffect, useRef } from 'react'
import UserContext from '~/lib/UserContext'
import { CheckSessionMember, CheckChannelMember } from '~/lib/CheckUser'
import supabase from '~/utils/supabaseClient'
import { ChannelName, SessionName } from '~/lib/GetName'
import NavBar from '~/components/NavBar'

const ChannelsPage = (props) => {  
  const router = useRouter()
  const { id: channelId, sessionid: sessionId } = router.query
  
  const session = supabase.auth.session();
  if (process.browser) {
    if (!session) {
      const tempredirectlink = '/login?next=/app/chat/' + sessionId + '/' + channelId
      router.push(tempredirectlink)
    }
  }
  
  useEffect(() => {
    const channelname = ChannelName(channelId)
    const sessionname = SessionName(sessionId)
  }, [])
  
  const { user, authLoaded, signOut } = useContext(UserContext)
  const messagesEndRef = useRef(null)

  // Else load up the page
  
  if (process.browser) {
    const usersession = supabase.auth.session()
    const userid = usersession.user.id
    const sessioncheck = CheckSessionMember(userid, sessionId)
    const channelcheck = CheckChannelMember(userid, channelId)
    if (sessioncheck) { console.log('[Main] This user is a member of this session') } else { router.push('/404') }
    }
  
  const { messages, channels } = useStore({ channelId })

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    })
  }, [messages])

  // redirect to public channel when current channel is deleted
  useEffect(() => {
    if (!channels.some((channel) => channel.id === Number(channelId))) {
      // router.push('/channels/1')
    }
    if (process.browser) {
      document.title = channelId + " - Sessions";
    }
  }, [channels, channelId])

  // Render the channels and messages
  return (
    <div>
    <NavBar channelname={channelname} sessionname={sessionname} />
    <Layout channels={channels} activeChannelId={channelId}>
      <div className="relative h-screen">
        <div className="Messages h-full pb-16">
          <div className="p-2 overflow-y-auto">
            {messages.map((x) => (
              <Message key={x.id} message={x} />
            ))}
            <div ref={messagesEndRef} style={{ height: 0 }} />
          </div>
        </div>
        <div className="p-2 absolute bottom-0 left-0 w-full">
          <MessageInput onSubmit={async (text) => addMessage(text, channelId, user.id)} />
        </div>
      </div>
    </Layout>
    </div>
  )
}

export default ChannelsPage
