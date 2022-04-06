import { useState } from "react";
import { MdUpload } from "react-icons/md";
import { IoSend } from "react-icons/io5";

const MessageInput = ({ onSubmit }) => {
  const [messageText, setMessageText] = useState("");
  const [uploading, setUploading] = useState(false)
  const [ignorekey, setIgnorekey] = useState(false)

  const submitOnEnter = (event) => {
    // Watch for enter key
    // http://nanoappli.com/blog/archives/1092
    if (event.keyCode === 13 && event.shiftKey) {
      sendmessage(messageText)
      setMessageText("");
      document.getElementById('messageinput').value = ''
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
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('files')
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
    <div className="flex w-full">
      <div>
        <label className={!uploading ? "btn btn-square bg-base-300" : "btn btn-square loading bg-base-300"} htmlFor="single">
          <MdUpload />
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
      <textarea
        className="bg-base-200 input input-bordered w-full max-w-xspl-3"
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
