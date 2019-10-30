const config = {
    siteLogo: '/logos/favicon.ico',
    siteUrl: 'https://www.zhuyuntao.cn',         // 站点url
    github: 'https://github.com/2fps',          // 作者的链接地址
    imageUrl: 'https://image.zhuyuntao.cn',
    pathPrefix: '',
    backgroundColor: '#F5F5F5',
    siteTitle: '前端驿站',                        // 站点名称
    subTitle: 'Just For Fun',
    siteDescription: '个人前端博客站点，涉及但不仅限于web前端,html,html5,css,css3,javascript,js,jquery,bootstrap,angular,angularjs,vue,react,node,express,koa,koa2,mongodb,mongoose等技术',
    keywords: '个人博客,web,前端',
    author: '2fps',
    siteRss: '/rss.xml',
    menus: [{
        name: '专题',
        path: '/subject/',
    }, {
        name: '标签',
        path: '/tags/',
    }, {
        name: '类别',
        path: '/categories/',
    }, {
        name: '归档',
        path: '/archives/',
    }, {
        name: '关于我',
        path: '/about-me/',
    }, {
        name: 'Github',
        path: 'https://github.com/2fps',
    }],
    bottomMenus: [{
        name: 'RSS',
        path: '/rss.xml',
    }, {
        name: '站点地图',
        path: '/sitemap.xml',
    }, {
        name: '友情链接',
        path: '/links/',
    }],
    // 友链数据
    links: [{
        siteTitle: '怕毛毛啊',
        siteUrl: 'http://www.chen7hao7.cn',
        imageUrl: 'http://image.zhuyuntao.cn/image/links/www.chen7hao7.cn.ico',
        siteDesc: '怕毛毛这个瓜皮啥都没有留下！！！',
    }, {
        siteTitle: '嘎里三分熟',
        siteUrl: 'http://www.jetchen.cn',
        imageUrl: 'http://image.zhuyuntao.cn/image/links/www.jetchen.cn.jpg',
        siteDesc: '记录开发中碰到的一些问题，避免同一个坑踩多次，以及分享一些想和观点。',
    }],
    // 专题中的数据
    // state 0 : 未开始 1: 进行中  2: 已完成
    subjectContent: [{
        name: 'js设计模式',
        path: '/subject/js设计模式/',
        imageUrl: '',
        desc: '设计模式是软件开发人员在软件开发过程中面临的一般问题的解决方案。',
        state: 1,
    }, {
        name: 'js常用算法',
        path: '/subject/js常用算法/',
        imageUrl: '',
        desc: '',
        state: 0,
    }, {
        name: 'js LetCode之路',
        path: '/subject/letcode/',
        imageUrl: '',
        desc: '',
        state: 0,
    }],
    disqus: {
        shortname: 'gatsby-blog-4',
    }
};

module.exports = config;
