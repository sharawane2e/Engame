import React from 'react'

const MessageBox = (props) => {
    return (
        <div className="message_box">
            {props.children}
        </div>
    )
}

export default MessageBox
