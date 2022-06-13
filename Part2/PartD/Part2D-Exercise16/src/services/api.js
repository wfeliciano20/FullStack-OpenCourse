import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getPersons = async() => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const addPerson = async(person) => {
    const response = await axios.post(baseUrl, person);
    return response.data;
}

const updatePerson = async(id, person) => {
    const response = await axios.put(`${baseUrl}/${id}`, person);
    return response.data;
}

const deletePerson = async(id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
}

export default { getPersons, addPerson, updatePerson, deletePerson };