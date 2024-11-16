import { useState } from 'react'

interface Person {
  name: string,
  phoneNumber: string
}

const DisplayNumbers = ({ persons }: { persons: Person[] }) => {
  return (
    <table>
    <tbody>
      {persons.map(({ name, phoneNumber }) => {
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

  const handleInputChange = (controller: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {controller(event.target.value)};
  }

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '555-1212' }
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