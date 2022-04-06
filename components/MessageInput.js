import { useState } from "react";
import { MdUpload } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import supabase from '~/utils/supabaseClient';

const MessageInput = ({ onSubmit, channelId }) => {
  const [messageText, setMessageText] = useState("");
  const [uploading, setUploading] = useState(false)
  const [ignorekey, setIgnorekey] = useState(false)

  async function setdb(path) {
    const user = supabase.auth.user();
    try {
      const { error } = await supabase
        .from('files')
        .insert([
          { url: path, created_by: user.id, channel: channelId }
        ])
      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Error uploading: ', error.message)
    }
    try {
      const { data, error } = await supabase
        .from('channels_chat')
        .insert([
          { userid: user.id, message: 'Attached file: ' , channel: channelId },
          { userid: user.id, message: path , channel: channelId, type: 'storage' },
        ])
        if (error) {
          throw error
        }
    } catch (error) {
      console.error('Error uploading: ', error.message)
    }
  }

  const submitOnEnter = (event) => {
    // Watch for enter key
    // http://nanoappli.com/blog/archives/1092
    if (event.keyCode === 13) {
      sendmessage(messageText)
      setMessageText("");
      document.getElementById('messageinput').value = '';
      document.getElementById('messageinput').value = document.getElementById('messageinput').value.replace(/[\n\r]/g,"");
    }
  };

  function sendmessage(messageText){
    setIgnorekey(true);
    onSubmit(messageText);
    setMessageText("");
    setIgnorekey(false);
  }
  
  async function uploadFile(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select a file to upload.')
      }

      const file = event.target.files[0]
      // const fileExt = file.name.split('.').pop()
      // const fileName = `${Math.random()}.${fileExt}`
      // const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('files')
        .upload(file.name, file)

      if (uploadError) {
        throw uploadError
      }

      setdb(filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex w-full">
      <div>
        <label className={!uploading ? "btn btn-square" : "btn btn-square loading"} htmlFor="single">
          {!uploading ? <MdUpload /> : null}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept=""
          onChange={uploadFile}
          disabled={uploading}
        />
      </div>
      <div className="grow">
      <input
        className="bg-base-100 input input-bordered w-full max-w-xspl-3"
        id="messageinput"
        type="text"
        placeholder="Type a Message (MarkDown available)"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => submitOnEnter(e)}
        disabled={ignorekey}
      />
      </div>
      <button className="btn btn-square" onClick={() => sendmessage(document.getElementById('messageinput').value)}><IoSend /></button>
    </div>
  );
};

export default MessageInput;
