import supabase from "~/utils/supabaseClient";
import { useEffect, useState } from "react";
const { DateTime } = require("luxon");

export function setStatus() {
  const user = supabase.auth.user();
  useEffect(() => {
    setdeal(user?.id)
    const intervalId = setInterval(() => {
      localStorage.setItem("ignore_scroll", "true");
      console.log("[setStatus] Setting");
      setdeal(user?.id);
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
}

export function getStatus(id) {
  const [returnval, setReturnval] = useState(false);

  function getfunc() {
    // https://www.tam-tam.co.jp/tipsnote/javascript/post5978.html
    if (!localStorage.getItem("user_status")) {
      const settingobject = localStorage.getItem("settings")
      const nowdate = new Date()
      const newObject = {
        expiresAt: nowdate.getTime() + 10000,
        status: {}
      }
      localStorage.setItem("user_status", JSON.stringify(newObject))
    }
    const lsobject = JSON.parse(localStorage.getItem("user_status"))
    const nowdate = new Date()
    if (lsobject["expiresAt"] < nowdate.getTime()) {
      localStorage.removeItem("user_status")
      const settingobject = localStorage.getItem("settings");
      const newObject = {
        expiresAt: nowdate.getTime() + 10000,
        status: {}
      }
      localStorage.setItem("user_status", JSON.stringify(newObject))
    }
    const lastobject = JSON.parse(localStorage.getItem("user_status"))
    console.log("[getfunc] got from sessionstorage: " + lastobject["status"][id])
    if (!lastobject["status"][id]) {
      const returnbool = loaddeal(id);
      returnbool.then((value) => {
        console.log("[getStatus] returnbool: " + value);
        const dataObject = JSON.parse(localStorage.getItem("user_status"));
        dataObject["status"][id] = value;
        localStorage.setItem("user_status", JSON.stringify(dataObject));
        setReturnval(value);
      });
    } else {
      setReturnval(lastobject["status"][id])
    }
  }

  useEffect(() => {
    console.log("[getStatus] Loading: " + id);
    getfunc();
    const intervalId = setInterval(() => {
      getfunc();
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return returnval;
}

async function setdeal(id) {
  try {
    const { error } = await supabase
      .from("profiles")
      .update({ online_at: DateTime.utc() })
      .eq("id", id);
    if (error) throw error;
  } catch (error) {
    console.error("[setdeal] failed: " + error.message);
  }
}

async function loaddeal(id) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("online_at")
      .eq("id", id)
      .single();
    if (error) throw error;
    const now = DateTime.fromISO(DateTime.utc());
    console.log("[loaddeal] data=" + data.online_at);
    if (data.online_at) {
      const gottime = DateTime.fromISO(data.online_at);
      const difftime = now.diff(gottime);
      // const difftimeas = difftime.as("seconds");
      console.log("[loaddeal] difftime=" + difftime);
      if (difftime < 10000) {
        console.info("[loaddeal] " + id + ": online");
        return true;
      } else {
        console.info("[loaddeal] " + id + ": offline");
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error("[loaddeal] failed: " + error.message);
  }
}

export const getDate = async (id) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("online_at")
      .eq("id", id)
      .single();
    if (error) throw error;
    console.log("[getDate] got: " + data.online_at);
    return data.online_at;
  } catch (error) {
    console.error("[loaddeal] failed: " + error.message);
  }
};
