import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../design-system/inputs/TextInput";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { sendEmailVerification } from "firebase/auth";

interface Props {
    className?: string;
    placeholder1?: string;
    placeholder2?: string;
    type1?: 'text' | 'password' | 'email';
    type2?: 'text' | 'password' | 'email';
    button1Label?: string;
    button2Label?: string;
    onSubmit?: (value1: string, value2: string) => void;
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const Login = ({
    className,
    placeholder1 = "Username",
    placeholder2 = "Password",
    type1 = "text",
    type2 = "password",
    button1Label = "Login",
    button2Label = "Cancel",
    onSubmit
}: Props) => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resetSent, setResetSent] = useState<string | null>(null);
    const [showReset, setShowReset] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Client-side validation
        if (!value1 || !value2) {
            setError("Please fill in both fields.");
            return;
        }
        if (type1 === "email" && !isValidEmail(value1)) {
            setError("Please enter a valid email address.");
            return;
        }
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, value1, value2);
            const user = userCredential.user;
            await user.reload();
            if (!user.emailVerified) {
                await sendEmailVerification(user);
                setError("Please verify your email address. We've sent you a new verification email.");
                return;
            }
            if (onSubmit) onSubmit(value1, value2);
            localStorage.setItem("loginTimestamp", Date.now().toString()); // <-- Add this line
            navigate("/", { state: { userEmail: userCredential.user.email } });
            console.log("Login successful:", user);
        } catch (err: any) {
            setError(err.message || "Login failed");
            console.log("Login failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetSent(null);
        setError(null);
        if (!resetEmail || !isValidEmail(resetEmail)) {
            setError("Please enter a valid email address to reset your password.");
            return;
        }
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setResetSent("A password reset email has been sent. Please check your inbox.");
            setTimeout(() => {
                setShowReset(false);
                setResetSent(null);
                setError(null);
                setResetEmail("");
            }, 2000); // Show message for 2 seconds, then return to login
        } catch (err: any) {
            setError(err.message || "Failed to send password reset email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`inputbox-container d-flex justify-content-center align-items-center ${className || ""}`} style={{ minHeight: "300px" }}>
            {!showReset ? (
                <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column align-items-center gap-3 bg-light p-4 rounded shadow"
                    style={{ minWidth: 300 }}
                    aria-labelledby="login-title"
                >
                    <h2 id="login-title" className="mb-3">Login</h2>
                    <TextInput
                        id="login-username"
                        label={type1 === "email" ? "Email" : "Username"}
                        type={type1}
                        placeholder={placeholder1}
                        value={value1}
                        onChange={e => setValue1(e.target.value)}
                        autoComplete="username"
                    />
                    <TextInput
                        id="login-password"
                        label="Password"
                        type={type2}
                        placeholder={placeholder2}
                        value={value2}
                        onChange={e => setValue2(e.target.value)}
                        autoComplete="current-password"
                    />
                    {error && (
                        <div className="text-danger small w-100 text-center" aria-live="polite">
                            {error}
                        </div>
                    )}
                    {resetSent && (
                        <div className="text-success small w-100 text-center" aria-live="polite">
                            {resetSent}
                        </div>
                    )}
                    <div className="d-flex gap-2 w-100 justify-content-center">
                        <button className="btn btn-primary" type="submit" disabled={loading}>
                            {loading ? "Logging in..." : button1Label}
                        </button>
                        <button className="btn btn-warning" type="button" disabled={loading}>
                            {button2Label}
                        </button>
                    </div>
                    <div className="w-100 text-end">
                        <button
                            type="button"
                            className="btn btn-link p-0 small"
                            style={{ textDecoration: "underline" }}
                            onClick={() => setShowReset(true)}
                            tabIndex={0}
                        >
                            Forgot password?
                        </button>
                    </div>
                </form>
            ) : (
                <form className="d-flex flex-column align-items-center gap-3 bg-light p-4 rounded shadow" style={{ minWidth: 300 }} onSubmit={handlePasswordReset}>
                    <h2 className="mb-3">Reset Password</h2>
                    <TextInput
                        id="reset-email"
                        label="Email for password reset"
                        type="email"
                        placeholder="Enter your email"
                        value={resetEmail}
                        onChange={e => setResetEmail(e.target.value)}
                        autoComplete="email"
                        disabled={!!resetSent} // Disable input if resetSent is set
                    />
                    {error && (
                        <div className="text-danger small w-100 text-center" aria-live="polite">
                            {error}
                        </div>
                    )}
                    {resetSent && (
                        <div className="text-success small w-100 text-center" aria-live="polite">
                            {resetSent}
                        </div>
                    )}
                    <button
                        className="btn btn-secondary w-100 mt-2"
                        type="submit"
                        disabled={loading || !!resetSent} // Disable button if loading or resetSent is set
                    >
                        {loading ? "Sending..." : "Send Password Reset Email"}
                    </button>
                    <button
                        type="button"
                        className="btn btn-link p-0 small"
                        style={{ textDecoration: "underline" }}
                        onClick={() => {
                            setShowReset(false);
                            setResetSent(null);   // Clear reset message
                            setError(null);       // Optionally clear error too
                        }}
                    >
                        Back to Login
                    </button>
                </form>
            )}
        </div>
    );
}