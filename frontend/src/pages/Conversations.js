import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchConversations } from '../services/conversation.js';
import '../styles/Conversations.css'

const Conversations = () => {
    const [conversations, setConversations] = useState([]); // State to hold conversation
    const [errorMessage, setErrorMessage] = useState(''); // State to hold errors
    const [loading, setLoading] = useState(false); // State to handle loading state
    const navigate = useNavigate();

    useEffect(() => {
        loadConversations();
    }, []);

    // Load conversations from backend
    const loadConversations = async () => {
        setLoading(true);
        setErrorMessage('');

        try {
            const data = await fetchConversations(); // Fetch data from backend
            setConversations(data); // Update state with fetched data
        } catch (error) {
            console.error('Error loading conversations:', error) // Debug log

            setErrorMessage(
                error.response?.data?.detail || 'Failed to load conversations.'
            );

            if (error.response?.status === 401) { // redirect to login if user is unauthorized
                navigate('/login');
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleConversationClick = (conversationId) => {
        navigate(`/conversations/${conversationId}/messages`); // Navigate to messages for the selected conversation
    };

    return (
        <div className='conversations-container'>
            <h2>Your Conversations</h2>

            {/* Display loading state */}
            {loading ? (
                <div className='loading-message'>Loading conversations...</div>
            ) : errorMessage ? (
                // Display error message if API call fails
                <div className='error-message'>{errorMessage}</div>
            ) : (
                // Display list of conversations
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
                                    <h3>Listing: {conversation.listing?.title || 'Unknown'}</h3>
                                    <span className='conversation-date'>
                                        {new Date(conversation.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className='conversation-participants'>
                                    Participants: {conversation.participants
                                        .map((participant) => participant.username)
                                        .join(', ')}
                                </div>
                                
                                {/* Display last message if it exists */}
                                {conversation.last_message && (
                                    <div className='conversation-last-message'>
                                        <p>
                                            Last message: {conversation.last_message.content.substring(0, 50)}
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