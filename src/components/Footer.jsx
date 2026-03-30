import React from 'react';
import { Link } from 'react-router-dom';
import { RiMapPin2Fill, RiMailFill, RiFacebookCircleFill, RiInstagramFill, RiTwitterFill, RiWhatsappFill } from 'react-icons/ri';

const Footer = () => {
    return (
        <footer className="footer" style={{ marginTop: 'auto' }}>
            <div className="section__container footer__container">
                <div className="footer__logo">
                    <Link to="/">
                        <img src="/src/assets/light logo.png" alt="Spice Ritual" style={{ maxWidth: '150px' }} />
                    </Link>
                </div>
                <div className="footer__content">
                    <p>
                        Spice Ritual is dedicated to serving authentic flavors crafted with passion and tradition. From classic favorites to modern creations, we bring you a memorable dining experience filled with rich taste, quality ingredients, and warm hospitality.
                    </p>
                    <div>
                        <ul className="footer__links">
                            <li>
                                <span><RiMapPin2Fill /></span> National Highway, Tanguturu, 523274
                            </li>
                            <li>
                                <span><RiMailFill /></span> spiceritual@gmail.com
                            </li>
                        </ul>
                        <div className="footer__socials">
                            <a href="#"><RiFacebookCircleFill /></a>
                            <a href="#"><RiInstagramFill /></a>
                            <a href="#"><RiTwitterFill /></a>
                            <a href="#"><RiWhatsappFill /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__bar">
                Copyright © {new Date().getFullYear()} Spice Ritual. Built with React. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
