import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles?: string[];
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const token = useSelector((state: any) => state.jwt || state.token);

    if (!token) {
        console.warn("No token found. Redirecting to login.");
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded: any = jwtDecode(token);
        // console.log("Decoded JWT:", decoded); // ✅ Debugging JWT structure

        // ✅ Use `accountType` instead of `applicantType`
        const userRole = decoded.accountType; 
        // console.log("User role from JWT:", userRole); // ✅ Debug role name

        if (allowedRoles && !allowedRoles.includes(userRole)) {
            console.warn("Unauthorized access detected. Redirecting to /unauthorized...");
            return <Navigate to="/unauthorized" replace />;
        }

        return children;
    } catch (error) {
        console.error("Invalid token. Redirecting to login.", error);
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoutes;
