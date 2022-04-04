import supabase from "~/utils/supabaseClient"
import { useEffect, useState } from 'react'
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
  const [returnval, setReturnval] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem("status_" + id)){
      const intervalId = setInterval(() => {
        console.log("[setStatus] Loading")
        const returnbool = loaddeal(id)
        returnbool
          .then(value => {console.log("[getStatus] returnbool: " + value)})
          .then(value => {setReturnval(value)})
        // return returnbool;
      }, 12000);
      return () => {
        clearInterval(intervalId);
      };
    } else {
      setReturnval(localStorage.getItem("status_" + id))
    }
  }, []);
  if (returnval === true){
    localStorage.setItem('status_' + id, "true");
    return true
  } else {
    localStorage.setItem('status_' + id, "false")
    return false
  };
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
      console.info("[loaddeal] " + id + ": online")
      return true
    } else {
      console.info("[loaddeal] " + id + ": offline")
      return false
    }
    } else {
      return false
    }
  } catch (error) {
    console.error("[loaddeal] failed: " + error.message)
  }
}
