import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [current, setCurrent] = useState("");
  const [hourlyTime, setHourlyTime] = useState([]);
  const [hourlyTemperature, setHourlyTemperature] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m&hourly=temperature_2m&temperature_unit=fahrenheit"
        )
      ).json();

      setCurrent(data.current);
      setHourlyTime(data.hourly.time.slice(0, 5));
      setHourlyTemperature(data.hourly.temperature_2m.slice(0, 5));
    };

    dataFetch();
  }, []);
  return (
    <main>
      <h1>Current Weather</h1>
      <p>Time: {new Date(current.time).toLocaleString()}</p>
      <p>temperature: {current.temperature_2m} F</p>
      <div className="group">
        {hourlyTemperature.map((temp, index) => (
          <div key={index}>
            <p>{new Date(hourlyTime[index]).toLocaleString()}</p>
            <p>{temp} F</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
