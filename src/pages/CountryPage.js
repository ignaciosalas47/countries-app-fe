// src/pages/CountryPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const getGraphData = (countryInfo) => ({
  labels: countryInfo.populationData.map((data) => data.year),
  datasets: [
    {
      label: 'Population Over Time',
      data: countryInfo.populationData.map((data) => data.value),
      borderColor: 'rgba(75,192,192,1)',
      fill: false,
    },
  ],
});

const CountryPage = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await axios.get(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_BACKEND_URL}/api/countries/${code}`
        );
        setCountry(response.data);

        if (response.data.populationData?.length > 0) {
          setGraphData(getGraphData(response.data));
        }
      } catch (error) {
        console.error('Error fetching country info:', error);
      }
    };

    setCountry(null);

    fetchCountryInfo();
  }, [code]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center">
        {country.flagUrl && (
          <img
            src={country.flagUrl}
            alt={`${country.countryInfo.commonName} flag`}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '100%',
              objectFit: 'cover',
              marginRight: '10px',
            }}
          />
        )}
        {country.countryInfo.commonName}
      </h1>
      <h2 className="text-left">Border Countries:</h2>
      <ul className="d-flex" style={{ gap: '10px' }}>
        {country.borders.map((borderCountry) => (
          <li key={borderCountry.commonName} style={{ listStyle: 'none' }}>
            <Link to={`/country/${borderCountry.countryCode}`}>
              {borderCountry.commonName}
            </Link>
          </li>
        ))}
      </ul>
      {graphData ? (
        <>
          <h2>Population Over Time</h2>
          <Line data={graphData} />
        </>
      ) : (
        <h2>No population data found</h2>
      )}
    </div>
  );
};

export default CountryPage;
