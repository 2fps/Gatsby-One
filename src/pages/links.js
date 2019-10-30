import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import SEO from '../components/SEO/SEO';
import LinkCard from '../components/Card/LinkCard'

import '../../static/common.scss';
import config from '../../config/config';

import 'typeface-roboto';

const Links = ({ data }) => {
    let siteMetadata = data.site.siteMetadata;

    // 为该页面重写部分seo配置
    siteMetadata.description = '站点 www.zhuyuntao.cn 博客友情链接';
    siteMetadata.keywords = 'zhuyuntao,博客友情链接';

    return (
        <div>
            <Helmet>
                <title>{ siteMetadata.siteTitle } - 友情链接</title>
            </Helmet>
            <SEO site={ siteMetadata } />
            <Header />
            <div className="content-container">
                <div className="article-content">
                    <Paper className="blog-post">
                        <h1>友情链接</h1>
                        <div className="links-root">
                            <Grid container spacing={ 1 }>
                                <Grid container item xs={ 12 } spacing={ 3 }>
                                    {
                                        config.links.map((item, ind) => {
                                            return (
                                                <LinkCard
                                                    key={ ind }
                                                    { ...item }
                                                />
                                            )
                                        })
                                    }
                                </Grid>
                            </Grid>
                        </div>
                    </Paper>
                    <Paper className="links-chanage">
                        <Typography variant="h5" component="h3">
                            友链交换
                        </Typography>
                        <Typography component="p">
                            请现在贵站上增加本站链接，邮件发送贵站友链地址、站点名称、站点介绍(最好三十字以内)以及站点logo至邮箱<a href="mailto:echoweb@126.com">echoweb@126.com</a>.
                        </Typography>
                        <Typography component="p">
                            我会在24h内添加并邮件回复，谢谢!
                        </Typography>
                    </Paper>
                </div>
            </div>
            <Footer { ...siteMetadata } />
        </div>
    );
}

export default Links;

export const query = graphql`
query {
    site {
        siteMetadata {
            description
            siteTitle
            keywords
            imageUrl
            siteUrl
            author
            github
            menus{
                name
                path
            }
            bottomMenus {
                name
                path
            }
        }
    }
}
`;
