describe('Test initial loading of page', () => {
	beforeEach(() => {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		const user = {
			username: 'jdoe',
			name: 'John Doe',
			password: '12345',
		};
		cy.request('POST', 'http://localhost:3003/api/users/', user);
		cy.visit('http://localhost:3000');
	});

	it('The initial screen has the log in form', () => {
		cy.contains('Login');
		cy.contains('username');
		cy.contains('password');
	});
});

describe('Login', () => {
	beforeEach(() => {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		const user = {
			username: 'jdoe',
			name: 'John Doe',
			password: '12345',
		};
		cy.request('POST', 'http://localhost:3003/api/users/', user);
		cy.visit('http://localhost:3000');
	});

	it('The user can login', () => {
		cy.get('#username').type('jdoe');
		cy.get('#password').type('12345');
		cy.get('#login-button').click();

		cy.contains('John Doe has logged in');
	});

	// eslint-disable-next-line prettier/prettier
	it('The user can\'t login with bad credentials', () => {
		cy.get('#username').type('jdoe');
		cy.get('#password').type('123456');
		cy.get('#login-button').click();

		cy.contains('invalid username or password');
	});
});

describe('Logged in User can create a blog', () => {
	beforeEach(() => {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		const user = {
			username: 'jdoe',
			name: 'John Doe',
			password: '12345',
		};
		cy.request('POST', 'http://localhost:3003/api/users/', user);
		cy.visit('http://localhost:3000');
	});

	it('The logged in user can create a blog', () => {
		cy.get('#username').type('jdoe');
		cy.get('#password').type('12345');
		cy.get('#login-button').click();

		cy.contains('John Doe has logged in');
		cy.get('#toggle').click();
		cy.get('#title').type('this is test blog 1');
		cy.get('#author').type('test-user');
		cy.get('#url').type('http://test.com');
		cy.get('#create').click();

		cy.contains('Blog Title: this is test blog 1 by test-user');
	});
});

describe('Logged in User can like a blog', () => {
	beforeEach(() => {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		const user = {
			username: 'jdoe',
			name: 'John Doe',
			password: '12345',
		};
		cy.request('POST', 'http://localhost:3003/api/users/', user);
		cy.visit('http://localhost:3000');
	});

	it('The logged in user can create a blog', () => {
		cy.get('#username').type('jdoe');
		cy.get('#password').type('12345');
		cy.get('#login-button').click();

		cy.contains('John Doe has logged in');
		cy.get('#toggle').click();
		cy.get('#title').type('this is test blog 1');
		cy.get('#author').type('test-user');
		cy.get('#url').type('http://test.com');
		cy.get('#create').click();

		cy.contains('Blog Title: this is test blog 1 by test-user');
		cy.get('#showAll').click();
		cy.get('#like').click();
		cy.contains('Likes: 1');
	});
});

describe('Logged in User can delete a blog', () => {
	beforeEach(() => {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		const user = {
			username: 'jdoe',
			name: 'John Doe',
			password: '12345',
		};
		cy.request('POST', 'http://localhost:3003/api/users/', user);
		cy.visit('http://localhost:3000');
	});

	it('The logged in user can delete a blog', () => {
		cy.get('#username').type('jdoe');
		cy.get('#password').type('12345');
		cy.get('#login-button').click();

		cy.contains('John Doe has logged in');
		cy.get('#toggle').click();
		cy.get('#title').type('this is test blog 1');
		cy.get('#author').type('test-user');
		cy.get('#url').type('http://test.com');
		cy.get('#create').click();

		cy.contains('Blog Title: this is test blog 1 by test-user');
		cy.get('.deleteBlog').click();
		cy.contains('Blog Title: this is test blog 1 by test-user').should(
			'not.exist',
		);
	});
});

describe('The blog with most likes comes first', () => {
	beforeEach(() => {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		const user = {
			username: 'jdoe',
			name: 'John Doe',
			password: '12345',
		};
		cy.request('POST', 'http://localhost:3003/api/users/', user);
		cy.visit('http://localhost:3000');
		cy.get('#username').type('jdoe');
		cy.get('#password').type('12345');
		cy.get('#login-button').click();

		cy.contains('John Doe has logged in');
		cy.get('#toggle').click();
		cy.get('#title').type('this is test blog 1');
		cy.get('#author').type('test-user');
		cy.get('#url').type('http://test.com');
		cy.get('#create').click();

		cy.contains('Blog Title: this is test blog 1 by test-user');
		cy.get('#showAll').click();
		cy.get('#like').first().click();
		cy.contains('Likes: 1');
		cy.get('#like').first().click();
		cy.contains('Likes: 2');

		cy.contains('John Doe has logged in');
		cy.get('#toggle').click();
		cy.get('#title').type('this is test blog 2');
		cy.get('#author').type('test-user2');
		cy.get('#url').type('http://test2.com');
		cy.get('#create').click();
		cy.get('#showAll').last().click();
		cy.get('.blog-default-view #like').eq(1).click();
		cy.get('.blog-default-view').eq(1).should('contain', 'Likes: 1');
		cy.get('.blog-default-view #like').eq(1).click();
		cy.get('.blog-default-view').eq(1).should('contain', 'Likes: 2');
		cy.get('.blog-default-view #like').eq(1).click();
		cy.get('.blog-default-view').eq(1).should('contain', 'Likes: 3');
	});

	it('The blog with most likes is first', () => {
		cy.get('.blog-default-view')
			.eq(0)
			.contains('Blog Title: this is test blog 2');
		cy.get('.blog-default-view')
			.eq(1)
			.contains('Blog Title: this is test blog 1');
	});
});
