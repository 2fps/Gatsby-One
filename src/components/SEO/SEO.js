import React from "react";
import Helmet from "react-helmet";

class SEO extends React.Component {

    render() {
        let {
            description,
            imageUrl,
            siteUrl,
            keywords,
            title
        } = this.props.site;
        // description 
        return (
            <Helmet>
                {/* General tags */}
                <meta name="description" content={ description } />
                { keywords && <meta name="keywords" content={ keywords } /> }
                <link rel="icon" type="image/x-icon" class="js-site-favicon" href="http://image.zhuyuntao.cn/image/icon/favicon.ico" />
            </Helmet>
        );
    }

}

export default SEO;