import supabase from '~/utils/supabaseClient';
import { useState } from 'react';
export default function FetchChat(channelId, limit){
    const [message, setMessages] = useState([]);
    const [users] = useState(new Map());
    async function fetchMessages(channel, setState, limit){
        try {
        let { body } = await supabase
            .from("channels_chat")
            .select(`*, author:userid(*)`)
            .eq("channel", channel)
            .order("created_at", true)
            .limit(limit);
        return body;
        } catch (error) {
        console.log("error", error);
        }
    }
    fetchMessages(channelId, (messages) => {
        messages.forEach((x) => users.set(x.userid, x.author));
        setMessages(messages);
      }, limit);
    return messages.map((x) => ({ ...x, author: users.get(x.userid) }))
  };