import { Routes, Route } from "react-router-dom"
import LandingLayout from "../layouts/LandingLayout"
import Landing from "../Pages/Landing/Landing"
import Login from "../auth/Login"
import Tutorial from "../Pages/Landing/Tutorial"
import Library from "../Pages/Landing/Library"
import UserRegistration from "../auth/UserRegestration"
import Forget from "../auth/Forget"
import ProtectedRoute from "../Components/ProtectedRoutes/ProtectedRoute"
import DashboardLayout from "../layouts/DashboardLayout"
import { GuestRoute } from "../Components/GuestRoutes/GuestRoute"

function AppRoutes() {
    return (
        <Routes>

            {/* GUEST ROUTES */}
            <Route element={<GuestRoute />}>
                <Route element={<LandingLayout />}>
                    <Route path="/" element={<Landing />} />
                    <Route path="/tutorial" element={<Tutorial />} />
                    <Route path="/library" element={<Library />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<UserRegistration />} />
                {/* <Route path="/forget" element={<Forget />} /> */}
            </Route>

            {/* PROTECTED ROUTES */}
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard/*" element={<DashboardLayout />} >

                </Route>
            </Route>

        </Routes>
    )
}

export default AppRoutes
