import axiosDefault from '../api/axios';
import usePrivateAxios from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
const baseUrl = '/blogs';

const useBlogService = () => {
	const axios = usePrivateAxios();
	const { auth } = useAuth();
	let token = `Bearer ${auth.accessToken}`;

	const setToken = (newToken) => {
		token = `Bearer ${newToken}`;
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

	return [getAll, create, update, deleteBlog, setToken];
};

export default useBlogService;
