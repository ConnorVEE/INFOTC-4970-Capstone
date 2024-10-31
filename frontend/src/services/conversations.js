import axiosInstance from "../api/axiosInstance";

const fetchConversations = async () => { // Fetch all conversations
    try {
        const response = await axiosInstance.get('http://localhost:8000/api/conversations/');
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.respone) {
                console.error('Error response:', error.response.data);
                throw new Error(error.response.data.detail || 'Failed to fetch conversations');
            } else if (error.request) {
                console.error('Error request:', error.request);
                throw new Error('No response from server.');
            } else {
                console.error('Error message:', error.message);
                throw new Error('An error occurred: ' + error.message);
            }
        }
    }
};

const fetchMessages = async (conversationId) => { // Display the messages sent for an individual conversation
    try {
        const response = await axiosInstance.get(
            `http://localhost:8000/api/conversations/${conversationId}/messages`
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.respone) {
                console.error('Error response:', error.response.data);
                throw new Error(error.response.data.detail || 'Failed to fetch conversation');
            } else if (error.request) {
                console.error('Error request:', error.request);
                throw new Error('No response from server.');
            } else {
                console.error('Error message:', error.message);
                throw new Error('An error occurred: ' + error.message);
            }
        }
    }
};

export { fetchConversations, fetchMessages };