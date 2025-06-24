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
        <>  </>
    );
}