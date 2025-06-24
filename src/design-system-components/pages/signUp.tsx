import { useState, useRef } from "react";

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
                <div className="w-100">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        ref={usernameRef}
                        id="username"
                        className="form-control"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        autoComplete="username"
                    />
                </div>
                <div className="w-100">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        className={`form-control${emailTouched && !emailValid ? " is-invalid" : ""}`}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onBlur={() => setEmailTouched(true)}
                        aria-invalid={emailTouched && !emailValid}
                        aria-describedby={emailTouched && !emailValid ? "email-error" : undefined}
                        autoComplete="email"
                    />
                    {emailTouched && !emailValid && (
                        <div id="email-error" className="text-danger small w-100 text-start" aria-live="polite">
                            Please enter a valid email address.
                        </div>
                    )}
                </div>
                <div className="w-100">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            id="password"
                            className={`form-control${passwordTouched && !passwordValid ? " is-invalid" : ""}`}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onBlur={() => setPasswordTouched(true)}
                            aria-invalid={passwordTouched && !passwordValid}
                            aria-describedby={passwordTouched && !passwordValid ? "password-error" : undefined}
                            autoComplete="new-password"
                        />
                    </div>
                    {passwordTouched && !passwordValid && (
                        <div id="password-error" className="text-danger small w-100 text-start" aria-live="polite">
                            Password must be at least 8 characters and contain both a letter and a number.
                        </div>
                    )}
                </div>
                <div className="w-100">
                    <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                    <div className="input-group">
                        <input
                            id="confirm-password"
                            className="form-control"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            tabIndex={-1}
                            onClick={() => setShowPassword(s => !s)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                </div>
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