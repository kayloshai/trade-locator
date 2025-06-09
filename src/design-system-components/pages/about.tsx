// src/src/design-system-components/pages/home.tsx

interface Props {
    className?: string;
}

export const About = ({ className }: Props) => {

    return (
        <div className={className} id="about-page">
            About
        </div>
    );
}