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
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 100,
            __v: 0
        }];

        const result = listHelper.totalLikes(blogs);
        expect(result).toBe(100);
    }),

    test('of a bigger list is calculated right', () => {
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 100,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful2',
            author: 'John Doe',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 200,
            __v: 0
        },
        ];

        const result = listHelper.totalLikes(blogs);
        expect(result).toBe(300);
    });
});