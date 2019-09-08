/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const config = require("./config/config");

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `前端驿站`,
    description: `Just For Fun`,
    keywords: `title`,
    siteUrl: `http://www.zhuyuntao.cn`,
    author: '2fps',
    imageUrl: `http://image.zhuyuntao.cn`
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/my/blog`,
      },
    }, {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `tomato`,
        showSpinner: true,
      },
    },
  ],
}
