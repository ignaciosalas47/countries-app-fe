// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_BACKEND_URL}/api/countries`
        );
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Available Countries</h1>
      <div className="row">
        {countries.map((country) => (
          <div key={country.name} className=" col-12 col-sm-6 col-lg-3 ">
            <div className="alert alert-light">
              <Link to={`/country/${country.countryCode}`}>{country.name}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
