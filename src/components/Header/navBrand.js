import React from "react";
import { Link } from "gatsby";

const NavBrand = ({ brand, title, siteUrl }) => (
    <div className="brand">
        <Link to='/about'>
            {/* <img className="image margin-right-half border-radius" src={brand} alt="Brand Image" /> */}
            <span className="site-title"><strong>{title}</strong></span>
        </Link>
    </div>
)

export default NavBrand;