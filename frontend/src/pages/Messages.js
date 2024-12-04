import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMessages, sendMessage } from '../services/conversation'; // Import service
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import '../styles/Messages.css';

const Messages = () => {
    const { conversationId } = useParams(); // Get conversation ID from URL
    const { user } = useContext(AuthContext); // Get logged in user info to determine which participant is sender
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(''); // State for input field
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false); // State for send button loading

    useEffect(() => {
        loadMessages();
    }, [conversationId]);

    const loadMessages = async () => {
        try {
            const data = await fetchMessages(conversationId) // Use service function 
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages: ', error);
            setErrorMessage('Failed to load messages.');
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) {
            setErrorMessage('Message content cannot be empty.');
            return;
        }

        setSending(true);
        setErrorMessage('');

        try {
            const message = await sendMessage(conversationId, newMessage); // Send message
            setMessages((prevMessages) => [...prevMessages, message]); // Append new message
            setNewMessage(''); // Clear input field
        } catch (error) {
            console.error('Error sending message: ', error);
            setErrorMessage('Failed to send message.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className='messages-container'>
            {/* <Navbar /> */}
            <h2>Conversation Messages</h2>
            {loading ? (
                <div className='loading-message'>Loading message...</div>
            ) : errorMessage ? (
                <div className='error-message'>{errorMessage}</div>
            ) : (
                <>
                    <div className='messages-list'>
                        {messages.map((message) => (
                            <div key={message.id} 
                                className={`message-item ${
                                    message.sender === user.username ? 'sent' : 'received'
                                }`}
                            >
                                <p>{message.content}</p>
                                <span className='message-timestamp'>
                                    {new Date(message.date_created).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className='message-content-container'>
                        <textarea
                            placeholder='Write your message...'
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            disabled={sending} // Disable input while sending
                        />
                        <button onClick={handleSendMessage} disabled={sending}>
                            {sending ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Messages;