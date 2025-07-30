// src/app/pages/EmailVerificationPending.tsx
import { Link } from 'react-router-dom';

export const EmailVerificationPending = () => {
    return (
        <div className="container py-5 text-center">
            <h2>Check Your Email</h2>
            <p>We've sent a verification email to your address.</p>
            <p>Please click the link in the email to verify your account, then return to log in.</p>
            <Link to="/login" className="btn btn-primary">
                Back to Login
            </Link>
        </div>
    );
};