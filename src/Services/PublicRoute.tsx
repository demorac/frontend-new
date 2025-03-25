import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
    children: JSX.Element;
    redirectTo?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children, redirectTo = "/" }) => {
    const token = useSelector((state: any) => state.jwt || state.token);

    if (token) {
        try {
            const decoded: any = jwtDecode(token);
            console.log("Decoded JWT:", decoded); // ✅ Debugging

            // ✅ If user is authenticated, redirect them away from public routes
            return <Navigate to={redirectTo} replace />;
        } catch (error) {
            console.error("Invalid token, allowing access to public route.");
        }
    }

    return children; // ✅ Allow access to public routes if not authenticated
};

export default PublicRoute;
