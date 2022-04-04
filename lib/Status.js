import supabase from "~/utils/supabaseClient"
import { useEffect } from 'react'
const { DateTime } = require("luxon");

export function setStatus() {
  const user = supabase.auth.user();
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("[setStatus] Setting")
      setdeal(user.id)
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
}

async function setdeal(id){
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ online_at: DateTime.utc() })
      .eq('id', id)
    if (error) throw erorr;
  } catch (error) {
    console.error("[setdeal] failed: " + error.message)
  }
}
