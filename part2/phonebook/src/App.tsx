import { useState } from 'react'

interface Person {
  name: string
}

const DisplayNumbers = ({ persons }: { persons: Person[] }) => {
  return (
    <ul>
      {persons.map(({ name }) => {
        return (
          <li key={name}>
            {name} <br />
          </li>
        )
      })
      }
    </ul>
  );
};

const AddNumberForm = ({ persons, setPersons }: { persons: Person[], setPersons: (persons: Person[]) => void }) => {
  const [newName, setNewName] = useState('');

  const handleSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (persons.map(({ name }) => name.toLowerCase()).includes(newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName }));
      event.target.reset();
      setNewName("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <div>
        name: <input onChange={handleInputChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>

  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);

  return (
    <div>
      <h2>Phonebook</h2>
      <AddNumberForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <DisplayNumbers persons={persons} />
    </div>
  );
};

export default App