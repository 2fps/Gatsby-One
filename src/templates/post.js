import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';
import kebabCase from 'lodash/kebabCase';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

import EventNote from '@material-ui/icons/EventNote';
import FolderOpen from '@material-ui/icons/FolderOpen';
import LocalOffer from '@material-ui/icons/LocalOffer';

import Header from 'components/Header/header';
import Footer from 'components/Footer/footer';
import SEO from 'components/SEO/SEO';
import PostMenu from 'components/PostMenu/PostMenu';
import config from '../../config/config';

// import '../../static/scss/github-markdown.scss';
// import '../../static/test.scss';
import '../../static/common.scss';
import '../../static/scss/markdown.scss';

import 'typeface-roboto';

export default function Template({ data }) {
    const { markdownRemark } = data,
        { frontmatter, html, tableOfContents, fields } = markdownRemark,
        siteMetadata = data.site.siteMetadata;

    frontmatter.siteUrl = siteMetadata.siteUrl;

    let title = frontmatter.title,
        slug = fields.slug;

    const disqusConfig = {
        shortname: config.disqus.shortname,
        config: { identifier: slug, title },
    }

    return (
        <>
            <Helmet>
                <title>{ siteMetadata.siteTitle } - { frontmatter.title }</title>
            </Helmet>
            <SEO site={ frontmatter } />
            <Header { ...siteMetadata } />
            <Grid className="content-container" container item xs={ 12 }>
                <Grid className="article-content" item md={ 9 } xs={ 12 }>
                    <Paper className="blog-post">
                        <h1>{frontmatter.title}</h1>
                        <div className="blog-info">
                            <div className="info-content">
                                <EventNote className="info-icons" fontSize="small" />
                                <span className="info-words">
                                    { frontmatter.date }
                                </span>
                                <FolderOpen className="info-icons" fontSize="small" />
                                {
                                    frontmatter.categories.map((item, ind) => {
                                        return (
                                            <React.Fragment key={ ind }>
                                                <a className="info-words" href={ `/categories/${ kebabCase(item) }/` }>
                                                    { item }
                                                </a>
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div
                            className="blog-post-content markdown-body"
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                        <div className="blog-tags">
                            {
                                (frontmatter.tags || []).length > 0 && <LocalOffer fontSize="small" />
                            }
                            {
                                (frontmatter.tags || []).map((item, ind) => {
                                    return <Chip variant="outlined" component="a" label={ item } className="blog-chip" key={ ind } href={ `/tags/${ kebabCase(item) }/` } />
                                })
                            }
                        </div>
                    </Paper>
                </Grid>
                <Grid item md={ 3 } xs={ 12 }>
                    <PostMenu tableOfContents={ tableOfContents }></PostMenu>
                </Grid>
                <Grid className="article-content" item xs={ 12 }>
                    <DiscussionEmbed { ...disqusConfig } />
                </Grid>
            </Grid>
            <Footer { ...siteMetadata } />
        </>
    )
}

export const pageQuery = graphql`
query($path: String!) {
    site {
        siteMetadata {
            description
            siteTitle
            imageUrl
            keywords
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
    markdownRemark(frontmatter: { path: { eq: $path } }) {
        html
        frontmatter {
            date(formatString: "YYYY年MM月DD日")
            path
            title
            categories
            tags
            description
            keywords
        }
        fields {
            slug
        }
        tableOfContents(pathToSlugField: "frontmatter.path", maxDepth: 3)
    }
}
`
