import { useState, useEffect } from "react";
import supabase from "~/utils/supabaseClient";
import { AvatarSetting } from "~/components/Avatar";
import { useRouter } from "next/router";
import NavBar from "~/components/NavBar";

function AccountData({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [statustext, setStatustext] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [website, setWebsite] = useState(null);
  const [login_id, setLogin_id] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, statustext, avatar_url, website, login_id, hardload`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setStatustext(data.statustext);
        setAvatarUrl(data.avatar_url);
        setWebsite(data.website);
        setLogin_id(data.login_id);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    login_id,
    username,
    statustext,
    avatar_url,
    website
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        statustext,
        avatar_url,
        website,
        updated_at: new Date(),
        login_id
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
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

  return (
    <div>
      <NavBar thispage="Profile" />
      <div className="form-widget pl-2">
        <div className="py-0.5">
          <AvatarSetting
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url);
              updateProfile({ username, statustext, avatar_url: url, website });
            }}
          />
        </div>
        <div className="py-0.5">
          <label class="input-group">
            <span htmlFor="login_id">Login ID (Use this ID to login)</span>
            <input
              id="login_id"
              type="text"
              value={login_id || ""}
              disabled
              className="input input-bordered"
            />
          </label>
        </div>
        <div className="py-0.5">
          <label class="input-group">
            <span htmlFor="email">Email</span>
            <input
              id="email"
              type="text"
              value={session.user.email}
              disabled
              className="input input-bordered"
            />
          </label>
        </div>
        <div className="py-0.5">
          <label class="input-group">
            <span htmlFor="username">Username (Nickname)</span>
            <input
              id="username"
              type="text"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered"
            />
          </label>
        </div>
        <div className="py-0.5">
          <label class="input-group">
            <span htmlFor="website">Website</span>
            <input
              id="website"
              type="text"
              value={website || ""}
              onChange={(e) => setWebsite(e.target.value)}
              className="input input-bordered"
            />
          </label>
        </div>
        <div className="py-0.5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Status text / bio</span>
            </label>
            <textarea
              id="statustext"
              value={statustext || ""}
              onChange={(e) => setStatustext(e.target.value)}
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
            />
          </div>
        </div>
        <div className="py-0.5">
          <button
            className="btn btn-wide"
            onClick={() =>
              updateProfile({
                username,
                statustext,
                avatar_url,
                website
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
      router.push("/login?next=/profile");
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
