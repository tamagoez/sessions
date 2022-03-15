import supabase from '../utils/supabaseClient.js'

async function CheckSessionMember(userid, sessionid) {
  try {
    const { data, error } = await supabase
      .from('session_member')
      .select('session_id, user!inner(*)')
      .eq('user_id', userid)
    if (error) throw error
    console.log('[CheckSessionMember] data=' + data)
  } catch (error) {
    console.log('[CheckSessinMember] Catch an error: ' + error)
  } finally {
    console.log('[CheckSessionMember] finished succesfully')
  }
}

export { CheckSessionMember };
