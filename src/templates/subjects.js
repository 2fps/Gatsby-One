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

const Tags = ({ data, pageContext }) => {
    const { edges, totalCount } = data.allMarkdownRemark;
    const { siteMetadata } = data.site;
    const { title } = pageContext;

    return (
        <>
            <Helmet>
                <title>{ siteMetadata.siteTitle } - 专题: { title }</title>
            </Helmet>
            <SEO site={ siteMetadata } />
            <Header { ...siteMetadata } />
            <div className="content-container">
                <div className="article-content">
                    <Paper className="blog-post">
                        <h1>专题：{ title }</h1>
                        <p>共 { totalCount } 篇文章</p>
                        {
                            edges.map(({ node }, ind) => {
                                const { slug } = node.fields;
                                const { title, date, path } = node.frontmatter;

                                return (
                                    <li key={ slug }>
                                        <a href={ path } className="link">{title} ({date})</a>
                                    </li>
                                )
                            })
                        }
                        <div className="back-all-tags">
                            <a href="/subject/" className="link">
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
query($path: String) {
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
        filter: { fileAbsolutePath: {regex: $path},  frontmatter: { draft: {in: [false, null] } } }
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
