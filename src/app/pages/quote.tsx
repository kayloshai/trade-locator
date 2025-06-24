import React, { useRef, useState } from "react";

interface Props {
    className?: string;
}

export const Quote = ({ className }: Props) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/gif', 'image/webp'];
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!allowedTypes.includes(file.type)) {
                alert("Only PDF and image files are allowed.");
                e.target.value = ""; // Clear the input
                setFileName(null);
                return;
            }
            if (file.size > MAX_SIZE) {
                alert("File is too large. Maximum size is 5MB.");
                e.target.value = "";
                setFileName(null);
                return;
            }
            setFileName(file.name);
        } else {
            setFileName(null);
        }
    };

    return (
        <div className={`container py-5 ${className || ""}`} id="quote-page">
            <h1 className="mb-4 text-center">Get an Instant Quote</h1>
            <p className="lead text-center mb-5">
                Fill out the form below and we’ll get back to you with a personalized quote as soon as possible.
            </p>
            {/* Placeholder form - replace with real form when ready */}
            <form className="mx-auto" style={{ maxWidth: 400 }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your name" disabled />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" disabled />
                </div>
                <div className="mb-3">
                    <label htmlFor="details" className="form-label">Project Details</label>
                    <textarea className="form-control" id="details" rows={3} placeholder="Describe your project" disabled />
                </div>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">Attach PDF or Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="file"
                        ref={fileInputRef}
                        accept=".pdf,image/*"
                        onChange={handleFileChange}

                    />
                    {fileName && (
                        <div className="form-text">
                            Selected file: {fileName}
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled>
                    Submit (Coming Soon)
                </button>
            </form>
        </div>
    );
}