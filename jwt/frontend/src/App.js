import axios from "axios";

function App() {
  async function Login() {
    let res = await axios.post("http://localhost:3001/login", {
      name: "satya",
      email: "prakash4455@gmail.com",
      password: "password1",
    });
    console.log(res);
    // axios({
    //   method: "POST",
    //   url: "http://localhost:3001/login",
    // }).then((res) => {
    //   console.log("------Response from server Below-------");
    //   console.log(res);
    // });
  }

  return (
    <div>
      <header>Enter User Details:</header>
      <label>Name : </label>
      <br />
      {/* <input onChange={nameChanged}></input> */}
      <button onClick={Login}>Click</button>
    </div>
  );
}

export default App;
