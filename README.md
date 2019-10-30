# gatsby-blog

## 简介
本主题基于Gatsby博客系统。

已有功能可以见站点：[前端驿站](http://www.zhuyuntao.cn/)。

## 目录详细介绍
### src
站点源码

#### components
存放页面组件的地方

1. Brief组件
index.html主页显示文章简略信息的组件。

+ cover.js用于显示缩略图。

2. Comments组件

评论组件，目前无，仅用于文字的显示。

3. Footer组件

页面底部显示组件。

目前有底部链接和底部版权两块。

4. Heaer组件

页面顶部目录组件。

+ navBrand.js 负责目录左侧的站点标题模块。
+ navLinks.js 负责目录右侧内容的渲染。

5. Pagination组件

分页组件。

6. Pendant组件。

页面右下角悬浮按钮组件。目前支持：

+ 回到顶部功能。
+ 目录显示功能。

7. SEO组件

用于SEO。

#### pages
独立的页面。

1. 404.js

404页面。

2. about-me.js

关于我页面。

3. archives.js

4. categories.js

5. index.js

index.html 首页

6. links.js

友情链接页面。

7. tags.js

总的标签内容页面。

#### templates
模板页面

1. archive.js
2. category.js
3. post.js
4. tags.js

### md文件

md文件有以下几个关键值必须存在：

#### title
表示当前文章的标题。例如：

title: test

#### tags
表示当前文章的标签，支持多个。例如：

tags:
  - test1
  - test2

#### path
表示当前文章的访问路径，通常是： 域名 + path。例如：

path: /test

#### id
文章的唯一标识，待用。例如：

id: 20190930222522

#### cover
表示封面图片，暂时未使用。

#### draft
表示当前文章是否是草稿，ture为是，false为否。例如：

draft: true

#### categories
表示当前文章的分类。例如：

categories:
  - cate1
  - cate2

#### date
表示文章的发表日期。例如：

date: 2019-10-02 22:25:52

#### description
文章的description，用于SEO。例如，

description: 我是文章的description。

#### keywords
文章的keywords，用于SEO。例如：

keywords: 1,2,3



