import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

const MessageDisplayBox = ({ messages, messageBackgroundColor, uid }) => {
  const messageElement = []
  let messageEndLine

  useEffect(() => {
    ReactDOM.findDOMNode(messageEndLine).scrollIntoView()
  })

  for (let [index, message] of messages.entries()) {
    let systemMsg = ''

    if (message.hasOwnProperty('type')) {
      switch (message.type) {
        case 'ENTER_MESSAGE': systemMsg = 'Ha iniciado sesion'
          break
        case 'LEAVE_MESSAGE': systemMsg = 'Ha dejado la sala'
          break
      }

      messageElement.push(
        <div key={index} className="message system-message">
          {`${message.username} ${systemMsg}`}
        </div>
      )
    } else {
     <div></div>
    }
  }

  return (
    <div>
      <div>
        {messageElement}
      </div>
      <div className="message" ref={el => messageEndLine = el} />
    </div>
  )
}

export default MessageDisplayBox