import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import './ChatInput.css'

export const ChatInputComponent = ({ chatMessages, setChatMessages }) => {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    async function sendMessage() {
        setIsLoading(true);

        if (isLoading === true || inputText === '') return;
        cleanMessage();

        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                key: crypto.randomUUID()
            }
        ];
        setChatMessages([
            ...newChatMessages,
            {
                message: 'Loading...',
                sender: 'robot',
                key: crypto.randomUUID()
            }
        ]);

        const response = await Chatbot.getResponseAsync(inputText);
        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: 'robot',
                key: crypto.randomUUID()
            }
        ]);
        setIsLoading(false)
    }

    function cleanMessage() {
        setInputText('');
    }

    function handleEnter(event) {
        if (event.key === 'Enter') {
            sendMessage();
        } else if (event.key === 'Escape') {
            cleanMessage();
        }
    }

    return (
        <div className="chatbot__input-container">
            <input
                className="chatbot__input"
                type="text"
                placeholder="Send a message to Chatbot"
                onChange={saveInputText}
                value={inputText}
                onKeyDown={handleEnter}
            />
            <button
                onClick={sendMessage}
                className="chatbot__send-button"
            >Send</button>
        </div>
    )

}