import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../../auth/Token";

function ProtectedRoute() {

    if (!isTokenValid()) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
