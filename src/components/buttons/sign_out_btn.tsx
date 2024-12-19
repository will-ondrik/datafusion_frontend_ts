import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth_context";

const SignOutButton: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        logout();
        navigate('/login');
    }

    return (
        <button onClick={handleLogout}>Sign Out</button>
    )
}

export default SignOutButton;