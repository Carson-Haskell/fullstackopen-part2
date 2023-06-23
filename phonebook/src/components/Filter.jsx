const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      Search by name:
      <input value={filter} onChange={event => setFilter(event.target.value)} />
    </div>
  );
};

export default Filter;
