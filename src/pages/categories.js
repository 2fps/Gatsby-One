import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import SEO from '../components/SEO/SEO';

import '../../static/common.scss';

import 'typeface-roboto';

const TagsPage = ({
    data: {
        allMarkdownRemark: { group },
        site: {
            siteMetadata,
        },
    },
}) => {

    // 为该页面重写部分seo配置
    siteMetadata.description = '站点 www.zhuyuntao.cn 博客类别';
    siteMetadata.keywords = 'zhuyuntao,博客类别';

    return (
        <>
            <Helmet>
                <title>{ siteMetadata.siteTitle } - 类别</title>
            </Helmet>
            <SEO site={ siteMetadata } />
            <Header { ...siteMetadata } />
            <div className="content-container">
                <div className="article-content">
                    <Paper className="blog-post">
                        <h1>类别</h1>
                        {group.map((category, ind) => (
                            <Button variant="outlined" className="tags-item" component="a" href={ `/categories/${ kebabCase(category.fieldValue) }/` } key={ ind }>
                                {category.fieldValue} ({category.totalCount})
                            </Button>
                        ))}
                    </Paper>
                </div>
            </div>
            <Footer { ...siteMetadata } />
        </>
    )
}

export default TagsPage;

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
            bottomMenus {
                name
                path
            }
            menus{
                name
                path
            }
        }
    }
    allMarkdownRemark(limit: 2000, filter: {fileAbsolutePath: {regex: "/blog/\\\\d{4}/"}}) {
        group(field: frontmatter___categories) {
            fieldValue
            totalCount
        }
    }
}
`
