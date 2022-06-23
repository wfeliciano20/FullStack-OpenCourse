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
  const authors = blogs.map((blog) => blog.author);
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
  const maxAuthor = Object.keys(authorCount).reduce(
    maxAuthorReducer,
    authors[0],
  );
  return { author: maxAuthor, blogs: authorCount[maxAuthor] };
};

const mostLikes = (blogs) => {
  const authorsLikes = blogs.map((blog) => {
    {
      return { author: blog.author, likes: blog.likes };
    }
  });

  const authorsLikesCountReducer = (authorsLikesCount, authorLikes) => {
    if (authorsLikesCount[authorLikes.author]) {
      authorsLikesCount[authorLikes.author] += authorLikes.likes;
    } else {
      authorsLikesCount[authorLikes.author] = authorLikes.likes;
    }
    return authorsLikesCount;
  };
  const authorsLikesCount = authorsLikes.reduce(authorsLikesCountReducer, {});
  const maxAuthorLikesReducer = (authorWithMostLikes, author) => {
    if (authorsLikesCount[author] > authorsLikesCount[authorWithMostLikes]) {
      return author;
    } else {
      return authorWithMostLikes;
    }
  };
  const maxAuthorLikes = Object.keys(authorsLikesCount).reduce(
    maxAuthorLikesReducer,
    authorsLikes[0].author,
  );
  return { author: maxAuthorLikes, likes: authorsLikesCount[maxAuthorLikes] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
