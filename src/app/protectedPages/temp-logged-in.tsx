import { useAuth } from "../auth/proctectedRoute";

export const LoggedInLanding = () => {
    const { user } = useAuth();

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
            <div className="bg-light p-5 rounded shadow text-center" style={{ maxWidth: 400, width: "100%" }}>
                <h2 className="mb-3">Welcome!</h2>
                {user?.email && (
                    <p className="mb-4">You are logged in as <strong>{user.email}</strong>.</p>
                )}
                <p className="mb-4">You have successfully logged in to Trade Locator.</p>
            </div>
        </div>
    );
};