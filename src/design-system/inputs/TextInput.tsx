import React from "react";

interface TextInputProps {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    autoComplete?: string;
    disabled?: boolean;
}

export const TextInput = ({
    id,
    label,
    type,
    placeholder,
    value,
    onChange,
    autoComplete,
    disabled
}: TextInputProps) => (
    <div className="w-100">
        <label htmlFor={id} className="form-label">{label}</label>
        <input
            id={id}
            className="form-control"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete={autoComplete}
            disabled={disabled}
        />
    </div>
);