import { useState, useEffect } from "react";
import supabase from "~/utils/supabaseClient";
import { AvatarSetting } from "~/components/Avatar";
import { useRouter } from "next/router";
import NavBar from "~/components/NavBar";

function AccountData({ session }) {
  const [loading, setLoading] = useState(true);
  const [hardload, setHardload] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select('hardload'
               )
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setHardload(data.hardload);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    hardload
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        hardload
      };

      let { error } = await supabase.from("settings").upsert(updates, {
        returning: "minimal" // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  
  function switchHL() {
    if (document.getElementById("hardload").checked) {
      setHardload(true);
    } else {
      setHardload(false);
    }
  }

  return (
    <div>
      <NavBar thispage="Settings" />
      <div className="form-widget">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">HardLoad (No recommend)</span>
            <input
              type="checkbox"
              id="hardload"
              className="toggle"
              checked={!hardload ? false: true}
              onChange={() => switchHL()}
            />
          </label>
        </div>
        <span className="label-text">
          if true, don't use WebSocket but get chat every second.
        </span>

        <div>
          <button
            className="button block primary"
            onClick={() =>
              updateProfile({
                hardload
              })
            }
            disabled={loading}
          >
            {loading ? "Updating.." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  const router = useRouter();
  const session = supabase.auth.session();
  function RouteLogin() {
    if (process.browser) {
      router.push("/login?next=/settings");
    }
  }

  return (
    <div>
      {!session ? (
        RouteLogin()
      ) : (
        <AccountData key={session.user.id} session={session} />
      )}
    </div>
  );
}
