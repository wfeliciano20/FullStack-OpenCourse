/* eslint-disable no-unused-vars */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateBlogForm from './CreateBlogForm';
import userEvent from '@testing-library/user-event';

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
	const createBlog = jest.fn();
	const user = userEvent.setup();

	const { container } = render(<CreateBlogForm createBlog={createBlog} />);
	const titleInput = container.querySelector('input[name="Title"]');
	const authorInput = container.querySelector('input[name="Author"]');
	const urlInput = container.querySelector('input[name="Url"]');
	const submitButton = screen.getByText('create');

	await user.type(titleInput, 'testing a form...');
	await user.type(authorInput, 'John Doe');
	await user.type(urlInput, 'www.test.com');
	submitButton.onclick = jest.fn(() => {
		createBlog({
			title: titleInput.textContent,
			author: authorInput.textContent,
			url: urlInput.textContent,
		});
	});
	await user.click(submitButton);

	expect(createBlog.mock.calls).toHaveLength(2);
	expect(createBlog.mock.calls[1][0]).toEqual({
		title: 'testing a form...',
		author: 'John Doe',
		url: 'www.test.com',
	});
});
