
interface Props {
    className?: string;
}

export const NotFound = ({ className }: Props) => {

    return (
        <div className={className} id="notFound-page">
            NotFound
        </div>
    );
}