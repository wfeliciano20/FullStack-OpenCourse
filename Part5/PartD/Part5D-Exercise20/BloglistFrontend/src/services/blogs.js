import { axiosPrivate as axios } from '../api/axios';
import axiosDefault from '../api/axios';
const baseUrl = '/blogs';

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = () => {
	const request = axiosDefault.get(baseUrl);
	return request.then((response) => response.data);
};

const create = async (newBlog) => {
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.post(baseUrl, newBlog, config);
	return response.data;
};

const update = async (id, newObject) => {
	const config = {
		headers: { Authorization: token },
	};
	const request = await axios.put(`${baseUrl}/${id}`, newObject, config);
	return request.data;
};

const deleteBlog = async (id) => {
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.delete(`${baseUrl}/${id}`, config);
	return response.data;
};

export default { getAll, create, update, deleteBlog, setToken };
