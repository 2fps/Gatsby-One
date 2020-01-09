import React from 'react';
import classNames from 'classnames';

import MenuBook from '@material-ui/icons/MenuBook';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

import { throttle } from '../../utils/utils';

import './pendant.scss';
import '../../../static/scss/iconfont.scss';

let scrollFn = null;

class Pendant extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showBackToTop: false,       // 回到顶部按钮是否显示
            isMenuShow: false,          // menu是否已经展开
            isWeChatShow: false,        // 微信公众号图片是否显示
        };
    }
    componentDidMount() {
        let belowShow = throttle(400);

        // 增加对滚动条的监听
        document.addEventListener('scroll', scrollFn = (e) => {
            belowShow(() => {
                let top = Math.abs(document.body.getBoundingClientRect().y);

                this.setState({
                    showBackToTop: top >= 200
                });
            });
        });
    }
    componentWillUnmount() {
        // 解绑事件
        document.removeEventListener('scroll', scrollFn);
    }
    // 返回顶部
    backToTop = () => {
        let distance = Math.abs(document.body.getBoundingClientRect().y),
            interval = null;

        interval = setInterval(() => {
            // 每次递减 10%, 速度由快到慢
            distance -= distance * 0.15;
            document.documentElement.scrollTop = distance;

            if (distance <= 5 && interval) {
                clearInterval(interval);
                interval = null;

                document.documentElement.scrollTop = 0;
            }
        }, 20);
    }
    // 显示文章menu
    showArticleMenu = () => {
        this.setState({
            isMenuShow: !this.state.isMenuShow
        });
    }

    articleMenuContent = () => {
        let menuClass = classNames({
            'article-menu': true,
            'showMenu': this.state.isMenuShow,
        });

        return (
            <div
                className={ menuClass }
                dangerouslySetInnerHTML={{ __html: this.props.tableOfContents }}
            />
        );
    }

    // 显示微信公众号图片
    showWeChat = () => {
        this.setState({
            isWeChatShow: true
        });
    }

    // 隐藏微信公众号图片
    hideWeChat = () => {
        this.setState({
            isWeChatShow: false
        });
    }

    render() {
        let backTopClass = classNames({
            'float-box': true,
            'opacity-0': true,
            'opacity-6': this.state.showBackToTop,
        });

        return (
            <>
                <div className="pendant">
                    {/* 点击显示文章目录按钮 */}
                    { this.props.tableOfContents && <MenuBook className="float-box" onClick={ this.showArticleMenu } onTouchEnd={ this.showArticleMenu } /> }
                    {/* 公众号 */}
                    <div className="pendant-box" onMouseEnter={ this.showWeChat } onMouseLeave={ this.hideWeChat }>
                        <span className="iconfont weixin1"></span>
                    </div>
                    {
                        this.state.isWeChatShow && <img className="weichat-pic" src="http://image.zhuyuntao.cn/image/spc/weixingongzhonghao.jpg" alt="weixin" width="160" height="160" />
                    }
                    {/* 回到顶部插件 */}
                    <ArrowUpward className={ backTopClass } onClick={ this.backToTop } onTouchEnd={ this.backToTop } />
                </div>
                {/* 文章目录内容 */}
                { this.props.tableOfContents && this.articleMenuContent() }
            </>
        );
    }
}

export default Pendant;
