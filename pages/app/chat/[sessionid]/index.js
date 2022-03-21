import { useRouter } from "next/router";
import { useState } from "react";
import supabase from "~/utils/supabaseClient";
import NavBar from "~/components/NavBar";

export default function CardPage() {
  const router = useRouter();
  if (!router.isReady) {
    return null;
  }
  const { sessionid: sessionId } = router.query;
  const [sessionname, setSessionname] = useState("Loading");

  async function getSName() {
    try {
      // const cname = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("sessions")
        .select("name")
        .eq("id", sessionId)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setSessionname(data.name);
      }
    } catch (error) {
      alert(error.message);
    } finally {
    }
  }

  function card(title, description, link) {
    return (
      <div class="indicator">
        <div class="indicator-item indicator-bottom">
          <button
            class="btn btn-primary"
            onClick={() => router.push("/app/chat/" + link)}
          >
            Chat
          </button>
        </div>
        <div class="card border">
          <div class="card-body">
            <h2 class="card-title">{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  }
  getSName();
  return (
    <div>
      <div>
        <NavBar sessionname={sessionname} />
      </div>
      {card("test", null, "1/1")}
    </div>
  );
}
