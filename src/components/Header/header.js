import React from 'react';

import NavBrand from './navBrand';
import NavLinks from './navLinks';
import config from '../../../config/config';

import './header.scss';

const Header = function() {
    let {
        siteTitle,
        siteUrl,
        menus
    } = config;

    return (
        <nav className="nav">
            <div className="navbar">
                <div className="navbar-left">
                    <NavBrand siteTitle={ siteTitle } siteUrl={ siteUrl } brand="" />
                </div>
                <div className="navbar-right">
                    <NavLinks menus={ menus } />
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
