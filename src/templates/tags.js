import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Paper from '@material-ui/core/Paper';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

import Header from 'components/Header/header';
import Footer from 'components/Footer/footer';
import SEO from 'components/SEO/SEO';

import '../../static/common.scss';

import 'typeface-roboto';

const Tags = ({ pageContext, data }) => {
    const { tag } = pageContext;
    const { edges, totalCount } = data.allMarkdownRemark;
    const { siteMetadata } = data.site;

    const tagHeader = `标签"${ tag }"查询到有${ totalCount }个`;

    // 为该页面重写部分seo配置
    siteMetadata.description = `www.zhuyuntao.cn站点搜索标签为${ tag }，共搜索到${ totalCount }个。`;
    siteMetadata.keywords = `zhuyuntao,标签,${ tag }`;

    return (
        <>
            <Helmet>
                <title>{ siteMetadata.siteTitle } - 标签:{tag}</title>
            </Helmet>
            <SEO site={ siteMetadata } />
            <Header { ...siteMetadata } />
            <div className="content-container">
                <div className="article-content">
                    <Paper className="blog-post">
                        <h1>{ tagHeader }</h1>
                        {edges.map(({ node }) => {
                            const { slug } = node.fields;
                            const { title, path, date } = node.frontmatter;

                            return (
                                <li key={ slug }>
                                    <a href={ path } className="link">{title} ({date})</a>
                                </li>
                            )
                        })}
                        <div className="back-all-tags">
                            <a href="/tags/" className="link">
                                <KeyboardReturnIcon />
                                返回
                            </a>
                        </div>
                    </Paper>
                </div>
            </div>
            <Footer { ...siteMetadata } />
        </>
    )
}

export default Tags;

export const pageQuery = graphql`
query($tag: String) {
    site {
        siteMetadata {
            description
            siteTitle
            keywords
            imageUrl
            siteUrl
            author
            github
            menus {
                name
                path
            }
            bottomMenus {
                name
                path
            }
        }
    }
    allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { tags: { in: [$tag] }, draft: {in: [false, null] } } }
    ) {
        totalCount
        edges {
            node {
                fields {
                    slug
                }
                frontmatter {
                    title
                    path
                    date(formatString: "YYYY-MM-DD HH:mm:ss")
                }
            }
        }
    }
}
`
