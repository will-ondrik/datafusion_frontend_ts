import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/animations/spinner/spinner";
import { ProviderProps } from "../types/props/ProviderProp";

/**
 * Tier1Route is a route guard that checks if the user is authenticated and has a tier level of 2 or higher.
 * @param param0 - children
 * @returns - children if the user is authenticated and has a tier level of 2 or higher, otherwise it will redirect to the dashboard.
 */
const Tier2Route: React.FC<ProviderProps> = ({ children }) => {
    const { isAuthenticated, tier, isLoading } = useAuth();

    // If AuthContext is loading, show a spinner
    if (isLoading) {
        return (
            <div>
                <Spinner />
            </div>
        )
    }

    return isAuthenticated && tier != null && tier >= 1 ? children : <Navigate to="/dashboard" replace />
}

export default Tier2Route;
