import { axiosPrivate } from '../api/axios';
const baseUrl = '/login';

const login = async (credentials) => {
	const response = await axiosPrivate.post(baseUrl, credentials);
	return response.data;
};

export default { login };
