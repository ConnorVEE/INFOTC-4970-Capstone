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
        console.log('Attempting login for:', username)
        const response = await axiosInstance.post('http://localhost:8000/api/users/login/', {
            username,
            password,
        });

        console.log('Login Successful:', response); // Debug log

        if (response.data && response.data.success) {
            console.log('Login successful:', response.data); // debug log
            return response.data
        } else {
            console.log('Login failed:', response.data); // debug log
            throw new Error(response.data.message || "Login failed.");
        }

    } catch (error) {
        if (error.respone) {
            console.error('Error response:', error.response.data);
            alert('Login failed: ' + error.response.data.detail || 'Unknown error');
        } else if (error.request) {
            console.error('Error request:', error.request);
            alert('No response from server.');
        } else {
            console.error('Error message:', error.message);
            alert('An error occurred: ' + error.message);
        }
    }
};

export { logout, login };
