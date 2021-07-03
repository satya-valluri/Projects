import axios from "axios";
import { useState } from "react";

function App() {
  let [token, setToken] = useState("");
  let [username, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let [dbusername, setDbUsername] = useState("");
  let [item, setItem] = useState("");
  let [dbitems, setDbitems] = useState([]);

  async function Register() {
    try {
      const options = {
        method: "POST",
        //headers: { "x-auth-token": token },
        url: "http://localhost:3001/register",
        data: {
          name: "satya",
          email: username,
          password,
        },
      };
      let res = await axios(options);
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data); // The json sent as part of the response in server will be printed here
    }
  }

  async function Login() {
    try {
      let res = await axios.post("http://localhost:3001/login", {
        email: username,
        password,
      });
      console.log(res.data); // what ever you pass as json will be part of data ??
      setToken(res.data.token);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function getItems() {
    if (!token) return;
    try {
      const options = {
        method: "GET",
        headers: { "x-auth-token": token },
        url: "http://localhost:3001/items",
      };
      let res = await axios(options);
      console.log(res.data);
      setDbUsername(res.data.email);
      console.log(res.data.email);
      setDbitems(res.data.items);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function setItems() {
    if (!item || !token) return;
    try {
      const options = {
        method: "POST",
        headers: { "x-auth-token": token },
        url: "http://localhost:3001/items",
        data: { item },
      };
      let res = await axios(options);
      console.log(res.data);
      setDbitems([...res.data.items]);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <div>
      <div>
        <br />
        <label>User Name</label>
        <input
          value={username}
          onChange={function (e) {
            setUserName(e.target.value);
          }}
        ></input>
        <br />
        <label>Password</label>
        <input
          value={password}
          onChange={function (e) {
            setPassword(e.target.value);
          }}
        ></input>
        <br />
        <button onClick={Login}>Login</button>
        <button onClick={Register}>Register</button>
      </div>
      <label>Token : </label>
      <input
        value={token}
        onChange={function (e) {
          setToken(e.target.value);
        }}
      ></input>
      <br />
      <br />
      <div>
        <p>Add and View Items </p>
        <br />
        <div>
          <label>Add Items</label>
          <input value={item} onChange={(e) => setItem(e.target.value)}></input>
          <button onClick={setItems}>Save to Database</button>
        </div>
        <br />
        <div>
          <div>
            <label>Viewing items for {dbusername}</label>
          </div>
          Get Items and Show
          <button onClick={getItems}>Fetch Items from Database</button>
          <ul>
            {dbitems.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      </div>
      <br />
    </div>
  );
}

export default App;

// axios({
//   method: "POST",
//   url: "http://localhost:3001/login",
// }).then((res) => {
//   console.log("------Response from server Below-------");
//   console.log(res);
// });

// async function getItems() {
//   try {
//     let res = await axios.get(
//       "http://localhost:3001/items",
//       {},
//       { headers: { "x-auth-token": val } }
//     );
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// }
