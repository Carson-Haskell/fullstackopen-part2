const Weather = ({ report }) => {
  return (
    <>
      <p>Temperature: {report.main.temp}</p>
      <img
        src={`https://openweathermap.org/img/wn/${report.weather[0].icon}@2x.png`}
        alt={report.weather[0].description}
      />
      <p>Wind: {report.wind.speed} m/s</p>
    </>
  );
};

export default Weather;
