import supabase from "~/utils/supabaseClient";
import { useState } from "react";
import { ErrorToast } from "~/components/Notify"

export default function GetFromSec(sessionId, id) {
  console.log("[GetFromSec] Got props: " + sessionId + ' / ' + id);
  const [rid, setRid] = useState(0);
  async function getID(id) {
    try {
      // const cname = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("channels")
        .select("id", "second_id", "session")
        .match({second_id: id, session: sessionId})
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setRid(data.id);
      }
    } catch (error) {
      ErrorToast("Error getting channel id", error.message, 1000);
    } finally {
    }
  }
  getID(id);
  console.log("[GetFromSec] Got deta: " + rid);
  return rid;
}
