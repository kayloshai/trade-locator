

// src/src/design-system-components/pages/home.tsx

interface Props {
    title?: string;
    titleDesc?: string;
    img?: React.ReactNode;
    textTitle?: string;
    textDesc?: string;
}

export const Card = ({ title, titleDesc, img, textTitle, textDesc }: Props) => {

    return (
        <>
            <h2 className="mt-5">{title ? title : "TITLE HEADING"}</h2>
            <h5>{titleDesc ? titleDesc : "Title description, Sep 2, 2020"}</h5>
            <div className="fakeimg">{img ? img : "Fake Image"}</div>
            <p>{textTitle ? textTitle : "Some text.."}</p>
            <p>{textDesc ? textDesc : "Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."}</p>

        </>
    );
}