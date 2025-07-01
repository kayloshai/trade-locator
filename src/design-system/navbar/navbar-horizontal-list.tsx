import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../app/auth/proctectedRoute";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

interface Props { }

export const Navbar = ({ }: Props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    // Helper to close menu on mobile
    const handleNavLinkClick = () => {
        if (window.innerWidth < 992) { // Bootstrap lg breakpoint
            setMenuOpen(false);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    const isVerified = user && user.emailVerified;

    if (loading) {
        // Optionally, show a spinner or nothing while auth is loading
        return null;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">MSP</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="main-navbar"
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                    onClick={() => setMenuOpen(open => !open)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse${menuOpen ? " show" : ""}`} id="main-navbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isVerified && user ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/services" className="nav-link" onClick={handleNavLinkClick}>Services</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/carpentry" className="nav-link" onClick={handleNavLinkClick}>Carpentry</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/electrical" className="nav-link" onClick={handleNavLinkClick}>Electrical</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/engineering" className="nav-link" onClick={handleNavLinkClick}>Engineering</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/garden" className="nav-link" onClick={handleNavLinkClick}>Garden</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/masonry" className="nav-link" onClick={handleNavLinkClick}>Masonry</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/plumbing" className="nav-link" onClick={handleNavLinkClick}>Plumbing</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link to="/specials" className="nav-link" onClick={handleNavLinkClick}>Specials</Link></li>
                                <li className="nav-item"><Link to="/pricing" className="nav-link" onClick={handleNavLinkClick}>Pricing</Link></li>
                                <li className="nav-item"><Link to="/faqs" className="nav-link" onClick={handleNavLinkClick}>FAQs</Link></li>
                                <li className="nav-item"><Link to="/about" className="nav-link" onClick={handleNavLinkClick}>About</Link></li>
                                <li className="nav-item"><Link to="/quote" className="nav-link" onClick={handleNavLinkClick}>Instant Quote</Link></li>
                            </>
                        )}
                    </ul>
                    <div className="d-flex">
                        {!isVerified ? (
                            <>
                                <Link to="/login" className="btn btn-outline-light me-2" onClick={handleNavLinkClick}>Login</Link>
                                <Link to="/sign-up" className="btn btn-warning" onClick={handleNavLinkClick}>Sign-Up</Link>
                            </>
                        ) : (
                            <>
                                <span className="navbar-text text-light me-2 d-flex align-items-center">
                                    {user.displayName || user.email}
                                    <Link to="/account-settings" className="ms-2 text-light" title="Account Settings" style={{ fontSize: "1.2rem" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                                        </svg>
                                    </Link>
                                </span>
                                <button className="btn btn-outline-light" onClick={handleLogout}>Log out</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}