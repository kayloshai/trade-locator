import { useState, useRef } from "react";
import { TextInput } from "../../design-system/inputs/TextInput";
import { auth, db } from "../../firebase/firebase"; // Adjust the import based on your project structure
import { createUserWithEmailAndPassword, updateProfile, type User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface Props {
    className?: string;
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password: string) {
    return (
        password.length >= 8 &&
        /[A-Za-z]/.test(password) &&
        /\d/.test(password)
    );
}

export const SignUp = ({ className }: Props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        const passwordsMatch = password === confirmPassword && password.length > 0;
        const emailValid = isValidEmail(email);
        const passwordValid = isValidPassword(password);

        if (!passwordsMatch || !emailValid || !passwordValid) {
            // Handle invalid form
            if (!emailValid) setEmailTouched(true);
            if (!passwordValid) setPasswordTouched(true);
            return;
        }

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Optionally update displayName
            await updateProfile(user, { displayName: username });

            // Create a Firestore document for the user
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                displayName: username,
                createdAt: new Date(),
                // Add any other custom fields here
            });

            // Redirect to logged-in landing page
            navigate("/logged-in");
        } catch (error: any) {
            if (error.code === "auth/email-already-in-use") {
                setFormError("This email address is already in use. Please use a different email or log in.");
            } else {
                setFormError(error.message || "Sign up failed. Please try again.");
            }
            console.error(error);
        }
    };

    const handleClear = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setEmailTouched(false);
        setPasswordTouched(false);
        setTimeout(() => {
            usernameRef.current?.focus();
        }, 0);
    };

    return (
        <div
            className={`d-flex justify-content-center align-items-center ${className || ""}`}
            id="sign-up-page"
            style={{ minHeight: "300px" }}
        >
            <form
                onSubmit={handleSubmit}
                className="d-flex flex-column align-items-center gap-3 bg-light p-4 rounded shadow"
                style={{ minWidth: 340, width: 370, maxWidth: "100%" }}
                aria-labelledby="signup-title"
            >
                <h2 id="signup-title" className="mb-3">Sign Up</h2>
                <TextInput
                    id="username"
                    label="Username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoComplete="username"
                />
                <TextInput
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                />
                {emailTouched && !isValidEmail(email) && (
                    <div id="email-error" className="text-danger small w-100 text-start" aria-live="polite">
                        Please enter a valid email address.
                    </div>
                )}
                <TextInput
                    id="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="new-password"
                />
                {passwordTouched && !isValidPassword(password) && (
                    <div id="password-error" className="text-danger small w-100 text-start" aria-live="polite">
                        Password must be at least 8 characters and contain both a letter and a number.
                    </div>
                )}
                <TextInput
                    id="confirm-password"
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                />
                {password !== confirmPassword && confirmPassword.length > 0 && (
                    <div className="text-danger small w-100 text-start" aria-live="polite">
                        Passwords do not match
                    </div>
                )}
                {formError && (
                    <div className="text-danger small w-100 text-center mb-2" aria-live="polite">
                        {formError}
                    </div>
                )}
                <div className="d-flex w-100 gap-2 mt-2">
                    <button
                        className="btn btn-primary flex-grow-1"
                        type="submit"
                        disabled={
                            password !== confirmPassword ||
                            !isValidEmail(email) ||
                            !isValidPassword(password)
                        }
                    >
                        Sign Up
                    </button>
                    <button
                        type="button"
                        className="btn btn-light px-2"
                        title="Clear"
                        onClick={handleClear}
                        style={{ fontSize: "1.2rem", lineHeight: 1 }}
                        aria-label="Clear all fields"
                    >
                        ×
                    </button>
                </div>
            </form>
        </div>
    );
}
