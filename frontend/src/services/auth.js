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
        const response = await axiosInstance.post('users/login/', {
            username,
            password,
        });

        return response.data; 

    } catch (error) {
        throw error;  
    }
};

export { logout, login };
