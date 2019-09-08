import React from "react";
import { Link } from "gatsby";
import Helmet from "react-helmet";

import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";
import Brief from "../components/Brief/brief";
import SEO from '../components/SEO/SEO';
import LoadMoreArticle from "../components/Brief/loadMoreArticle";
import { getExtraList } from '../utils/assist';

import '../../static/common.scss';

export default class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 10
        };
    }

    loadArticle = () => {
        this.setState({
            index: this.state.index + 10
        });
    }

    render() {
        const siteMetadata = this.props.data.site.siteMetadata,
            { edges } = this.props.data.allFile;

        let showData = edges.slice(0, this.state.index);
        // console.log(getExtraList(edges));
        return (
            <div>
                <Helmet>
                    <title>{ siteMetadata.title }</title>
                </Helmet>
                <SEO site={ siteMetadata } />
                <Header {...siteMetadata} />
                <div className="content-container">
                    <div className="article-content">
                        {
                            showData.map((edge, key) => {
                                const childMarkdownRemark = edge.node.childMarkdownRemark;

                                return (
                                    <Brief {...childMarkdownRemark} key={key} />
                                );
                            })
                        }
                        { this.state.index < edges.length && <LoadMoreArticle triggerHandle={ this.loadArticle } />}
                    </div>
                </div>
                <Footer {...siteMetadata} />
            </div>
        );
    }
}
export const query = graphql`
query {
    site {
        siteMetadata {
            description
            title
            keywords
            imageUrl
            siteUrl
        }
    }
    allFile(filter: {sourceInstanceName: {eq: "blog"}}, limit: 1000, sort: {order: DESC, fields: childMarkdownRemark___frontmatter___date}) {
        edges {
            node {
                name
                mode
                accessTime
                size
                modifiedTime
                childMarkdownRemark {
                    frontmatter {
                        path
                        date(formatString: "YYYY-MM-DD HH:mm:ss")
                        title
                        cover
                        categories
                        tags
                    }
                    wordCount {
                        words
                    }
                    excerpt(pruneLength: 110, format: PLAIN, truncate: true)
                }
            }
        }
    }
}
`;