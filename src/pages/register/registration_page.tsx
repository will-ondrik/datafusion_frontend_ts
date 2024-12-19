import AuthService from "../../api/services/auth_service";

function RegistrationPage() {
    const authService = new AuthService();

    const handleRegistration = async() => {
        authService.handleGoogleRegistration();
    }

    return (
        <div>
            <h2>Register</h2>
            <button onClick={() => handleRegistration()}>Register with Google</button>
        </div>
    )
}

export default RegistrationPage;