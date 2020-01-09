import React from 'react';

import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Tooltip from '@material-ui/core/Tooltip';

let throttle = function(delay) {
    let timer = null;

    return function(fn) {
        if (!timer) {
            timer = setTimeout(function() {
                fn();
                timer = null;
            }, delay);
        }
    }
}

// 按时间聚合文章显示
// articles里已经按时间排好序了
let combineWithDate = (articles) => {
    let res = [],
        tempStr = '';   // 临时记录时间

    articles.forEach((art) => {
        let thisDate = art.nodes[0].frontmatter.date;

        if (thisDate !== tempStr) {
            // 新的时间
            res.push({
                date: thisDate,
                articles: []
            })
        }

        res[res.length - 1].articles.push({
            path: art.nodes[0].frontmatter.path,
            title: art.nodes[0].frontmatter.title
        })

        tempStr = thisDate;
    })

    return res;
}

let subjectState = (state) => {
    let icon = null;

    switch (state) {
        case 0:
            icon = (
                <Tooltip title="未开始" placement="right">
                    <PauseCircleFilledIcon />
                </Tooltip>
            );
            break;
        case 1:
            icon = <AutorenewIcon />
            break;
        case 2:
            icon = <CheckCircleIcon color="primary" />
            break;
        default:
            break;
    }

    return icon;
}

export {
    throttle,
    combineWithDate,
    subjectState,
}
