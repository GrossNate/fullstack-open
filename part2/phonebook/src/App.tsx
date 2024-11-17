import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Person {
  name: string,
  number: string,
  id: string
}

const handleInputChange = (controller: React.Dispatch<React.SetStateAction<string>>) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => { controller(event.target.value) };
}

const DisplayNumbers = ({ persons, searchTerm }: { persons: Person[], searchTerm: string }) => {
  const filterFunc = (person: Person): boolean => 
    searchTerm === '' || RegExp(searchTerm, "i").test(person.name);

  return (
    <table>
      <tbody>
        {persons.filter(filterFunc).map(({ name, number: number }) => {
          return (
            <tr key={name}>
              <td>
                {name}
              </td>
              <td>
                {number}
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
      setPersons(persons.concat({ name: newName, number: newPhone, id: uuidv4() }));
      event.target.reset();
      setNewName("");
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

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data);
      })
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      filter: <SearchWidget setSearchTerm={setSearchTerm} />
      <h2>Add New</h2>
      <AddNumberForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <DisplayNumbers persons={persons} searchTerm={searchTerm} />
    </div>
  );
};

export default App