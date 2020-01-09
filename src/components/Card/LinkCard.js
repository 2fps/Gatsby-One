import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import './LinkCard.scss';

export default ({
    siteTitle,
    siteUrl,
    imageUrl,
    siteDesc,
}) => {
    const [hover, setHover] = React.useState({ 0: false });

    // 是否选中card
    const toggleCard = (ind, state) => event => {
        setHover({ ...hover, [ind]: !!state });
    };

    return (
        <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
            <Card className="links-card" raised={ hover[0] } onMouseEnter={ toggleCard(0, true) } onMouseLeave={ toggleCard(0, false) } component="a" href={ siteUrl } target="_blank">
                <img
                    className="links-cover"
                    alt=""
                    src={ imageUrl }
                    title={ siteTitle }
                />
                <div className="links-details">
                    <CardContent className="links-content">
                        <Typography component="h2" className="links-title">
                            { siteTitle }
                        </Typography>
                        <Typography className="links-introduction">
                            { siteDesc }
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </Grid>
    )
}
