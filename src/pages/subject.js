import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import SEO from '../components/SEO/SEO';
import SubjectCard from '../components/Card/SubjectCard'
import Snackbar from '@material-ui/core/Snackbar';

import config from '../../config/config'

const colors = ['#7e57c2', '#303f9f', '#009688', '#00bcd4', '#c62828', '#ec407a', '#4a148c', '#9e9d24', '#fbc02d', '#ff9100'];

export default class Subject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleClick = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    render() {
        let siteMetadata = this.props.data.site.siteMetadata;

        return (
            <div>
                <Helmet>
                    <title>{ siteMetadata.siteTitle } - 技术专题</title>
                </Helmet>
                <SEO site={ siteMetadata } />
                <Header />
                <div className="content-container">
                    <div className="article-content">
                        <Paper className="blog-post">
                            <h1>技术专题</h1>
                            <div className="links-root">
                                <Grid container spacing={ 10 }>
                                    {
                                        config.subjectContent.map((item, ind) => {
                                            return (
                                                <SubjectCard
                                                    handleClick={ this.handleClick }
                                                    colors={ colors[Math.floor(Math.random() * colors.length)] }
                                                    key={ ind }
                                                    { ...item }
                                                />
                                            )
                                        })
                                    }
                                </Grid>
                            </div>
                        </Paper>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            key={ `top,center` }
                            autoHideDuration={ 2500 }
                            open={ this.state.open }
                            onClose={ this.handleClose }
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={ <span id="message-id">已复制到剪贴板。</span> }
                        />
                    </div>
                </div>
                <Footer { ...siteMetadata } />
            </div>
        )
    }
}

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
