import { useState, useEffect } from "react";
import { supabase } from "lib/Store";
import { useRouter } from "next/router";

const Home = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nextlink, setNextlink] = useState("");
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (router.isReady) {
      if (!query.next) {
        setNextlink("/profiles");
      } else {
        setNextlink(query.next);
      }
      if (process.browser) {
        const session = supabase.auth.session();
        if (session) router.push(nextlink);
        document.title = "Signup - Sessions";
      }
    }
  }, [query, router]);
  
  async function GenProfile(loginid, name){
    try {
    // Generate
      //
      const users = supabase.auth.user();
      const updates = {
        id: users.id,
        username: name,
        statustext: "",
        avatar_url: "default.png",
        website: "",
        signed_at: new Date(),
        last_login: new Date(),
        hardload: false,
        login_id: loginid
      };

      let { error_upsert } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal" // Don't return the value after inserting
      });

      if (error_upsert) {
        throw error;
      }
      router.push(nextlink);
    } catch (error) {
      alert(error.message)
    } finally {}
  }

  const handleLogin = async (type, username, password, name) => {
    try {
      const userid = username + "@web-sessions.vercel.app";
      const { error, user } =
        type === "LOGIN"
          ? await supabase.auth.signIn({ email: userid, password })
          : await supabase.auth.signUp({ email: userid, password });
      // If the user doesn't exist here and an error hasn't been raised yet,
      // that must mean that a confirmation email has been sent.
      // NOTE: Confirming your email address is required by default.
      if (error) {
        throw error;
      }
      GenProfile(username, name)
    } catch (error) {
      console.log("error", error);
      alert(error.error_description || error);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-4 bg-gray-300">
      <div className="w-full sm:w-1/2 xl:w-1/3">
        <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg bg-white">
          <div className="mb-4">
            <label className="font-bold text-grey-darker block mb-2">
              UserID
            </label>
            <input
              type="text"
              className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
              placeholder="Your UserID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="font-bold text-grey-darker block mb-2">
              UserName
            </label>
            <input
              type="text"
              className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
              placeholder="Your UserName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="font-bold text-grey-darker block mb-2">
              Password
            </label>
            <input
              type="password"
              className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <a
              onClick={(e) => {
                e.preventDefault();
                handleLogin("SIGNUP", username, password, name);
              }}
              href={"/channels"}
              className="border border-green-500 text-green-500 py-2 px-4 rounded w-full text-center transition duration-150 hover:bg-green-500 hover:text-white"
            >
              Sign up
            </a>
            <a
              href={"/login?next=" + nextlink}
              className="bg-green-400 hover:bg-teal text-white py-1 px-4 rounded text-center transition duration-150 hover:bg-white hover:text-green-400 border hover:border-green-400"
            >
              or Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
