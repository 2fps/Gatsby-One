import React from "react";
import { Link } from "gatsby";

import Cover from './cover';
import './brief.scss';

const Brief = ({ frontmatter, wordCount, excerpt}) => {
  return (
        <article className="brief">
            { frontmatter.cover && <Cover {...frontmatter} />}
            <div className="post-info-wrapper">
                <h2 className="brief-title">
                    <Link to={ frontmatter.path }>
                        { frontmatter.title }
                    </Link>
                </h2>
                <div className="margin-bottom-half">
                    { excerpt }
                </div>
                <small>
                    <div className="text-description">Posted on { frontmatter.date }</div>
                </small>
            </div>
        </article>
    )
};

export default Brief;