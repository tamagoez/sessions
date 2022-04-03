export default function deleteLStorage(){
  const token = localStorage.getItem("supabase.auth.token")
  const theme = localStorage.getItem("theme")
  localStorage.clear()
  localStorage.setItem("supabase.auth.token", token)
  localStorage.setItem("theme", theme)
}
