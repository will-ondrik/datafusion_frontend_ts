import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth_context";
import Spinner from "../components/animations/spinner/spinner";
import { ProviderProps } from "../types/props/Props";

/**
 * Tier3Route is a route guard that checks if the user is authenticated and has a tier level of 3.
 * @param param0 - children
 * @returns - children if the user is authenticated and has a tier level of 3, otherwise it will redirect to the dashboard.
 */
const Tier3Route: React.FC<ProviderProps> = ({ children }) => {
    const { isAuthenticated, tier, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div>
                <Spinner />
            </div>
        )
    }

    if (isAuthenticated && tier != null && tier >= 3) {
        return <>{children}</>
    }

    return <Navigate to='login' replace />

}

export default Tier3Route;
