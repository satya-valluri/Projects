import axios from "axios";

function App() {
  async function Login() {
    let res = await axios.post("http://localhost:3001/login");
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
      <header>Hi</header>
      <button onClick={Login}>Click</button>
    </div>
  );
}

export default App;
