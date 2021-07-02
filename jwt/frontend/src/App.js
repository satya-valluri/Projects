import axios from "axios";
import { useState } from "react";

function App() {
  let [token, setToken] = useState("");
  let [username, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let [dbusername, setDbUsername] = useState("");
  let [item, setItem] = useState("");

  async function Register() {
    try {
      let res = await axios.post("http://localhost:3001/register", {
        name: "satya",
        //email: "prakash4455@gmail.com",
        //        password: "password1",
        email: username,
        password,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function Login() {
    try {
      let res = await axios.post("http://localhost:3001/login", {
        email: username,
        password,
      });
      console.log("login information - printing token below + updating UI");
      console.log(res.data.token);
      setToken(res.data.token);
    } catch (error) {
      console.log(error);
    }
  }

  async function getItems() {
    try {
      const options = {
        method: "GET",
        headers: { "x-auth-token": token },
        url: "http://localhost:3001/items",
      };
      let res = await axios(options);
      //setDbUsername(data.email);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  async function setItems() {
    try {
      const options = {
        method: "POST",
        headers: { "x-auth-token": token },
        url: "http://localhost:3001/items",
        data: { item },
      };
      let res = await axios(options);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button onClick={Register}>Register</button>
      <br />
      <br />

      <div>
        <button onClick={Login}>Login</button>
        <label>User Name</label>
        <input
          value={username}
          onChange={function (e) {
            setUserName(e.target.value);
          }}
        ></input>
        <label>Password</label>
        <input
          value={password}
          onChange={function (e) {
            setPassword(e.target.value);
          }}
        ></input>
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
        <label>{dbusername}</label>
        <br />
        <div>
          <label>Add Items</label>
          <input value={item} onChange={(e) => setItem(e.target.value)}></input>
          <button onClick={setItems}>Set Items</button>
        </div>
        <button onClick={getItems}>Get Items</button>
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
