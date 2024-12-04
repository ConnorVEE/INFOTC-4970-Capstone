import axiosInstance from "../api/axiosInstance";

// Fetch all conversations
export const fetchConversations = async () => {
    try {
        const response = await axiosInstance.get('/conversations/');
        return response.data;
    } catch (error) {
        console.error('Error fetching conversations: ', error);
        throw error;
    }
};

// Fetch messages for specific conversation
export const fetchMessages = async (conversationId) => {
    try {
        const response = await axiosInstance.get(
            `/conversations/${conversationId}/messages`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching messages: ', error);
        throw error;
    }
};

// Send a new message in a conversation
export const sendMessage = async (conversationId, messageContent) => {
    try {
        const response = await axiosInstance.post(
            `/conversations/${conversationId}/messages`, {
                content: messageContent
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending message: ', error);
        throw error;
    }
};