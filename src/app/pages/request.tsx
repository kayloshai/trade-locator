import React, { useState } from "react";
import GoogleMapPicker from "../../design-system/googleMapPicker/googleMapPicker";

export const Request = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        details: "",
        lat: null as number | null,
        lng: null as number | null,
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLocationSelect = (lat: number, lng: number) => {
        setForm({ ...form, lat, lng });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would send the form data to your backend or email service
        setSubmitted(true);
    };

    return (
        <div className="container py-5" style={{ maxWidth: 700 }}>
            <h1 className="mb-4 text-center">Request Service Now</h1>
            <p className="mb-4 text-center">
                Fill in your details and drop a pin on your location. Our team will respond as soon as possible.
            </p>
            {submitted ? (
                <div className="alert alert-success text-center">
                    Thank you for your request! We will contact you soon.
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Street Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="details" className="form-label">Service Details</label>
                        <textarea
                            className="form-control"
                            id="details"
                            name="details"
                            rows={4}
                            value={form.details}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Pin Your Location</label>
                        <GoogleMapPicker onLocationSelect={handleLocationSelect} />
                        {form.lat && form.lng && (
                            <div className="form-text">
                                Selected Location: {form.lat.toFixed(5)}, {form.lng.toFixed(5)}
                            </div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit Request</button>
                </form>
            )}
        </div>
    );
};
