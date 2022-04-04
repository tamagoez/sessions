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

export function getStatus(id) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("[setStatus] Loading")
      const returnbool = loaddeal(id)
      return returnbool;
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
    if (error) throw error;
  } catch (error) {
    console.error("[setdeal] failed: " + error.message)
  }
}

async function loaddeal(id){
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('online_at')
      .eq('id', id)
      .single()
    if (error) throw error;
    const now = DateTime.fromISO(DateTime.utc());
    console.log("[loaddeal] data=" + data.online_at)
    if (data.online_at) {
    const gottime = DateTime.fromISO(data.online_at);
    const difftime = now.diff(gottime);
    // const difftimeas = difftime.as("seconds");
    console.log("[loaddeal] difftime=" + difftime)
    if (difftime < 30000) {
      return true
    } else {
      return false
    }
    } else {
      return false
    }
  } catch (error) {
    console.error("[loaddeal] failed: " + error.message)
  }
}
