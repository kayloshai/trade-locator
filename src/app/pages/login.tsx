import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../design-system/inputs/TextInput";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // Adjust path if needed
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
            await user.reload(); // <-- Add this line
            // Check if the email is verified
            if (!user.emailVerified) {
                await sendEmailVerification(user);
                setError("Please verify your email address. We've sent you a new verification email.");
                return;
            }

            //console.log("Login successful:", userCredential.user);
            if (onSubmit) onSubmit(value1, value2);
            // Navigate to landing page after successful login
            navigate("/", { state: { userEmail: userCredential.user.email } });
        } catch (err: any) {
            setError(err.message || "Login failed");
            console.log("Login failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`inputbox-container d-flex justify-content-center align-items-center ${className || ""}`} style={{ minHeight: "300px" }}>
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
                <div className="d-flex gap-2 w-100 justify-content-center">
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? "Logging in..." : button1Label}
                    </button>
                    <button className="btn btn-warning" type="button" disabled={loading}>
                        {button2Label}
                    </button>
                </div>
            </form>
        </div>
    );
}