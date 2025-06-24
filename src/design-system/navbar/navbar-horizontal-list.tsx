import { Link } from "react-router-dom";
import { useState } from "react";

interface Props { }

export const Navbar = ({ }: Props) => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Helper to close menu on mobile
    const handleNavLinkClick = () => {
        if (window.innerWidth < 992) { // Bootstrap lg breakpoint
            setMenuOpen(false);
        }
    };

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
                        <li className="nav-item"><Link to="/specials" className="nav-link" onClick={handleNavLinkClick}>Specials</Link></li>
                        <li className="nav-item"><Link to="/pricing" className="nav-link" onClick={handleNavLinkClick}>Pricing</Link></li>
                        <li className="nav-item"><Link to="/faqs" className="nav-link" onClick={handleNavLinkClick}>FAQs</Link></li>
                        <li className="nav-item"><Link to="/about" className="nav-link" onClick={handleNavLinkClick}>About</Link></li>
                        <li className="nav-item"><Link to="/quote" className="nav-link" onClick={handleNavLinkClick}>Instant Quote</Link></li>
                    </ul>
                    <div className="d-flex">
                        <Link to="/login" className="btn btn-outline-light me-2" onClick={handleNavLinkClick}>Login</Link>
                        <Link to="/sign-up" className="btn btn-warning" onClick={handleNavLinkClick}>Sign-Up</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}