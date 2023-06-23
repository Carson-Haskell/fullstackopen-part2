import Part from "./Part";

const Content = ({ courseSections }) => {
  const totalExercises = courseSections.reduce(
    (total, section) => (total += section.exercises),
    0
  );

  return (
    <>
      {courseSections.map(section => (
        <Part key={section.id} section={section} />
      ))}
      <p>
        <strong>Total of {totalExercises} exercises</strong>
      </p>
    </>
  );
};

export default Content;
