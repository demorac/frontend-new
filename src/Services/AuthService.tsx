import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { removeUser } from "../Slices/UserSlice";

const BASE_URL = "https://private-job-portal.onrender.com/auth/"; // Ensure this is correct

/**
 * Logs in the user by sending credentials to the backend.
 * @param login - User login credentials (email & password)
 * @returns { jwt: string } - The JWT token received from the backend
 */
const loginUser = async (login: any) => {
    try {
        const response = await axios.post(`${BASE_URL}login`, login);
        // console.log("Full API Response:", response.data); // ✅ Debugging response

        if (!response.data || typeof response.data !== "object") {
            throw new Error("Invalid API response format");
        }

        // ✅ Handle different key names (`jwt`, `token`, `accessToken`)
        const jwt = response.data.jwt || response.data.token || response.data.accessToken;
        if (!jwt) {
            throw new Error("JWT not found in response");
        }

        // ✅ Store token in localStorage
        localStorage.setItem("token", jwt);

        return { jwt };
    } catch (error: any) {
        console.error("Login request failed:", error);

        // ✅ Extract meaningful error message from Axios response
        let errorMessage = "An unexpected error occurred.";
        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.response?.data?.error || "Login failed.";
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage); // ✅ Ensure a meaningful error is thrown
    }
};

/**
 * Decodes a JWT token and extracts user details.
 * @param token - JWT token string
 * @returns Decoded user object or null if invalid
 */
function jwtDecoder(token: string) {
    if (!token || typeof token !== "string") {
        console.error("jwtDecoder received an invalid token:", token);
        return null;
    }

    try {
        const decoded: any = jwtDecode(token);
        // console.log("Decoded JWT:", decoded); // ✅ Debugging

        if (!decoded.id) {
            console.warn("Decoded JWT does not contain 'id' field:", decoded);
        }

        return decoded;
    } catch (error) {
        console.error("Invalid JWT token", error);
        return null;
    }
}

/**
 * Logs the user out and redirects to the login page.
 * @param navigate - React Router's navigate function
 */
const navigateToLogin = (navigate: any) => {
    console.warn("Logging out: Clearing user session.");
    
    // ✅ Clear session data
    localStorage.removeItem("token");
    localStorage.removeItem("jwt");
    removeUser();

    // ✅ Use `setTimeout` to prevent instant re-render loop
    setTimeout(() => {
        navigate("/login", { replace: true });
    }, 100);
};

export { loginUser, jwtDecoder, navigateToLogin };
