import React from 'react';
import Typography from '@material-ui/core/Typography';

const NavBrand = ({ siteTitle, siteUrl }) => {

    return (
        <div className="brand">
            <Typography className="site-title">
                <a href={ siteUrl }>
                    { siteTitle }
                </a>
            </Typography>
        </div>
    );
}

export default NavBrand;
