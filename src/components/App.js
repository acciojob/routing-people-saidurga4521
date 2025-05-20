import React, { useEffect, useState } from "react";
import "./../styles/App.css";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

const App = () => {
  const [inputData, setInputData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setInputData(data));
  }, []);

  return (
    <div>
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
    </div>
  );
};

const Layout = ({ inputData }) => {
  return (
    <ul>
      {inputData.map((details) => (
        <li key={details.id}>
          <Link to={`/${details.id}`}>{details.name}</Link>
        </li>
      ))}
    </ul>
  );
};

const UserDetails = ({ inputData }) => {
  const id = parseInt(window.location.pathname.split("/").reverse()[0], 10);
  const userData = inputData.find((item) => item.id === id);

  return (
    <>
      <h1>User List</h1>
      <p>
        <strong> Name</strong>: <span>{userData.name}</span>
      </p>
      <p>
        <strong>UserName</strong>:<span>{userData.username}</span>
      </p>
      <p>
        <strong>Email</strong>:<span>{userData.email}</span>
      </p>
      <p>
        <strong>Phone</strong>:<span>{userData.phone}</span>
      </p>
      <p>
        <strong>Website</strong>:<span>{userData.website}</span>
      </p>
    </>
  );
};
export default App;
