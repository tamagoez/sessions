import supabase from "~/utils/supabaseClient";
import { useState } from "react";
export default function FetchChat(channelId, limit) {
  console.info("[FetchChat] Fetching... " + channelId);
  const [messages, setMessages] = useState([]);
  const [users] = useState(new Map());
  fetchMessages(
    channelId,
    (messages) => {
      messages.forEach((x) => users.set(x.userid, x.author));
      setMessages(messages);
    },
    limit
  );
  return messages.map((x) => ({ ...x, author: users.get(x.userid) }));
}

async function fetchMessages(channel, setState, limit) {
  try {
    let { body } = await supabase
      .from("channels_chat")
      .select(`*, author:userid(*)`)
      .eq("channel", channel)
      .order("created_at", true)
      .limit(limit);
    if (setState) setState(body);
    return body;
  } catch (error) {
    console.log("error", error);
  }
}
