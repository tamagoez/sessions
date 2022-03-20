import supabase from '~/utils/supabaseClient'
// import { useState } from 'react'

async function ChannelName(id){
  // const [name, setName] = useState(null)
  try {
    const { data, error } = await supabase
      .from('channels')
      .select('name')
      .eq('id', id)
    if (error) throw error
    return data
  } catch (error) {
    console.error('[ChannelName] error: ' + error.message)
  } finally {}
}

async function SessionName(id){
  // const [name, setName] = useState(null)
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('name')
      .eq('id', id)
    if (error) throw error
    return data
  } catch (error) {
    console.error('[SessionName] error: ' + error.message)
  } finally {}
}

export { ChannelName, SessionName }
