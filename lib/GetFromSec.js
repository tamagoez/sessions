import supabase from "~/utils/supabaseClient";
import { useState } from "react";

export default function GetFromSec(id) {
  console.log("[GetFromSec] Got props: " + id);
  const [rid, setRid] = useState(0);
  async function getID(id) {
    try {
      // const cname = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("channels")
        .select("id")
        .eq("second_id", id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setRid(data.id);
      }
    } catch (error) {
      alert(error.message);
    } finally {
    }
  }
  getID(id);
  console.log("[GetFromSec] Got deta: " + rid);
  return rid;
}
