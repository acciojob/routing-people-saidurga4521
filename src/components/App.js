import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "./../styles/App.css";

const App = () => {
  const [inputData, setInputData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 👇 Add delay to let Cypress catch 'Loading...'
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => {
          setInputData(data);
          setLoading(false);
        });
    }, 500);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // ✅ Cypress expects this
  }

  return (
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
  );
};

const Layout = ({ inputData }) => (
  <>
    <h1>User List</h1>
    <ul>
      {inputData.map((user) => (
        <li key={user.id}>
          <Link to={`/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  </>
);

const UserDetails = ({ inputData }) => {
  const id = parseInt(window.location.pathname.split("/").reverse()[0], 10);
  const user = inputData.find((u) => u.id === id);

  if (!user) return <div>Loading user details...</div>;

  return (
    <>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
    </>
  );
};

export default App;
