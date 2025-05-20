import React, { useEffect, useState } from "react";
import "./../styles/App.css";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

const App = () => {
  const [inputData, setInputData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setInputData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <BrowserRouter>
          <>
            <Layout inputData={inputData} />
            <Switch>
              <Route path="/:id">
                <UserDetails inputData={inputData} />
              </Route>
            </Switch>
          </>
        </BrowserRouter>
      )}
    </div>
  );
};

const Layout = ({ inputData }) => {
  return (
    <>
      <h1>User List</h1>
      <ul>
        {inputData.map((details) => (
          <li key={details.id}>
            <Link to={`/${details.id}`}>{details.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const UserDetails = ({ inputData }) => {
  const id = parseInt(window.location.pathname.split("/").reverse()[0], 10);
  const userData = inputData.find((item) => item.id === id);

  if (!userData) {
    return <p>Loading user details...</p>;
  }

  return (
    <>
      <p>Name: {userData.name}</p>
      <p>UserName: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Phone: {userData.phone}</p>
      <p>Website: {userData.website}</p>
    </>
  );
};

export default App;
