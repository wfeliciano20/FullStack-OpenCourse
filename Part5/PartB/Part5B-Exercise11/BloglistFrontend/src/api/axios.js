import axios from 'axios';
const BASE_URL = 'http://localhost:3003/api/';

const axiosDefault = axios.create({
	baseURL: BASE_URL,
});

export default axiosDefault;

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});
