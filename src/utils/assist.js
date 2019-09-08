/**
 * 用于计算文章的 分类，tag 和 日期
 */

function getPostData (post) {
    return post.map((data) => {
        return {
            categories: data.node.childMarkdownRemark.frontmatter.categories,
            tags: data.node.childMarkdownRemark.frontmatter.tags,
            date: data.node.childMarkdownRemark.frontmatter.date,
        }
    });
}

export const getExtraList = (post) => {
    const tagMap = new Map(),
        categoryMap = new Map(),
        dateMap = new Map(),
        postList = getPostData(post);

    postList.forEach(({ categories, tags, date }) => {
        // 分类
        if (categories) {
            categories.forEach((category) => {
                if (categoryMap.has(category)) {
                    // ++
                    categoryMap.set(category, categoryMap.get(category) + 1);
                } else {
                    // 新设置值
                    categoryMap.set(category, 1);
                }
            });
        }

        // 标签
        if (tags) {
            tags.forEach((tag) => {
                if (tagMap.has(tag)) {
                    // ++
                    tagMap.set(tag, tagMap.get(tag) + 1);
                } else {
                    // 新设置值
                    tagMap.set(tag, 1);
                }
            });
        }

        // 时间
        if (date) {
            let da = date.substring(0, 7);
            
            if (dateMap.has(da)) {
                // ++
                dateMap.set(da, dateMap.get(da) + 1);
            } else {
                // 新设置值
                dateMap.set(da, 1);
            }
        }
    });

    return {
        categoryMap,
        tagMap,
        dateMap,
    };
}