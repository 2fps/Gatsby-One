import React from 'react';
import { Link } from 'gatsby';
import Paper from '@material-ui/core/Paper';

import EventNote from '@material-ui/icons/EventNote';
import FolderOpen from '@material-ui/icons/FolderOpen';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Cover from './cover';

import '../../../static/common.scss';
import './brief.scss';

const Brief = ({ frontmatter, wordCount, excerpt, timeToRead }) => {
    return (
        <Paper className="brief">
            { frontmatter.cover && <Cover { ...frontmatter } />}
            <div className="post-info-wrapper">
                <h2 className="brief-title">
                    <Link to={ frontmatter.path }>
                        { frontmatter.title }
                    </Link>
                </h2>
                <small>
                    <div className="text-description">
                        <EventNote className="info-icons color-757575" fontSize="small" />
                        <span className="info-words">
                            { frontmatter.date }
                        </span>
                        <FolderOpen className="info-icons color-757575" fontSize="small" />
                        <span className="info-words">
                            { frontmatter.categories.join('、') }
                        </span>
                        <BookmarkBorderIcon className="info-icons color-757575" fontSize="small" />
                        <span className="info-words">
                            { frontmatter.tags.join('、') }
                        </span>
                    </div>
                </small>
                <div className="margin-bottom-half">
                    { excerpt }
                </div>
            </div>
        </Paper>
    )
};

export default Brief;
