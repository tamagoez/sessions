import { useState, useEffect } from 'react'
import supabase from '~/utils/supabaseClient'
import { AvatarSetting } from '~/components/Avatar'
import { useRouter } from 'next/router'

function AccountData({ session }) {  
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [statustext, setStatustext] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [website, setWebsite] = useState(null)
  const [login_id, setLogin_id] = useState(null)
  const [hardload, setHardload] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, statustext, avatar_url, website, login_id, hardload`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setStatustext(data.statustext)
        setAvatarUrl(data.avatar_url)
        setWebsite(data.website)
        setLogin_id(data.login_id)
        setHardload(data.hardload)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ login_id, username, statustext, avatar_url, website, hardload }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        statustext,
        avatar_url,
        website,
        updated_at: new Date(),
        login_id,
        hardload
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  function switchHL(value){
    if (value === 'on') {
      setHardload(true)
    } else {
      setHardload(false)
    }
  }

  return (
    <div className="form-widget">
      <div>
        <AvatarSetting
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ username, statustext, avatar_url: url, website })
        }}
      />
      </div>
      <div>
        <label htmlFor="login_id">Login ID (Use this ID to login)</label>
        <input id="login_id" type="text" value={login_id || ''} disabled />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username (should use Nickname)</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Status text / bio</span>
          </label> 
          <textarea
            id="statustext"
            value={statustext || ''}
            onChange={(e) => setStatustext(e.target.value)}
            className="textarea textarea-bordered h-24"
            placeholder="Bio"
          />
        </div>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">HardLoad (No recommend)</span> 
          <input type="checkbox" className="toggle" {...hardload ? null : 'checked'} onChange={(e) => SwitchHL(e.target.value)}} />
        </label>
      </div>
      <span className="label-text">if true, don't use WebSocket but get chat every second.</span>

      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile({ username, statustext, avatar_url, website, hardload })}
          disabled={loading}
        >
          {loading ? 'Updating..' : 'Update'}
        </button>
      </div>
    </div>
  )
}

export default function Settings() {
  const router = useRouter()
  const session = supabase.auth.session();
  function RouteLogin() {
    if (process.browser) { router.push('/login?next=/settings') }
  }
  
  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? RouteLogin() : <AccountData key={session.user.id} session={session} />}
    </div>
  )
}
