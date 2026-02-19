import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../../auth/Token";

export function GuestRoute() {

    if (isTokenValid()) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
