import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {

    const { isAuth } = useAuth();
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to={'/'} state={{ from: location }} />
    }

    return element;
}

export default ProtectedRoute;