
interface Props {
    className?: string;
}

export const Home = ({ className }: Props) => {

    return (
        <div className={className} id="home-page">
            Home
        </div>
    );
}