import axiosInstance from '../api/axiosInstance'; 

// Log out function
const logout = () => {

    // Clear tokens
    document.cookie = "access_token=; Max-Age=-99999999;";  
    document.cookie = "refresh_token=; Max-Age=-99999999;";

    window.location.href = '/login';
};

// Log in function
const login = async (username, password) => {
    try {
        const response = await axiosInstance.post('/users/login/', {
            username,
            password,
        });

        console.log('Login Successful:', response.data);
        return response.data; // This will return user data on success

    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            throw new Error(error.response.data.error || 'Unknown error');

        } else if (error.request) {
            console.error('Error request:', error.request);
            throw new Error('No response from server.');

        } else {
            console.error('Error message:', error.message);
            throw new Error('An error occurred: ' + error.message);
            
        }
    }
};


export { logout, login };
