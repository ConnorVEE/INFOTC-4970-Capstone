import axios from 'axios';
import { logout }from '../services/auth';

const axiosInstance = axios.create({
    // Our backend
    baseURL: 'http://localhost:8000/api', 
    // Tells Axios to send cookies with every request
    withCredentials: true 
});

// Function to handle refreshing the access token
const refreshToken = async () => {
    try {
        console.log("Attempting to refresh token");
        const response = await axiosInstance.post('/users/refresh/');
        const newAccessToken = response.data.access;

        return newAccessToken;

    } catch (error) {
        console.error("Token refresh failed", error);
        throw error;
    }
};

// Checks if tokens have expired and refreshes if needed
let hasTriedRefresh = false;  // Session-level flag for refresh attempts

axiosInstance.interceptors.response.use(

    (response) => {
        console.log("Response received:", response);
        return response;
    },

    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401) {

            // Skip refresh if the error occurs on login or register routes
            if (originalRequest.url.includes('/register/') || originalRequest.url.includes('/login/')) {
                return Promise.reject(error);
            }

            // Check if a refresh token exists before attempting refresh
            const refreshToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('refresh_token='))
            ?.split('=')[1];

            if (refreshToken && !hasTriedRefresh) {
                hasTriedRefresh = true;
                originalRequest._retry = true;

                try {
                    const newAccessToken = await refreshToken();
                    console.log("New access token acquired:", newAccessToken);

                    // Set the new access token in headers
                    axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    // Retry the original request with the new token
                    return axiosInstance(originalRequest);

                } catch (err) {
                    console.error("Token refresh failed, logging out...");
                    hasTriedRefresh = false;  // Reset the flag here to prepare for next session
                    logout();

                    return Promise.reject(err);
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
export { refreshToken };
