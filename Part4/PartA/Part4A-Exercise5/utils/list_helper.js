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

module.exports = { dummy, totalLikes, favoriteBlog };