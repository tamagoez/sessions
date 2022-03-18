import supabase from '../utils/supabaseClient.js'
import { useState } from 'react';

async function CheckSessionMember(userid, sessionid) {
  console.log('[CheckSessionMember] Got props: ' + userid + ' / ' + sessionid)
  const [status, setStatus] = useState(null)
  try {
    const { data, error, status } = await supabase
      .from('session_member')
      .select('session')
      .eq('user', userid)
    if (error) throw error
    setStatus(status)
    console.log('[CheckSessionMember] data=')
    console.dir(data, { depth: null });
  } catch (error) {
    console.log('[CheckSessinMember] Catch an error: ')
    console.dir(error, { depth: null });
  } finally {
    console.log('[CheckSessionMember] finished succesfully: ' + status)
  }
}

async function CheckChannelMember(userid, channelid) {
  console.log('[CheckChannelMember] Got props: ' + userid + ' / ' + channelid)
  const [status, setStatus] = useState(null)
  try {
    const { data, error, status } = await supabase
      .from('channel_member')
      .select('channel')
      .eq('user', userid)
    if (error) throw error
    setStatus(status)
    console.log('[CheckChannelMember] data=')
    console.dir(data, { depth: null });
  } catch (error) {
    console.log('[CheckChannelMember] Catch an error: ')
    console.dir(error, { depth: null });
  } finally {
    console.log('[CheckChannelMember] finished succesfully: ' + status)
  }
}

export { CheckSessionMember, CheckChannelMember };
