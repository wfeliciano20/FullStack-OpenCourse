// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum + blog.likes;
    }, 0);
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }
    const initialFavoriteBlog = blogs[0];
    const maxLikes = blogs.reduce((max, blog) => {
        return blog.likes > max.likes ? blog : max;
    }, initialFavoriteBlog);
    return maxLikes;
};

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author);
    const authorsCountReducer = (authorsCount, author) => {
        if (authorsCount[author]) {
            authorsCount[author]++;
        } else {
            authorsCount[author] = 1;
        }
        return authorsCount;
    };
    const authorCount = authors.reduce(authorsCountReducer, {});
    const maxAuthorReducer = (authorWithMostBlogs, author) => {
        if (authorCount[author] > authorCount[authorWithMostBlogs]) {
            return author;
        } else {
            return authorWithMostBlogs;
        }
    };
    const maxAuthor = Object.keys(authorCount).reduce(maxAuthorReducer, authors[0]);
    return { author: maxAuthor, blogs: authorCount[maxAuthor] };
};



module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };