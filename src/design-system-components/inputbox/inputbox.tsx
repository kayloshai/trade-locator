import { useState } from "react";

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

export const Inputbox = ({
    className,
    placeholder1 = "Username",
    placeholder2 = "Password",
    type1 = "text",
    type2 = "text",
    button1Label = "Login",
    button2Label = "Cancel",
    onSubmit
}: Props) => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) onSubmit(value1, value2);
    };

    return (
        <div className={`inputbox-container d-flex justify-content-center align-items-center`} style={{ minHeight: "300px" }}>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center gap-3 bg-light p-4 rounded shadow" style={{ minWidth: 300 }}>
                <input
                    className="form-control"
                    type={type1}
                    placeholder={placeholder1}
                    value={value1}
                    onChange={e => setValue1(e.target.value)}
                />
                <input
                    className="form-control"
                    type={type2}
                    placeholder={placeholder2}
                    value={value2}
                    onChange={e => setValue2(e.target.value)}
                />
                <div className="d-flex gap-2 w-100 justify-content-center">
                    <button className="btn btn-primary" type="submit">{button1Label}</button>
                    <button className="btn btn-warning" type="button">{button2Label}</button>
                </div>
            </form>
        </div>
    );
}