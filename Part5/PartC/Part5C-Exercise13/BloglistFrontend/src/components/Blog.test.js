/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';
/**
 * Important!!! 
 * to be able to run this component in isolation without the logged user to be assigned to
to the auth context comment out  lines 6 , 11 to 26 and  31- 42 on Blog.jsx
 * 
 */

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
