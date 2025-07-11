import { Navbar } from "../navbar/navbar-horizontal-list";

interface Props {
    title: string;
    slogan?: string;
}

export const Header = ({ title, slogan }: Props) => {

    return (
        <>
            <div className="p-3 bg-primary text-white text-center">
                <h1>{title}</h1>
                <p>{slogan ? slogan : "Slogan goes here"}</p>
            </div>
            <Navbar />
        </>
    );
}