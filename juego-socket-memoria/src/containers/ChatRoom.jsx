import React, { useEffect } from 'react'
import { CirclePicker } from 'react-color'

import RaisedButton  from "material-ui/RaisedButton"
import Subheader from 'material-ui/Subheader'

import MessageDisplayBox from '@/components/MessageDisplayBox'
import MessageInputBox from '@/components/MessageInputBox'
import UserList from '@/components/UserList'
import Main from '@/components/Game/Main'


const ChatRoom = props => {
  const { actions, socket, uid, userlist } = props

  useEffect(() => {
    socket.on('enterUser', username =>  actions.updateMessages({ type: 'ENTER_MESSAGE', username }))
    socket.on('leaveUser', username => actions.updateMessages({ type: 'LEAVE_MESSAGE', username}))
    socket.on('updateUserList', userlist => actions.updateUserList(userlist))
    socket.on('updateMessages', messages => actions.updateMessages(messages))
  }, [])

  const handleChangeComplete = color => actions.changeMessageBoxColor(color.hex)

  const handleLeaveChatRoom = () => {
    socket.emit('leave', uid)
    actions.leaveChatRoom()
    location.reload()
  }

  const handleClearMessages = () => actions.clearMessages()

  return(
    <div>
      <div className="chatroom-container">
        <div className="chatroom-left-block">
          <div className="chatroom-userlist">
            <UserList userlist={userlist} />
          </div>
        </div>
        <div className="chatroom-right-block">
          <div className="chatroom-otherfn">
            <RaisedButton
              className="chatroom-otherfn-leave"
              label="Dejar Sala"
              primary={true}
              onClick={handleLeaveChatRoom}
            />
            
     
          </div>
          <Main/>
            <div className="chatroom-messages">
              <MessageDisplayBox {...props} />
            </div>
           
        </div>
      </div>
      
    </div>
  )
}

export default ChatRoom