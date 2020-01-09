import React from 'react';

import Pendant from '../Pendant/pendant';
import config from '../../../config/config';

import './footer.scss';

class Footer extends React.Component {
    componentDidMount() {
        this.baiduPush();
    }

    // 增加百度搜索资源的自动提及方式
    baiduPush() {
        let bp = document.createElement('script');
        let curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        } else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        let s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(bp, s);
    }
    render() {
        // 悬浮目录内容
        let tableOfContents = this.props.tableOfContents,
            bottomMenus = this.props.bottomMenus;           // 底部菜单

        let {
            siteUrl,
            siteTitle,
            author,
            github,
        } = config;

        return (
            <footer className="footer">
                <Pendant tableOfContents={ tableOfContents } />
                <div className="container">
                    <div className="social-links-container">
                    </div>
                    <div className="bottom-menus">
                        {
                            bottomMenus.map((menu, ind) => {
                                return (
                                    <a className="menu-list" href={ menu.path } key={ ind }>{ menu.name }</a>
                                );
                            })
                        }
                    </div>
                    <div className="copyright-container">
                        <p>
                            © 2016 - { (new Date()).getFullYear() } <a href={ siteUrl } target="_blank" rel="noopener noreferrer">{ siteTitle }</a>. Copyright © <a href={ github } target="_blank" rel="noopener noreferrer">{ author }</a>.
                        </p>
                        <p>
                            Powered by <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">GatsbyJS</a>. Themed by <a href="https://github.com/2fps/Gatsby-One" target="_blank" rel="noopener noreferrer">Gatsby-One</a>.
                        </p>
                        <p>
                            Built by <a href="http://jenkins.zhuyuntao.cn/" target="_blank" rel="noopener noreferrer">Jenkins</a>.
                        </p>
                        <p>
                            <a href="http://www.beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">苏ICP备15040567号-1</a>
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
