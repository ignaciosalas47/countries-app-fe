// src/pages/CountryPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

function CountryPage() {
  const { code } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/countries`
        );
        setCountryInfo(response.data);
      } catch (error) {
        console.error("Error fetching country info:", error);
      }
    };

    fetchCountryInfo();
  }, [code]);

  if (!countryInfo) {
    return <div>Loading...</div>;
  }

  const populationData = {
    labels: countryInfo.populationData.map((data) => data.year),
    datasets: [
      {
        label: "Population Over Time",
        data: countryInfo.populationData.map((data) => data.value),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h1>{countryInfo.name}</h1>
      <img
        src={countryInfo.flagUrl}
        alt={`${countryInfo.name} flag`}
        style={{ width: "200px" }}
      />
      <h2>Border Countries:</h2>
      <ul>
        {countryInfo.borders.map((borderCountry) => (
          <li key={borderCountry}>
            <Link to={`/country/${borderCountry}`}>{borderCountry}</Link>
          </li>
        ))}
      </ul>
      <h2>Population Over Time</h2>
      <Line data={populationData} />
    </div>
  );
}

export default CountryPage;
