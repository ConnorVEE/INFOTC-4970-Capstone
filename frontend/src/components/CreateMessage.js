import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Navbar from './Navbar';

const CreateMessage = () => {
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await axiosInstance.post('/conversations/start/', {
                username,
                title,
                content,
            });

            // Redirect on success
            navigate(`/conversations/${response.data.conversation_id}`);
        } catch (error) {
            console.error('Error sending message: ', error);
            setErrorMessage('Failed to send message.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='create-message-container'>
            <Navbar />
            <h2>Create a New Message</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Recipient Username: </label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <label>Heading (Optional): </label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Message Content: </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type='submit' disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
            </form>
            {errorMessage && <div className='error-message'>{errorMessage}</div>}
        </div>
    );
};

export default CreateMessage;