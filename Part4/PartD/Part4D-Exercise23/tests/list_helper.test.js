const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total Likes', () => {
  test('of empty list is zero', () => {
    const blogs = [];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  }),
    test('when list has only one blog equals the likes of that', () => {
      const blogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.buffalo.edu/~dijkstra/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 100,
          __v: 0,
        },
      ];

      const result = listHelper.totalLikes(blogs);
      expect(result).toBe(100);
    }),
    test('of a bigger list is calculated right', () => {
      const blogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.buffalo.edu/~dijkstra/Go_To_Considered_Harmful.html',
          likes: 100,
          __v: 0,
        },
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful2',
          author: 'John Doe',
          url: 'http://www.buffalo.edu/~doe/Go_To_Considered_Harmful.html',
          likes: 200,
          __v: 0,
        },
      ];

      const result = listHelper.totalLikes(blogs);
      expect(result).toBe(300);
    });
});

describe('favoriteBlog', () => {
  test('of empty list is null', () => {
    const blogs = [];

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toBe(null);
  }),
    test('when list has only one blog equals the likes of that', () => {
      const blogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'John Doe',
          url: 'http://www.buffalo.edu/~doe/Go_To_Considered_Harmful.html',
          likes: 200,
          __v: 0,
        },
      ];

      const result = listHelper.favoriteBlog(blogs);
      expect(result).toEqual(blogs[0]);
    }),
    test('of a bigger list is calculated right', () => {
      const blogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.buffalo.edu/~dijkstra/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 200,
          __v: 0,
        },
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful2',
          author: 'John Doe',
          url: 'http://www.u.buffalo.edu/~doe/go_to_considered_Harmful2',
          likes: 200,
          __v: 0,
        },
      ];

      const result = listHelper.favoriteBlog(blogs);
      expect(result).toEqual(blogs[0]);
    }),
    test('of a bigger list with more than one blog with same max returns at least one of them', () => {
      const blogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.buffalo.edu/~dijkstra/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 200,
          __v: 0,
        },
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful2',
          author: 'John Doe',
          url: 'http://www.u.buffalo.edu/~doe/go_to_considered_Harmful2',
          likes: 200,
          __v: 0,
        },
        {
          _id: '5a422aa71b54a676234d17f7',
          title: 'Go To Statement Considered Harmful2',
          author: 'Jane Doe',
          url: 'http://www.u.buffalo.edu/~dijkstra/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 100,
          __v: 0,
        },
      ];

      const result = listHelper.favoriteBlog(blogs);
      expect(result).toEqual(blogs[0]);
    });
});

describe('most blogs', () => {
  test('when list has only one blog best author equals the author of that blog', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'John Doe',
        url: 'http://www.buffalo.edu/~doe/go-to-statement-considered-harmful.html',
        likes: 200,
        __v: 0,
      },
    ];

    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: 'John Doe', blogs: 1 });
  });

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.buffalo.edu/~dijkstra/copyright_violations/go_to_considered_harmful.html',
        likes: 100,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Go To Statement Considered Harmful2',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.buffalo.edu/~dijkstra/copyright_violations/go_to_considered_harmful2.html',
        likes: 200,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Considered Harmful controversies',
        author: 'John Doe',
        url: '',
        likes: 100,
        __v: 0,
      },
    ];

    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 2 });
  });

  test('of a bigger list with more than one blog with same max returns at least one of them', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Considered Harmful controversies',
        author: 'John Doe',
        url: 'http://www.doeblog/go_to_considered_harmful_controversies.html',
        likes: 100,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d18f7',
        title: 'lorem ipsoum Statement',
        author: 'John Doe',
        url: 'http://www.doeblog/loremupsoumstatement.html',
        likes: 100,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.buffalo.edu/~dijkstra/copyright_violations/go_to_considered_harmful.html',
        likes: 100,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Go To Statement Considered Harmful2',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.buffalo.edu/~dijkstra/copyright_violations/go_to_considered_harmful2.html',
        likes: 200,
        __v: 0,
      },
    ];

    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: 'John Doe', blogs: 2 });
  });
});

describe('mostLikes', () => {
  test('when list has only one blog author with most likes equals the author of that blog', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Considered Harmful controversies',
        author: 'John Doe',
        url: 'http://www.doeblog/go_to_considered_harmful_controversies.html',
        likes: 100,
        __v: 0,
      },
    ];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: 'John Doe', likes: 100 });
  });

  test('a bigger list is calculated right', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Considered Harmful controversies',
        author: 'John Doe',
        url: 'http://www.doeblog/go_to_considered_harmful_controversies.html',
        likes: 100,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d18f7',
        title: 'lorem ipsoum Statement',
        author: 'John Doe',
        url: 'http://www.doeblog/loremupsoumstatement.html',
        likes: 100,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.buffalo.edu/~dijkstra/copyright_violations/go_to_considered_harmful.html',
        likes: 100,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Go To Statement Considered Harmful2',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.buffalo.edu/~dijkstra/copyright_violations/go_to_considered_harmful2.html',
        likes: 200,
        __v: 0,
      },
    ];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 300 });
  });

  test('of a bigger list with more than one author with same max likes returns at least one of them', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Considered Harmful controversies',
        author: 'John Doe',
        url: 'http://www.doeblog/go_to_considered_harmful_controversies.html',
        likes: 100,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d18f7',
        title: 'lorem ipsoum Statement',
        author: 'John Doe',
        url: 'http://www.doeblog/loremupsoumstatement.html',
        likes: 200,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.buffalo.edu/~dijkstra/copyright_violations/go_to_considered_harmful.html',
        likes: 100,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Go To Statement Considered Harmful2',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.buffalo.edu/~dijkstra/copyright_violations/go_to_considered_harmful2.html',
        likes: 200,
        __v: 0,
      },
    ];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: 'John Doe', likes: 300 });
  });
});
