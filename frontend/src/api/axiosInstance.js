import axios from 'axios';
import { logout }from '../services/auth';

const axiosInstance = axios.create({
    // Our backend
    baseURL: 'http://localhost:8000/api', 
    // Tells Axios to send cookies with every request
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json',
    }
});

// Function to handle refreshing the access token
const refreshToken = async () => {
    try {
        const response = await axiosInstance.post('/users/refresh/');
        const newAccessToken = response.data.access;

        return newAccessToken;

    } catch (error) {
        console.error("Token refresh failed", error);
        throw error;
    }
};

// Checks if tokens have expired and refreshes if needed
axiosInstance.interceptors.response.use(
    (response) => {
        // Return the response if it succeeds
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If the error is due to an expired access token (401 error)
        if (error.response && error.response.status === 401) {
            
            // Check if the endpoint is one that should not require token refreshing
            if (
                originalRequest.url.includes('/register/') ||
                originalRequest.url.includes('/login/') 
            ) {
                // Just reject the promise for registration or login requests
                return Promise.reject(error);
            }

            // If the request hasn't been retried yet
            if (!originalRequest._retry) {
                // Mark the request as being retried
                originalRequest._retry = true;  

                try {
                    // Attempt to refresh the access token
                    const newAccessToken = await refreshToken();

                    // Update the headers with the new access token and retry the original request
                    axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    // Retry the original request with the new token
                    return axiosInstance(originalRequest);
                } catch (err) {
                    // Logs user out upon failure 
                    logout();
                }
            }
        }

        // If the request fails for another reason, reject the promise
        return Promise.reject(error);
    }
);

export default axiosInstance;
export { refreshToken };
