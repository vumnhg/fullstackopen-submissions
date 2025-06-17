import Person from "./Person";

const Contacts = ({ contacts, onDelete }) => {
  return (
    <>
      {contacts.map((person) => (
        <Person
          key={person.id}
          person={person}
          onDelete={() => onDelete(person.id)}
        />
      ))}
    </>
  );
};

export default Contacts;
