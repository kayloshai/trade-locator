
interface Props {
    className?: string;
}

export const About = ({ className }: Props) => {

    return (
        <div className={className} id="about-page">
            <h2>About Us</h2>
            {/* <h5>Photo of me:</h5> */}
            {/* <div className="fakeimg">Fake Image</div> */}
            <p>We provide world class services at the tip of your fingers in the comfort of your home.</p>

        </div>
    );
}