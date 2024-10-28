import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchConversations } from '../services/conversations';
import '../styles/Conversations.css'

const Conversations = () => {
    const [conversations, setConversations] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadConversations();
    }, []);

    const loadConversations = async () => {
        setLoading(true);
        setErrorMessage('');

        try {
            const data = await fetchConversations();
            setConversations(data);
        } catch (error) {
            console.error('Error loading conversations:', error) // debug log
            setErrorMessage(error.message);
            if (error.response?.status === 401) { // redirect to login if user is unauthorized
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleConversationClick = (conversationId) => {
        navigate(`/conversations/${conversationId}/messages`)
    };

    return (
        <div className='conversations-container'>
            <h2>Your Conversations</h2>

            {loading ? (
                <div className='loading-message'>Loading conversations...</div>
            ) : errorMessage ? (
                <div className='error-message'>{errorMessage}</div>
            ) : (
                <div className='conversations-list'>
                    {conversations.length === 0 ? (
                        <div className='no-conversations'>
                            No conversations found.
                        </div>
                    ) : (
                        conversations.map((conversation) =>(
                            <div
                                key={conversation.id}
                                className='conversation-item'
                                onClick={() => handleConversationClick(conversation.id)}
                            >
                                <div className='conversation-header'>
                                    <h3>Listing: {conversation.listing.title}</h3>
                                    <span className='conversation-date'>
                                        {new Date(conversation.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className='conversation-participants'>
                                    Participants: {conversation.participants
                                    .map(participant => participant.username)
                                    .join(', ')}
                                </div>

                                {conversation.last_message && (
                                    <div className='conversation-last-message'>
                                        <p>
                                            Last message: {conversation.last_message.conversation.substring(0, 50)}
                                            {conversation.last_message.content.length > 50 ? '...' : ''}
                                        </p>
                                        <span className='message-date'>
                                            {new Date(conversation.last_message.created_at)
                                            .toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>  
            )}
        </div>
    );
};

export default Conversations;