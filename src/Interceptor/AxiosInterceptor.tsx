import axios from "axios";
import { navigateToLogin } from "../Services/AuthService";

const axiosInstance = axios.create({
    baseURL: "https://3.110.42.137", // Ensure this is correct
});

// ✅ Request Interceptor (Attach JWT Token)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Ensure correct token key
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.error("No token found, authentication required");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Response Interceptor (Handle Unauthorized Errors)
export const setupResponseInterceptor = (navigate: any) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                console.warn("Unauthorized: Redirecting to login...");
                navigateToLogin(navigate); // ✅ Call function to properly log out
            }
            return Promise.reject(error);
        }
    );
};

export default axiosInstance;
