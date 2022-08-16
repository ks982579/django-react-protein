import React from "react";

// Import Sassy CSS
import sassy from './Navbar.module.scss';

const Navbar = (props) => {
    return (
        <nav className={sassy["navbar-container"]}>
            <div className={sassy["company-name"]}>
                <div onClick={props.onNeitherClick}>Company Name</div>
            </div>
            <div className={sassy['links']}>
                <div onClick={props.onUploadClick}>
                    Upload File
                </div>
                <div onClick={props.onViewClick}>
                    View Data
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
// X --> <App/>