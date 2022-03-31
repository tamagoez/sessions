import supabase from "~/utils/supabaseClient";
import { useState, useEffect } from "react";

export const fetchChannels = (sessionid) => {
  const [returnbody, setReturnBody] = useState([]);

  useEffect(() => {
    setReturnBody(getch(sessionid));
  }, [sessionid]);

  return {
    channels: returnbody.map((x) => ({ ...x }))
  };
};

async function getch(sessionid, setState) {
  try {
    let { body } = await supabase
      .from("channels")
      .select("*")
      .eq("session", sessionid);
    console.dir(body);
    if (setState) setState(body);
    return body;
  } catch (error) {
    console.log("error", error.message);
  }
}
