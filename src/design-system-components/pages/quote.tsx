
interface Props {
    className?: string;
}

export const Quote = ({ className }: Props) => {

    return (
        <div className={className} id="quote-page">
            Instant Quote
        </div>
    );
}