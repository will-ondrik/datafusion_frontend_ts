import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../api/services/auth_service';
function LoginPage() {
    const navigate = useNavigate();
    const authService = new AuthService();

    /**
     * Logs the user in using Google OAuth2.
     */
    const googleLogin = () => {
        authService.handleGoogleLogin();
    };

    /**
     * Handles the Google OAuth2 callback.
     * 
     * @returns - Redirects the user to the dashboard if the Google authorization code is present in the URL.
     */
    const handleGoogleCallback = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        console.log('Query Params', queryParams)
        const code = queryParams.get('code');

        if (!code) {
            console.error('No code found in URL');
            return;
        }

        const result = await authService.processGoogleCallback();
        if (result) {
            console.log('Login successful, redirecting to dashboard...');
            navigate('/dashboard', { replace: true });
        } else {
            console.error('Failed to authenticate user.');
        }
    };

    // Process the callback automatically if the Google authorization code is present in the URL
    useEffect(() => {
        handleGoogleCallback();
    }, []); // Run only once on component mount

    return (
        <div>
            <h2>Sign In</h2>
            <button onClick={googleLogin}>Login with Google</button>
        </div>
    );
}

export default LoginPage;
