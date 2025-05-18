import React, { useEffect, useState } from "react";
import "./../styles/App.css";
import {
  BrowserRouter,
  Link,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

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
      <h1>User Details</h1>
      <h3>
        Name: <span>{userData.name}</span>
      </h3>
      <h3>
        Username: <span>{userData.username}</span>
      </h3>
      <h3>
        Email: <span>{userData.email}</span>
      </h3>
      <h3>
        Phone: <span>{userData.phone}</span>
      </h3>
      <h3>
        Website: <span>{userData.website}</span>
      </h3>
    </>
  );
};

export default App;
