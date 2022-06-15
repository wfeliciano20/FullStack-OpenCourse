import axios from 'axios';

const baseUrl = '/api/persons';
// const baseUrl = 'http://localhost:3001/api/persons';

const getPersons = async() => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (e) {
        console.error(e);
    }

}

const addPerson = async(person) => {
    try {
        const response = await axios.post(baseUrl, person);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

const updatePerson = async(id, person) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, person);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

const deletePerson = async(id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

const api = { getPersons, addPerson, updatePerson, deletePerson };
export default api;