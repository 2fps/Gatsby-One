const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require("gatsby-source-filesystem")
const config = require('./config/config.js')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPageTemplate = path.resolve(`src/pages/index.js`),
    blogPostTemplate = path.resolve(`src/templates/post.js`);

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: {frontmatter: {draft: {in: [false, null] }}, fileAbsolutePath: {regex: "/blog/"}}
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    console.log(result.errors)
    throw new Error("Things broke, see console output above")
  }

  // 创建内容页面
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {}, // additional data can be passed via context
    })
  })

  // 创建分页界面
  const posts = result.data.allMarkdownRemark.edges
  const postsPerPage = 10
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/' : `page/${i + 1}`,
      component: blogPageTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        name: 1
      }
    })
  })

  // 创建主题课程
  const subjectTemplate = path.resolve(`src/templates/subjects.js`);

  config.subjectContent.forEach(async (item) => {
    let path = item.path;
    let name = item.name;

    const subResult = await graphql(`
      query($path: String){
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }, filter: {frontmatter: {draft: {in: [false, null] }}, fileAbsolutePath: {regex: $path}}
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                categories
                path
              }
            }
          }
        }
      }
    `, {
      path
    })

    if (subResult.errors) {
      console.log(subResult.errors)
      throw new Error("Things broke, see console output above")
    }
  
    // 创建专题分类中小页面
    subResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          // realPath: node.frontmatter.path
        }
      })
    })

    // 创建专题分类的主页面
    createPage({
      path: path,
      component: subjectTemplate,
      context: {
        title: name
      },
    })

  })

  // 创建 tags 
  const tagTemplate = path.resolve("src/templates/tags.js")
  const tagsResult = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: {frontmatter: {draft: {in: [false, null] }}, fileAbsolutePath: {regex: "/(blog)||(subject)/"}}
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(filter: {frontmatter: {draft: {in: [false, null] }}, fileAbsolutePath: {regex: "/(blog)||(subject)/"}}) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)
  // handle errors
  if (tagsResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  const tags = tagsResult.data.tagsGroup.group
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  // 创建类别页面
  const categoryTemplate = path.resolve("src/templates/category.js")
  const categoriesResult = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: {frontmatter: {draft: {in: [false, null] }}, fileAbsolutePath: {regex: "/(blog)||(subject)/"}}
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              categories
            }
          }
        }
      }
      categoriesGroup: allMarkdownRemark(filter: {frontmatter: {draft: {in: [false, null] }}, fileAbsolutePath: {regex: "/(blog)||(subject)/"}}) {
        group(field: frontmatter___categories) {
          fieldValue
        }
      }
    }
  `)
  // handle errors
  if (categoriesResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  const categories = categoriesResult.data.categoriesGroup.group
  // Make tag pages
  categories.forEach(category => {
    createPage({
      path: `/categories/${_.kebabCase(category.fieldValue)}/`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}