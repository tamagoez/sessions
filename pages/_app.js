import "~/styles/style.scss";
import "~/styles/globals.css";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import UserContext from "lib/UserContext";
import { supabase, fetchUserRoles } from "lib/Store"
import { themeChange } from 'theme-change'
import { setStatus } from '~/lib/Status'

export default function SupabaseSlackClone({ Component, pageProps }) {
  // App.getInitialProps = async () => ({ pageProps: {} })
  const [userLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  
  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  setStatus();

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    setUserLoaded(session ? true : false);
    if (user) {
      signIn();
     // setStatus()
      // Router.push('/app/dashboard')
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        const currentUser = session?.user;
        setUser(currentUser ?? null);
        setUserLoaded(!!currentUser);
        if (currentUser) {
          // signIn();
          // Router.push("/app/dashboard");
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, [user]);

  const signIn = async () => {
    await fetchUserRoles((userRoles) =>
      setUserRoles(userRoles.map((userRole) => userRole.role))
    );
  };

  const signOut = async () => {
    const result = await supabase.auth.signOut();
    Router.push("/");
  };

  return (
    <UserContext.Provider
      value={{
        userLoaded,
        user,
        userRoles,
        signIn,
        signOut
      }}
    >
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
