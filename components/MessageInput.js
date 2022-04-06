import { useState } from "react";
import { MdUpload } from "react-icons/md";

const MessageInput = ({ onSubmit }) => {
  const [messageText, setMessageText] = useState("");
  const [uploading, setUploading] = useState(false)

  const submitOnEnter = (event) => {
    // Watch for enter key
    if (event.keyCode === 13) {
      onSubmit(messageText);
      setMessageText("");
    }
  };
  
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
        <label className={!uploading ? "btn btn-square bg-base-500" : "btn btn-square loading bg-base-500"} htmlFor="single">
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
      <input
        className="bg-base-100 input input-ghost w-full max-w-xs pl-3"
        type="text"
        placeholder="Type a Message (MarkDown available)"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => submitOnEnter(e)}
      />
      </div>
    </div>
  );
};

export default MessageInput;
