import { useEffect, useState } from 'react'
import supabase from '~/utils/supabaseClient'

function AvatarSetting({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }


  async function uploadAvatar(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="avatar image"
            style={{ height: size, width: size }}
          />
        ) : (
          <div className="avatar no-image" style={{ height: size, width: size }} />
        )}
      <div style={{ width: size }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}

function AvatarUrl(id) {
  console.log('[AvatarUrl] Got prop: ' + id)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [avatarUrl2, setAvatarUrl2] = useState(null)
  useEffect(() => {
    if (!localStorage.getItem("avatar_" + id)){
      getProfile(id)
    } else {
      setAvatarUrl(localStorage.getItem("avatar_" + id))
    }
  }, [])
  
  async function getProfile(id) {
    try {
      // setLoading(true)
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`avatar_url`)
        .eq('id', id)
        .single()

      if (error && status !== 406) {
        throw error
      }
      if (data) {
        setAvatarUrl2(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      // setLoading(false)
    }
  }

  useEffect(() => {
    if (avatarUrl2) downloadImage(avatarUrl2)
  }, [avatarUrl2])
  
  function toBase64Url(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      toBase64Url(url, function(base64Url){
        console.log('base64Url : ', base64Url);
        localStorage.setItem('avatar_' + id, base64Url);
        setAvatarUrl(base64Url)
      });
      // setAvatarUrl(url)
      // return url
      //return data
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    } finally {
      console.log('[AvatarUrl] Got url: ' + avatarUrl)
    }
  }
  return avatarUrl;
}

export { AvatarSetting, AvatarUrl }
