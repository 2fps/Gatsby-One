import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

import '../../static/scss/github-markdown.scss';

import Header from '../components/Header/header';
import Footer from '../components/Footer/Footer';
import SEO from '../components/SEO/SEO';

export default function Template({ data }) {
    const { markdownRemark } = data,
        { frontmatter, html } = markdownRemark,
        siteMetadata = data.site.siteMetadata;
    
    return (
        <>
            <Helmet>
                <title>{ frontmatter.title }</title>
            </Helmet>
            <SEO site={ frontmatter } />
            <Header {...siteMetadata} />
            <div className="content-container">
                <div className="article-content">
                    <div className="blog-post markdown-body">
                        <h1>{frontmatter.title}</h1>
                        <h2>{frontmatter.date}</h2>
                        <div
                            className="blog-post-content"
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    </div>
                </div>
            </div>
            <Footer {...siteMetadata} />
        </>
    )
}

export const pageQuery = graphql`
  query($path: String!) {
    site {
        siteMetadata {
            description
            title
            imageUrl
            siteUrl
        }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
        html
        frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            categories
            tags
            description
            keywords
        }
    }
  }
`