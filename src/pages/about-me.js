import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Paper from '@material-ui/core/Paper';
import Place from '@material-ui/icons/Place';

import Header from 'components/Header/header';
import Footer from 'components/Footer/footer';
import SEO from 'components/SEO/SEO';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import '../../static/common.scss';

import 'typeface-roboto';

export default ({ data }) => {
    let siteMetadata = data.site.siteMetadata;

    let timeLine = [{
        date: '2019年11月02号',
        content: [
            '站点迁回国啦，搬迁至阿里云上海节点。'
        ]
    }, {
        date: '2019年10月14号',
        content: [
            '站点升级到Http2.0协议。'
        ]
    }, {
        date: '2019年9月30号',
        content: [
            '整站搬移到vultr洛杉矶节点，依旧使用阿里云CDN代理。',
            '放弃WordPress，使用基于React的静态博客生成器Gatsby，主题是个人写的 Gatsby-One ，详见页面底部链接。'
        ]
    }, {
        date: '2019年8月9号',
        content: ['站点内用到的静态资源文件均存放于image.zhuyuntao.cn虚机上，等待静态博客上线。']
    }, {
        date: '2018年11月05号',
        content: [
            '整站迁移至vultr的西雅图节点，国内访问使用了阿里云CDN代理。',
            '由于访问国外https间歇性连不上，利用CDN强制https跳转到http。'
        ]
    }, {
        date: '2018年10月14号',
        content: ['站点升级http到https。']
    }, {
        date: '2016年07月17号',
        content: ['基于wordpress的个人博客上线，采用了Kratos主题，仍跑于共享虚拟主机之上。']
    }, {
        date: '2015年08月03号',
        content: ['www.zhuyuntao.cn域名注册，阿里云免费共享虚拟主机上线，开始尝试各种玩意。'],
    }];

    // 为该页面重写部分seo配置
    siteMetadata.description = '关于我的个人信息，以及站点 www.zhuyuntao.cn 的建站历程';
    siteMetadata.keywords = 'zhuyuntao,建站';

    return (
        <div>
            <Helmet>
                <title>{ siteMetadata.siteTitle } - 关于我</title>
            </Helmet>
            <SEO site={ siteMetadata } />
            <Header { ...siteMetadata } />
            <div className="content-container">
                <div className="article-content">
                    <Paper className="blog-post">
                        <h1>关于我</h1>
                        <div className="">
                            <div>
                                <h2>个人简介</h2>
                                <ul className="about-me-info">
                                    <li>姓名：ZYT</li>
                                    <li>性别：未知</li>
                                    <li>职业：码农</li>
                                    <li>坐标：杭州</li>
                                    <li>理想：全干攻城狮</li>
                                    <li>Stay hungry, Stay foolish</li>
                                    <li>echoweb@126.com</li>
                                </ul>
                            </div>
                            <br />
                            <h2>站点事件</h2>
                            <VerticalTimeline layout="1-column">
                                {
                                    timeLine.map((line, ind) => {
                                        return (
                                            <VerticalTimelineElement
                                                key={ ind }
                                                className="vertical-timeline-element--work"
                                                contentStyle={{ background: '#F5F5F5', color: '#000', borderTop: '3px solid #0097ee' }}
                                                contentArrowStyle={{ borderRight: '7px solid #F5F5F5' }}
                                                iconStyle={{ background: '#F5F5F5', color: '#000' }}
                                                icon={ <Place /> }
                                            >
                                                <h2 className="vertical-timeline-element-title">{ line.date }</h2>
                                                {
                                                    line.content.map((con, index) => {
                                                        return (
                                                            <p key={ index }>
                                                                {con}
                                                            </p>
                                                        );
                                                    })
                                                }
                                            </VerticalTimelineElement>
                                        );
                                    })
                                }
                            </VerticalTimeline>
                        </div>
                    </Paper>
                </div>
            </div>
            <Footer { ...siteMetadata } />
        </div>
    );
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
            menus {
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
