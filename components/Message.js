import { useContext } from 'react'
import UserContext from '~/lib/UserContext'
import { deleteMessage } from '~/lib/Store'
import TrashIcon from '~/components/TrashIcon'

const Message = ({ message }) => {
  const { user, userRoles } = useContext(UserContext)
  // const replacedmessage = message.inserted_at.replace('T', '  ').replace('-', '/').replace('-', '/').replace('Z', '')

  function addid(textstr, id){
    if (!(textstr.indexOf(">>", 0) == -1)) {
      console.log('[' + id + '] >> found in ' + textstr.indexOf(">>", 0))
      const clip = textstr.slice(textstr.indexOf(">>", 0), textstr.indexOf(' ', textstr.indexOf(">>", 0)))
      console.log('Cliped: ' + clip)
      console.log('ID' + clip.replace('>>', ''))
      return (textstr.replace(clip, '<a href=#' + clip.replace('>>', '') + '>' + clip + '</a>').replace('>>', '%%'))
    } else {
      console.log('[' + id + '] >> Not found!')
      return textstr
    }
  }

  function changedmess(messagevalues, messageids){
    document.getElementById(messageids).innerHTML = '<p className="text-white">' + addid(messagevalues, messageids).replace('%%', '>>') + '</p>'
    return null
  }

  function returnmessage(message2, ids, usernames) {
    return '<a name={message.id}><p className="text-white font-bold" id={message.id}>{message.author.username}</p><p className="text-gray-500">{message.id} - {replacedmessage.substring(0, replacedmessage.indexOf("."))}</p><p className="text-white">' + "{addid(message.message, message.id).replace('%%', '>>')}</p></a>"
  }

  return (
    <div className="py-1 flex items-center space-x-2">
      <div className="text-gray-100 w-4">
        {(user?.id === message.user_id ||
          userRoles.some((role) => ['admin', 'moderator'].includes(role))) && (
          <button onClick={() => deleteMessage(message.id)}>
            <TrashIcon />
          </button>
        )}
      </div>
      <div id="Message">
        <a name={message.id}><p className="text-white font-bold" id={message.id}>{message.author.username}</p>
        <p className="text-gray-500">{message.id}</p>
        <p className="text-white">{message.message}</p></a>
      </div>
    </div>
  )
}

/* {document.querySelector('#Message').innerHTML = returnmessage(message.message, message.id, message.author.username)} */

export default Message
