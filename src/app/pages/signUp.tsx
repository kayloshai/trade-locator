import { useState, useRef } from "react";
import { TextInput } from "../../design-system/inputs/TextInput";

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
    const usernameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle sign up logic here
        console.log("Sign Up:", { username, email, password });
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

    const passwordsMatch = password === confirmPassword && password.length > 0;
    const emailValid = isValidEmail(email);
    const passwordValid = isValidPassword(password);

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
                {emailTouched && !emailValid && (
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
                {passwordTouched && !passwordValid && (
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
                {!passwordsMatch && confirmPassword.length > 0 && (
                    <div className="text-danger small w-100 text-start" aria-live="polite">
                        Passwords do not match
                    </div>
                )}
                <div className="d-flex w-100 gap-2 mt-2">
                    <button
                        className="btn btn-primary flex-grow-1"
                        type="submit"
                        disabled={!passwordsMatch || !emailValid || !passwordValid}
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