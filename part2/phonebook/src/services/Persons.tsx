import axios from 'axios';
import type {Person} from "./types/types"

const baseUrl = 'http://localhost:3001/persons';

const Persons = {
  getAll: () => {
    return axios
      .get(baseUrl)
      .then(response => response.data);
  },
  create: (newPerson: Omit<Person, "id">) => {
    return axios
      .post(baseUrl, newPerson)
      .then(response => response.data);
  },
  deletePerson: (id: string) => {
    return axios
      .delete(`${baseUrl}/${id}`)
      .then(response => response.data)
  }
};

export default Persons;