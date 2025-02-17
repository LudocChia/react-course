import { useEffect, useRef } from 'react';
import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import './ChatMessage.css'

const ChatMessage = ({ message, sender }) => {

    return (
        <div
            className={`chatbot__message--${sender}`}
        >
            <div className="chatbot__message-icon ">
                {sender === 'robot' && <img src={RobotProfileImage} alt="" width="50px" />}
            </div>
            <div className="chatbot__message-text">
                {message}
            </div>
            <div className="chatbot__message-icon ">
                {sender === 'user' && <img src={UserProfileImage} alt="" width="50px" />}

            </div>
        </div >
    )
}

export const ChatMessageComponent = ({ chatMessages }) => {
    const chatMessagesRef = useRef(null);

    useEffect(() => {
        const containerElem = chatMessagesRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div
            ref={chatMessagesRef}
            className="chatbot__messages">
            {
                chatMessages.map((chatMessage) => {
                    return (
                        <ChatMessage
                            message={chatMessage.message}
                            sender={chatMessage.sender}
                            key={chatMessage.key}
                        />
                    );
                })
            }
        </div>
    )

}
