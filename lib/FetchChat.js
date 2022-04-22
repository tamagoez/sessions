import supabase from '~/utils/supabaseClient';
export default async function FetchChat(channelId, limit){
    try {
      let { body } = await supabase
        .from("channels_chat")
        .select(`*, author:userid(*)`)
        .eq("channel", channelId)
        .order("created_at", true)
        .limit(limit);
      if (setState) setState(body);
      return body;
    } catch (error) {
      console.log("error", error);
    }
  };