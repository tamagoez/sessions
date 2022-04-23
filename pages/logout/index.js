import supabase from "~/utils/supabaseClient";
// import { useRouter } from "next/router";

export default function Logout() {
  // const router = useRouter();
  async function deal() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.replace("/");
    } catch (error) {
      alert("[Logout] Failed: " + error.message);
    } finally {
    }
  }
  deal();
  return null;
}
