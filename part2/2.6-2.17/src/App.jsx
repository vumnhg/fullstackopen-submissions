import { useEffect, useState } from "react";
import Filter from "./Filter";
import Form from "./Form";
import Contacts from "./Contacts";
import db from "./services/db";
import "./App.css";
import Notification from "./Notiffication";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    db.get()
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  const handleNotification = ({ message, type }) => {
    setNotification({
      message,
      type,
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleAddContact = (event) => {
    event.preventDefault();
    if (!newName.trim()) return;

    const isExist = persons.some(
      (person) => person.name.toLowerCase() === newName.trim().toLowerCase()
    );

    if (isExist) {
      const sure = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (!sure) return;

      const existingContact = persons.find(
        (person) => person.name.toLowerCase() === newName.trim().toLowerCase()
      );
      db.update(existingContact.id, {
        ...existingContact,
        number: newNumber.trim(),
      })
        .then((updatedContact) => {
          setPersons((prev) =>
            prev.map((person) =>
              person.id === updatedContact.id ? updatedContact : person
            )
          );
          handleNotification({
            message: `Added ${updatedContact.name}`,
            type: "success",
          });
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Failed to update contact:", error);
          handleNotification({
            message: `Information of ${existingContact.name} has already been removed from server`,
            type: "error",
          });
        });

      return;
    }

    const newContact = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    db.post(newContact)
      .then((savedContact) => {
        setPersons((prev) => [...prev, savedContact]);
        setNewName("");
        setNewNumber("");
        handleNotification({
          message: `Added ${savedContact.name}`,
          type: "success",
        });
      })
      .catch((error) => {
        console.error("Failed to add contact:", error);
      });
  };

  const filteredContacts = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter.trim().toLowerCase())
  );

  const handleDelete = (id) => {
    const contactToDelete = persons.find((person) => person.id === id);
    if (!window.confirm(`Delete ${contactToDelete.name}?`)) {
      return;
    }
    db.remove(id)
      .then(() => {
        setPersons((prev) => prev.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.error("Failed to delete contact:", error);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter name={nameFilter} onChange={setNameFilter} />
      <h2>add a new</h2>
      <Form
        name={newName}
        num={newNumber}
        onNameChange={setNewName}
        onNumChange={setNewNumber}
        onSubmit={handleAddContact}
      />
      <h2>Numbers</h2>
      <Contacts contacts={filteredContacts} onDelete={handleDelete} />
    </div>
  );
};

export default App;
