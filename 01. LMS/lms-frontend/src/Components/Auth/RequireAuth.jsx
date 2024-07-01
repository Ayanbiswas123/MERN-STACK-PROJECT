import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
    
    // Checking if user is logged in
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn) || false;

    // Getting the user's role
    const role = useSelector((state) => state?.auth?.role);

    console.log(isLoggedIn, role);

    return isLoggedIn && allowedRoles.includes(role) ? (
        <Outlet />
    ) : isLoggedIn ? (
        <Navigate to="/denied" />
    ) : (
        <Navigate to="/login" />
    );
}

export default RequireAuth;
