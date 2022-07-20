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
