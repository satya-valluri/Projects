import "./index.css";
import "axios";
import axios from "axios";
import { useState } from "react";

function App() {
  const [fileData, setFileData] = useState({});
  const selectFileHandler = (e) => {
    setFileData(e.target.files[0]);
  };
  const uploadHandler = (e) => {
    const formDat = new FormData();
    formDat.append("file", fileData);
    axios.post("http://localhost:3000/images/true", formDat).then(
      (result) => {
        console.log("success from server");
        console.log(result);
      },
      (reason) => {
        console.log("failure from server");
        console.log(reason);
      }
    );
    //console.log(e.target.files[0]);
  };

  return (
    <div className="App">
      <div className="title">Browse the profile photo</div>
      <div className="mainframe">
        <input type="file" name="Photo" onChange={selectFileHandler}></input>
        <button onClick={uploadHandler}>Upload</button>
      </div>
    </div>
  );
}

export default App;
