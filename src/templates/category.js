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

const Categories = ({ pageContext, data }) => {
    const { category } = pageContext;
    const { edges, totalCount } = data.allMarkdownRemark;
    const { siteMetadata } = data.site;

    const categoryHeader = `类别"${ category }"查询到有${ totalCount }个`;

    // 为该页面重写部分seo配置
    siteMetadata.description = `www.zhuyuntao.cn站点搜索类别为${ category }，共搜索到${ totalCount }个。`;
    siteMetadata.keywords = `zhuyuntao,类别,${ category }`;

    return (
        <>
            <Helmet>
                <title>{ siteMetadata.siteTitle } - 类别:{category}</title>
            </Helmet>
            <SEO site={ siteMetadata } />
            <Header { ...siteMetadata } />
            <div className="content-container">
                <div className="article-content">
                    <Paper className="blog-post">
                        <h1>{ categoryHeader }</h1>
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
                            <a href="/categories/" className="link">
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

export default Categories;

export const pageQuery = graphql`
query($category: String) {
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
        limit: 2000
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { categories: { in: [$category] } } }
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
