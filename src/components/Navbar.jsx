import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { RiMenuLine, RiCloseLine, RiShoppingCartLine, RiUserLine } from 'react-icons/ri';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'MENU', path: '/menu' },
        { name: 'CART', path: '/cart', isCart: true },
        { name: user ? 'PROFILE' : 'LOGIN', path: '/profile', isUser: true }
    ];

    return (
        <header className="header">
            <nav className="nav">
                <div className="nav__header">
                    <div className="nav__logo">
                        <Link to="/">
                            <img src="/src/assets/light logo.png" alt="Spice Ritual Logo" className="logo-img" />
                        </Link>
                    </div>
                    <div className="nav__menu__btn" onClick={toggleMenu}>
                        {isOpen ? <RiCloseLine size={28} color="#fff" /> : <RiMenuLine size={28} color="#fff" />}
                    </div>
                </div>
                <ul className={`nav__links ${isOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.name} onClick={() => setIsOpen(false)}>
                            <Link
                                to={link.path}
                                className={`nav-link-item ${location.pathname === link.path ? 'active-link' : ''}`}
                            >
                                {link.isCart && <RiShoppingCartLine size={20} />}
                                {link.isUser && <RiUserLine size={20} />}
                                {!link.isCart && !link.isUser && <span className="link-text">{link.name}</span>}
                                {link.isUser && <span className="link-text">{link.name}</span>}

                                {link.isCart && cartCount > 0 && (
                                    <span className="cart-badge">{cartCount}</span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
