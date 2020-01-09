import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import './PostMenu.scss';

const useStyles = makeStyles({
    menuBox: {
        padding: '0 20px 20px 10px',
        position: 'sticky',
        top: '20px',
    },
    menuTitle: {
        fontWeight: 'bold',
        fontSize: '18px',
    }
});

const PostMenu = ({
    tableOfContents
}) => {
    const classes = useStyles();

    return (
        <div className={ classes.menuBox }>
            <Paper className="blog-post">
                <p className={ classes.menuTitle }>目录</p>
                <div
                    className="article-menu"
                    dangerouslySetInnerHTML={{ __html: tableOfContents }}
                />
            </Paper>
        </div>
    );
}

export default PostMenu;
