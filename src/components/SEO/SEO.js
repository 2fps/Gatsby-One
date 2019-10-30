import React from 'react';
import Helmet from 'react-helmet';

class SEO extends React.Component {

    render() {
        let {
            description,
            siteUrl,
            path,
            keywords,
        } = this.props.site;

        return (
            <Helmet>
                <meta property="og:locale" content="zh_CN" />

                {/* General tags */}
                <meta name="robots" content="index,follow" />
                { description && <meta name="description" content={ description } /> }
                { keywords && <meta name="keywords" content={ keywords } /> }
                {/* <link rel="icon" type="image/x-icon" class="js-site-favicon" href="http://image.zhuyuntao.cn/image/icon/favicon.ico" /> */}

                <link rel="canonical" href={ path ? siteUrl + path : siteUrl }></link>
            </Helmet>
        );
    }

}

export default SEO;
