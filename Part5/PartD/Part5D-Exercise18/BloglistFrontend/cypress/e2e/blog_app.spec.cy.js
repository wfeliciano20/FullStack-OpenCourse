/* eslint-disable no-undef */
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
	it('The user can login', () => {
		cy.get('#username').type('jdoe');
		cy.get('#password').type('12345');
		cy.get('#login-button').click();

		cy.contains('John Doe has logged in');
	});
});
