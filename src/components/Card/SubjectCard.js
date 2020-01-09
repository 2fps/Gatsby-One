import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './SubjectCard.scss';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        margin: '0 auto',
    },
    media: {
        height: 140,
    },
    desc: {
        height: 60,
    },
    subTitle: {
        float: 'right'
    }
});

const SubjectCard = ({
    name,
    path,
    imageUrl,
    colors,
    desc,
    state,
    handleClick,
}) => {
    const classes = useStyles();

    let showState = (state) => {
        return [<span style={{ color: '#795548' }} key="notBegin">未开始</span>, <span style={{ color: '#f44336' }} key="ing">进行中</span>, <span style={{ color: '#00c853' }} key="down">已完成</span>][state]
    }

    let bgColor = {
        backgroundColor: colors,
    }

    return (
        <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
            <Card className={ classes.card }>
                <CardActionArea component="a" href={ path }>
                    <CardMedia
                        className={ classes.media }
                        style={ bgColor }
                        src=""
                        title={ name }
                    />
                    <CardContent>
                        <Typography className={ classes.subTitle } gutterBottom variant="body1" component="p">
                            { showState(state) }
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                            { name }
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={ classes.desc }>
                            { desc }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {/* <Button size="small" color="primary" onClick={ handleClick }>
                        分享
                    </Button> */}
                    <Button size="small" color="primary" component="a" href={ path }>
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default SubjectCard;
