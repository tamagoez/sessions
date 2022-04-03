import supabase from "~/utils/supabaseClient";
import { useState } from "react";

const ChannelName = async (id) => {
  // const [cname, setCname] = useState("error");
  console.log("[ChannelName] Got props: " + id);
  // const [name, setName] = useState(null)
  try {
    const { data, error } = await supabase
      .from("channels")
      .select(`name`)
      .eq("id", id).single;
    if (error) throw error;
    // console.dir(data, { depth: null });
    // console.log("[ChannelName] Got data: " + data.name);
    // return data.name;
    // setCname(data.name);
    return data.name
  } catch (error) {
    console.error("[ChannelName] error: " + error.message);
    // return "error";
  } finally {
    // return cname;
  }
};

const SessionName = async (id) => {
  // const [sname, setSname] = useState("error");
  console.log("[SessionName] Got props: " + id);
  // const [name, setName] = useState(null)
  try {
    const { data, error } = await supabase
      .from("sessions")
      .select("name")
      .eq("id", id).single;
    if (error) throw error;
    // setSname(data.name);
    // console.dir(data, { depth: null });
    // console.log("[SessionName] Got data: " + data.name);
    return data.name;
  } catch (error) {
    console.error("[SessionName] error: " + error.message);
    // return "error";
  } finally {
    // return sname;
  }
};

export { ChannelName, SessionName };
