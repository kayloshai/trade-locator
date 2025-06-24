
interface Props {
    className?: string;
}

export const Login = ({ className }: Props) => {

    return (
        <div className={className} id="login-page">
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" />
                <input type="text" className="form-control" placeholder="Password" aria-label="Password" />
                <button className="btn btn-outline-secondary" type="button">Sign-In</button>
            </div>
        </div>
    );
}