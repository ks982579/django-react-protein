import React from "react";

// Import Sassy CSS
import sassy from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={sassy["footer-container"]}>
            <div>
                Footer: Copyright and other links
            </div>
        </footer>
    );
};

export default Footer;
// X --> <App/>