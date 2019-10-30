import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import Grid from '@material-ui/core/Grid';

import Header from 'components/Header/header';
import Footer from 'components/Footer/footer';
import Brief from 'components/Brief/brief';
import SEO from 'components/SEO/SEO';
import Pagination from 'components/Pagination/pagination';

import '../../static/common.scss';

import 'typeface-roboto';

// 主题颜色
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#00ff00',
            main: blue[500],
            dark: blue[800],
            contrastText: '#fff',
        },
    },
});

export default class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 10,
            search: null,
            searchQuery: '',
            searchResults: [],
            isLoading: true,
        };
    }

    loadArticle = () => {
        this.setState({
            index: this.state.index + 10
        });
    }

    calcPagination = (all, limit = 10) => {
        let len = all.length;

        return {
            currentPage: 1,
            limit,
            numPages: Math.ceil(len / limit),
            skip: 0,
        }
    }

    render() {
        const siteMetadata = this.props.data.site.siteMetadata,
            { edges } = this.props.data.allMarkdownRemark;

        let showData = edges.slice(0, this.state.index),
            pagination = this.props.pageContext;

        if (!pagination.limit) {
            // / 首页会有bug，兼容处理下
            pagination = this.calcPagination(edges);
        }

        return (
            <ThemeProvider theme={ theme }>
                <Helmet>
                    <title>{ siteMetadata.siteTitle }</title>
                </Helmet>
                <SEO site={ siteMetadata } />
                <Header />
                <Grid className="content-container" container item xs={ 12 }>
                    <Grid className="article-content" item xs={ 12 }>
                        {
                            showData.map((edge, key) => {
                                const node = edge.node;

                                return (
                                    <Brief { ...node } key={ key } />
                                );
                            })
                        }
                    </Grid>
                    {/* <Grid item xs={0}>
                        <SideBar />
                    </Grid> */}
                    <Grid item xs={ 12 }>
                        <Pagination { ...pagination } />
                    </Grid>
                </Grid>
                <Footer { ...siteMetadata } />
            </ThemeProvider>
        );
    }
}
export const query = graphql`
query($skip: Int, $limit: Int) {
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
    allMarkdownRemark(filter: {frontmatter: {draft: {in: [false, null] }}, fileAbsolutePath: {regex: "/(blog)||(subject)/"}}, sort: {fields: frontmatter___date, order: DESC}
    limit: $limit
    skip: $skip
    ) {
        edges {
            node {
                id
                fields {
                    slug
                }
                frontmatter {
                    categories
                    date(formatString: "YYYY年MM月DD日 HH:mm")
                    path
                    tags
                    title
                }
                wordCount {
                    words
                }
                timeToRead
                excerpt(pruneLength: 110, format: PLAIN, truncate: true)
            }
        }
    }
}
`;
