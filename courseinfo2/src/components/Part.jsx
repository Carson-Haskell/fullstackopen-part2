const Part = ({ section }) => {
  return (
    <p>
      {section.name}: {section.exercises}
    </p>
  );
};

export default Part;
