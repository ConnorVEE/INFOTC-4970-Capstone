import axiosInstance from '../api/axiosInstance'; 

// Log out function
const logout = async () => {
    try {
        // Call the logout endpoint to delete cookies on the server-side
        await axiosInstance.post('/users/logout/');

        // Redirect to login page after successful logout
        window.location.href = '/login';
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

// const logout = () => {

//     document.cookie = "access_token=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=Lax;";
//     document.cookie = "refresh_token=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=Lax;";
//     console.log(document.cookie);  // Check remaining cookies
//     window.location.href = '/login';
// };


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
