import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth_context";
import Spinner from "../components/animations/spinner/spinner";
import { ProviderProps } from "../types/props/Props";

/**
 * Tier1Route is a route guard that checks if the user is authenticated and has a tier level of 1 or higher.
 * @param param0 - children
 * @returns - children if the user is authenticated and has a tier level of 1 or higher, otherwise it will redirect to the dashboard.
 */
const Tier1Route: React.FC<ProviderProps> = ({ children }) => {
    const { isAuthenticated, tier, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div>
                <Spinner />
            </div>
        )
    }

    if (isAuthenticated && tier != null && tier >= 1) {
        return <>{children}</>
    }

    return <Navigate to="/login" replace />
}

export default Tier1Route;
