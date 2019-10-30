/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const config = require("./config/config");
const path = require("path");

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: config.siteTitle,
    siteTitle: config.siteTitle,
    description: config.siteDescription,
    keywords: config.keywords,
    siteUrl: config.siteUrl,
    author: config.author,
    imageUrl: config.imageUrl,
    menus: config.menus,
    bottomMenus: config.bottomMenus,
    github: config.github,
  },
  plugins: [
    `gatsby-alias-imports`,
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false
        }
      }
    },
    'gatsby-plugin-material-ui',
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        "excerpt_separator": '<!-- more -->',
        plugins: [
          `gatsby-remark-autolink-headers`,
          'gatsby-remark-reading-time',{
            resolve: `gatsby-remark-vscode`,
            // All options are optional. Defaults shown here.
            options: {
              colorTheme: 'Dark+ (default dark)', // Read on for list of included themes. Also accepts object and function forms.
              wrapperClassName: '',   // Additional class put on 'pre' tag
              injectStyles: true,     // Injects (minimal) additional CSS for layout and scrolling
              extensions: [],         // Extensions to download from the marketplace to provide more languages and themes
              extensionDataDirectory: // Absolute path to the directory where extensions will be downloaded. Defaults to inside node_modules.
                path.resolve('extensions'),
              languageAliases: {},    // Map of custom/unknown language codes to standard/known language codes
              replaceColor: x => x,   // Function allowing replacement of a theme color with another. Useful for replacing hex colors with CSS variables.
              getLineClassName: ({    // Function allowing dynamic setting of additional class names on individual lines
                content,              //   - the string content of the line
                index,                //   - the zero-based index of the line within the code fence
                language,             //   - the language specified for the code fence
                codeFenceOptions      //   - any options set on the code fence alongside the language (more on this later)
              }) => '',
              logLevel: 'error'       // Set to 'warn' to debug if something looks wrong
            }
          }, {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow"
            }
          }
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: {frontmatter: {draft: {in: [false, null] }}, fileAbsolutePath: {regex: "/(blog/\\\\d{4})||(js设计模式)/"}}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/my/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `subject`,
        path: `${__dirname}/my/subject`,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `tomato`,
        showSpinner: true,
      },
    },
    {
      resolve: `gatsby-plugin-baidu-analytics`,
      options: {
        siteId: "5feb10d276cc43fd5045338f81ac161c",
        head: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-139145148-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.zhuyuntao.cn',
        sitemap: 'https://www.zhuyuntao.cn/sitemap.xml',
        policy: [{ userAgent: '*'}]
      }
    },
    "gatsby-plugin-remove-serviceworker",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.siteTitle,
        short_name: config.siteTitle,
        description: config.siteDescription,
        start_url: config.pathPrefix + "/",
        background_color: config.backgroundColor,
        display: "standalone",
        icon: 'static/logos/favicon.png',
      }
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        analyzerPort: 9000,
        production: true,
        disable: true,    // 先禁用了
      },
    },
  ],
}
