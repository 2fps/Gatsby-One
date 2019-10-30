import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Paper from '@material-ui/core/Paper';

import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import SEO from '../components/SEO/SEO';
import { combineWithDate } from '../utils/utils';

import '../../static/common.scss';

import 'typeface-roboto';

const ArchivesPage = ({
    data: {
        allMarkdownRemark: { group },
        site: {
            siteMetadata,
        },
    },
}) => {

    // 为该页面重写部分seo配置
    siteMetadata.description = '站点 www.zhuyuntao.cn 博客内容归档';
    siteMetadata.keywords = 'zhuyuntao,博客归档';

    const detail = combineWithDate(group).reverse();

    return (
        <>
            <Helmet>
                <title>{ siteMetadata.siteTitle } - 归档</title>
            </Helmet>
            <SEO site={ siteMetadata } />
            <Header { ...siteMetadata } />
            <div className="content-container">
                <div className="article-content">
                    <Paper className="blog-post">
                        <h1>归档</h1>
                        <p>共 { group.length } 篇文章</p>
                        {detail.map((archive, ind) => {

                            return (
                                <div key={ ind }>
                                    <h3 className="archives-date">{ archive.date }</h3>
                                    {
                                        archive.articles.reverse().map((art, index) => {
                                            return (<p key={ index }>
                                                <a href={ art.path } className="article-item">
                                                    { art.title }
                                                </a>
                                            </p>)
                                        })
                                    }
                                </div>
                            );
                        })}
                    </Paper>
                </div>
            </div>
            <Footer { ...siteMetadata } />
        </>
    )
}

export default ArchivesPage;

export const pageQuery = graphql`
query {
    site {
        siteMetadata {
            description
            siteTitle
            imageUrl
            keywords
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
    allMarkdownRemark(limit: 2000, filter: {frontmatter: {draft: {in: [false, null] }}, fileAbsolutePath: {regex: "/(blog/\\\\d{4})||(subject)/"}}) {
        group(field: frontmatter___date) {
            fieldValue
            nodes {
                frontmatter {
                    title
                    path
                    date(formatString: "YYYY年MM月")
                }
            }
        }
    }
}
`
