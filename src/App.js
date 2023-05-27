import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);

  // Fetch data from MongoDB
  useEffect(() => {
    axios
      .get('/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new data object
    const newData = {
      name: name,
      email: email,
    };

    // Save data to MongoDB
    axios
      .post('/api/data', newData)
      .then(() => {
        // Clear input fields
        setName('');
        setEmail('');

        // Fetch updated data from MongoDB
        axios
          .get('/api/data')
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <h1>React MongoDB App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      <h2>Data</h2>
      {data.map((item) => (
        <div key={item._id}>
          <p>Name: {item.name}</p>
          <p>Email: {item.email}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
