import Country from "./Country";

const Countries = ({ getCountry, countries }) => {
  if (countries.length > 1) {
    return (
      <>
        {countries.map(country => (
          <div key={country.name.official}>
            <p>{country.name.common}</p>
            <button onClick={() => getCountry(country.name.official)}>
              Show
            </button>
          </div>
        ))}
      </>
    );
  }

  return <Country country={countries[0]} />;
};

export default Countries;
