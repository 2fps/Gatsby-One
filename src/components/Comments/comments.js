import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

function Comments() {
    const classes = useStyles();

    return (
        <>
            <Paper className={classes.root}>
                <Typography component="p">
                    评论功能暂未开放，有疑问请邮件至<a href="mailto:echoweb@126.com">echoweb@126.com</a> 
                </Typography>
            </Paper>
        </>
    );
}

export default Comments