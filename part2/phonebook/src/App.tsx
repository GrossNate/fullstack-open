import { useState } from 'react'

interface Person {
  name: string,
  phoneNumber: string
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
        {persons.filter(filterFunc).map(({ name, phoneNumber }) => {
          return (
            <tr key={name}>
              <td>
                {name}
              </td>
              <td>
                {phoneNumber}
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
      setPersons(persons.concat({ name: newName, phoneNumber: newPhone }));
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

const SearchWidget = ({ setSearchTerm }: { setSearchTerm: (searchTerm: string) => void }) => {
  return (
    <div>
      <input onChange={handleInputChange(setSearchTerm)} />
    </div>
  )
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '555-1212' }
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <h1>Phonebook</h1>
      filter: <SearchWidget searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h2>Add New</h2>
      <AddNumberForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <DisplayNumbers persons={persons} searchTerm={searchTerm} />
    </div>
  );
};

export default App