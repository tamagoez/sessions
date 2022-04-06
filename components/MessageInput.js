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
    <div className="flex">
      <div>
        <label className={!uploading ? "btn" : "btn loading"} htmlFor="single">
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
        className="bg-base-100 border border-solid border-gray-300 appearance-none rounded w-full py-2 px-3 text-black-800 leading-tight focus:shadow-outline"
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
