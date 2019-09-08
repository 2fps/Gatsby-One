import React from 'react';
import { Link } from "gatsby";

import NavBrand from './navBrand';
import NavLinks from './navLinks';
import './header.scss';

const Header = function({ title }) {
    return (
        <nav className="nav">
            <div className="navbar">
                <div className="navbar-left">
                    <NavBrand title={ title } brand="" />
                </div>
                <div className="navbar-right">
                    <NavLinks />
                </div>
            </div>
        </nav>
    );
}

/* Header.PropTypes = {
    title: PropTypes.string
};

Header.defaultProps = {
    title: '',
};
 */
export default Header;
