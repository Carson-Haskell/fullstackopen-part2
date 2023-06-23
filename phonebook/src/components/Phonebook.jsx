import { useState, useEffect } from "react";
import personServices from "../services/personServices";

import Filter from "./Filter";
import NewPerson from "./NewPerson";
import People from "./People";
import Notification from "./Notification";

const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personServices.getAll().then(personData => setPersons(personData));
  }, []);

  // Create new person
  const addPerson = event => {
    event.preventDefault();

    if (newName === "" || newNumber === "") {
      alert("Name and Number must be provided");
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    // If person already exists, optionally update phone number
    const duplicate = persons.find(person => person.name === newName);

    if (duplicate) {
      updateNumber(duplicate, newPerson);

      return;
    }

    personServices.createPerson(newPerson).then(createdPerson => {
      setPersons([...persons, createdPerson]);

      // Briefly show successful creation notification
      alert(`Added ${createdPerson.name}`, "success");

      setNewName("");
      setNewNumber("");
    });
  };

  // Update phone number of preexisting user
  const updateNumber = (oldPerson, newPerson) => {
    const updateConfirmed = window.confirm(
      `${newName} is already added to phonebook, do you want to update their phone number?`
    );
    if (updateConfirmed) {
      personServices
        .update(oldPerson.id, newPerson)
        .then(updatedPerson => {
          setPersons(
            persons.map(person =>
              person.id !== updatedPerson.id ? person : updatedPerson
            )
          );

          // Briefly show successful update message
          alert(`Updated ${updatedPerson.name}`, "success");
        })
        .catch(_ => {
          alert(
            `Information of ${newPerson.name} has already been removed from the server`,
            "error"
          );
          personServices.getAll().then(peopleData => setPersons(peopleData));
        });

      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = id => {
    const person = persons.find(person => person.id === id);

    const deleteConfirmed = window.confirm(
      `Are you sure you want to delete ${person.name}?`
    );

    if (deleteConfirmed) {
      personServices
        .deletePerson(id)
        .then(_ => setPersons(persons.filter(person => person.id !== id)));

      // Briefly show successful creation notification
      alert(`Deleted ${person.name}`, "success");
    }
  };

  const alert = (content, type) => {
    setMessage({ content, type });
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  // Search for a person
  const filterByName = () => {
    const filtered = persons.filter(person => {
      const name = person.name.toLowerCase();
      return name.includes(filter.toLowerCase());
    });

    return filtered;
  };

  // Returns all if search input is undefined
  const filteredPeople = filterByName();

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />

      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add a new person</h2>
      <NewPerson
        handleSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <People people={filteredPeople} handleDelete={deletePerson} />
      <br />
    </div>
  );
};

export default Phonebook;
