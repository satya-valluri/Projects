import axios from "axios";

function App() {
  function Login() {
    axios.post("http://localhost:3001/login");
  }

  return (
    <div>
      <header>Hi</header>
      <button onClick={Login}>Click</button>
    </div>
  );
}

export default App;
