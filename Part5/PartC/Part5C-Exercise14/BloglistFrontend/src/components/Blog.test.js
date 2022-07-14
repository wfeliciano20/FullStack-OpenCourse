/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
/**
 * Important!!! 
 * to be able to run this component in isolation without the logged user to be assigned to
to the auth context comment out  lines 6 , 11 to 26 and  31- 42 on Blog.jsx
 * 
 */
describe('Blog component Test', () => {
	test('renders blog title and author and nothing else', () => {
		const blog = {
			title: 'Component testing is done with react-testing-library',
			author: 'John Doe',
			url: 'www.test.com',
			likes: 10,
			user: {
				username: 'test',
				name: 'Test User',
				id: '5e9f8f8f8f8f8f8f8f8f8f8f',
			},
		};

		const { container } = render(<Blog blog={blog} />);

		const div = container.querySelector('.blog-default-view');
		expect(div).toHaveTextContent(
			'Blog Title: Component testing is done with react-testing-library by John Doe',
		);
		expect(div).not.toHaveTextContent('Url: www.test.com');
		expect(div).not.toHaveTextContent('Likes: 10');
	});

	test('renders blog title and author and url and likes when show all button is clicked', async () => {
		const blog = {
			title: 'Component testing is done with react-testing-library',
			author: 'John Doe',
			url: 'www.test.com',
			likes: 10,
			user: {
				username: 'test',
				name: 'Test User',
				id: '5e9f8f8f8f8f8f8f8f8f8f8f',
			},
		};

		const { container } = render(<Blog blog={blog} />);

		const user = userEvent.setup();
		const button = screen.getByText('Show all');
		await user.click(button);

		const div = container.querySelector('.blog-default-view');
		expect(div).toHaveTextContent(
			'Blog Title: Component testing is done with react-testing-libraryAuthor: John DoeUrl: www.test.comLikes: 10 LikeDelete BlogShow less',
		);
	});
});
