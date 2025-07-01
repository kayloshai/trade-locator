import { useState, useEffect } from "react";
import { useAuth } from "../auth/proctectedRoute";
import { db } from "../../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { TextInput } from "../../design-system/inputs/TextInput";

export const AccountSettings = () => {
    const { user } = useAuth();
    const [displayName, setDisplayName] = useState("");
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        setDisplayName(userDoc.data().displayName || "");
                    }
                } catch (err) {
                    setError("Failed to load user data.");
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        if (!user) return;
        try {
            await updateDoc(doc(db, "users", user.uid), { displayName });
            setSuccess("Profile updated!");
        } catch (err) {
            setError("Failed to update profile.");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container py-5" style={{ maxWidth: 500 }}>
            <h2 className="mb-4">Account Settings</h2>
            <form onSubmit={handleSubmit}>
                <TextInput
                    id="displayName"
                    label="Display Name"
                    type="text"
                    placeholder="Enter your display name"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                />
                <button className="btn btn-primary mt-3" type="submit">Save Changes</button>
                {success && <div className="alert alert-success mt-3">{success}</div>}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
        </div>
    );
};