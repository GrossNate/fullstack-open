import { useState, useEffect } from 'react';
import Persons from './services/Persons';
import type { Person } from "./types/types"

const handleInputChange = (controller: React.Dispatch<React.SetStateAction<string>>) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => { controller(event.target.value) };
}

const handleDelete = (id: string, persons: Person[], setPersons: (persons: Person[]) => void) => {
  return () => {
    Persons.deletePerson(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
    });
  };
}

const DeleteButtonWidget = ({ id, persons, setPersons }: { id: string, persons: Person[], setPersons: (persons: Person[]) => void }) => {
  return (
    <button onClick={handleDelete(id, persons, setPersons)}>🗑️</button>
  )
}

const DisplayNumbers = ({ persons, setPersons, searchTerm }: { persons: Person[], setPersons: (persons: Person[]) => void, searchTerm: string }) => {
  const filterFunc = (person: Person): boolean =>
    searchTerm === '' || RegExp(searchTerm, "i").test(person.name);

  return (
    <table>
      <tbody>
        {persons.filter(filterFunc).map(({ name, number, id }) => {
          return (
            <tr key={id}>
              <td>
                {name}
              </td>
              <td>
                {number}
              </td>
              <td>
                <DeleteButtonWidget id={id} persons={persons} setPersons={setPersons} />
              </td>
            </tr>
          )
        })
        }
      </tbody>
    </table>
  );
};

const AddNumberForm = ({ persons, setPersons }: { persons: Person[], setPersons: (persons: Person[]) => void }) => {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (persons.map(({ name }) => name.toLowerCase()).includes(newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson: Omit<Person, "id"> = { name: newName, number: newPhone };
      Persons
        .create(newPerson)
        .then(person => {
          if ("error" in person) {
            alert(person.error);
          } else {
            setPersons(persons.concat(person));
            event.target.reset();
            setNewName("");
            setNewPhone("");
          }
        })
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div>
        name: <input onChange={handleInputChange(setNewName)} />
      </div>
      <div>
        phone: <input onChange={handleInputChange(setNewPhone)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>

  );
};

const SearchWidget = ({ setSearchTerm }: { setSearchTerm: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <div>
      <input onChange={handleInputChange(setSearchTerm)} />
    </div>
  )
};

const App = () => {
  const [persons, setPersons] = useState([] as Person[]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(
    () => {
      Persons.getAll().then(response => setPersons(response))
    },
    []);

  return (
    <div>
      <h1>Phonebook</h1>
      filter: <SearchWidget setSearchTerm={setSearchTerm} />
      <h2>Add New</h2>
      <AddNumberForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <DisplayNumbers persons={persons} setPersons={setPersons} searchTerm={searchTerm} />
    </div>
  );
};

export default App