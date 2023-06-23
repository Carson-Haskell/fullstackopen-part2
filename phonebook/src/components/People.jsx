import Person from "./Person";

const People = ({ people, handleDelete }) => {
  return (
    <ul>
      {people.map(person => (
        <Person
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default People;
