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
      .ed('id', id)
      .single()
    const now = DateTime.utc();
    const difftime = now.diff(data.online_at).toObject() 
    if (difftime < 30000) {
      return true
    } else {
      return false
    }
    if (error) throw error;
  } catch (error) {
    console.error("[loaddeal] failed: " + error.message)
  }
}
