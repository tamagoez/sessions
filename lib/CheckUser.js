import supabase from '../utils/supabaseClient.js'

async function CheckSessionMember(userid, sessionid) {
  try {
    const { data, error } = await supabase
      .from('session_member')
      .select('session')
      .eq('user', userid)
    if (error) throw error
    console.log('[CheckSessionMember] data=' + data)
  } catch (error) {
    console.log('[CheckSessinMember] Catch an error: ')
    console.dir(error, { depth: null });
  } finally {
    console.log('[CheckSessionMember] finished succesfully')
  }
}

export { CheckSessionMember };
