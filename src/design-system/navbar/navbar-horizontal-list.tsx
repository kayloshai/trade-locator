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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation" aria-label="Main navigation">
            <div className="container">
                <Link className="navbar-brand" to="/">MSP</Link>
                <button
                    className="navbar-toggler ms-auto"
                    type="button"
                    aria-controls="main-navbar"
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                    onClick={() => setMenuOpen(open => !open)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className={`collapse navbar-collapse${menuOpen ? " show" : ""} justify-content-end`}
                    id="main-navbar"
                >
                    <div
                        className="d-flex flex-column flex-lg-row align-items-end align-items-lg-center ms-auto"
                        style={{
                            background: menuOpen ? "rgba(33,37,41,0.98)" : undefined,
                            padding: menuOpen ? "1.5rem 1rem" : undefined,
                            borderRadius: menuOpen ? "0.5rem" : undefined,
                            boxShadow: menuOpen ? "0 0 16px rgba(0,0,0,0.15)" : undefined,
                            minWidth: menuOpen ? 220 : undefined,
                        }}
                    >
                        <ul className="navbar-nav mb-3 mb-lg-0 gap-2 gap-lg-0" role="menu">
                            <li className="nav-item" role="none">
                                <Link to="/specials" className="nav-link" role="menuitem" tabIndex={0} onClick={handleNavLinkClick}>Specials</Link>
                            </li>
                            <li className="nav-item" role="none">
                                <Link to="/pricing" className="nav-link" role="menuitem" tabIndex={0} onClick={handleNavLinkClick}>Pricing</Link>
                            </li>
                            <li className="nav-item" role="none">
                                <Link to="/faqs" className="nav-link" role="menuitem" tabIndex={0} onClick={handleNavLinkClick}>FAQs</Link>
                            </li>
                            <li className="nav-item" role="none">
                                <Link to="/about" className="nav-link" role="menuitem" tabIndex={0} onClick={handleNavLinkClick}>About</Link>
                            </li>
                            <li className="nav-item" role="none">
                                <Link to="/quote" className="nav-link" role="menuitem" tabIndex={0} onClick={handleNavLinkClick}>Instant Quote</Link>
                            </li>
                        </ul>
                        <div className="d-flex flex-column flex-lg-row gap-2 ms-lg-3">
                            <Link to="/login" className="btn btn-outline-light" onClick={handleNavLinkClick}>Login</Link>
                            <Link to="/sign-up" className="btn btn-warning" onClick={handleNavLinkClick}>Sign-Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}