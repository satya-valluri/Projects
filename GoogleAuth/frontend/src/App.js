import "./App.css";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import axios from "axios";

function App() {
  function responseSuccessGoogle(res) {
    console.log(res.tokenId);
    axios({
      method: "POST",
      url: "http://localhost:8000/login",
      data: { tokenId: res.tokenId },
    }).then((res) => {
      console.log("------Response from server Below-------");
      console.log(res);
    });
    //profileObj:
  }

  function responseFailureGoogle(err) {
    console.log(err);
  }

  return (
    <div className="App">
      <GoogleLogin
        clientId="393444161581-866s6mmqcc0jq5sgmrj215b2rs5qf8d2.apps.googleusercontent.com"
        buttonText="Login With Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseFailureGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default App;
