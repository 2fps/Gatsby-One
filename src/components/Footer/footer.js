import React from 'react';

import Pendant from '../Pendant/pendant';

import './Footer.scss';

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <Pendant />
                <div className="container">
                    <div className="social-links-container">
                        {/* <a>11</a> */}
                    </div>
                    <div className="copyright-container">
                        <p>
                            © { (new Date()).getFullYear() } <a href="https://github.com/2fps" target="_blank">{ this.props.title }. </a>ALL RIGHTS RESERVED.
                        </p>
                        <p>
                            Powered by <a href="https://www.gatsbyjs.org/" target="_blank">GatsbyJS</a>. Themed by <a href="https://github.com/2fps/Gatsby-One" target="_blank">Gatsby-One</a>.
                        </p>
                        <p>
                            苏ICP备15040567号-1
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
}


export default Footer;