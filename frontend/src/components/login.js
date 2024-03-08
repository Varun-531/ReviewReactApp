import "./login.css";
import { useRef, useState } from "react";
import RoomIcon from "@mui/icons-material/Room";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export default function Login({setShowLogin,mystorage,setCurrentUser}) {
  const [failure, setFailure] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
       await axios.post("/users/login", user);
      mystorage.setItem("user", nameRef.current.value); 
        setCurrentUser(nameRef.current.value);
        setShowLogin(false);
      setFailure(false);
    } catch (err) {
      setFailure(true);
    }
  };

  return (
    <div className="LoginContainer">
      <form onSubmit={handleSubmit}>
        <div className="logo">
          <RoomIcon /> LamaPin
        </div>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="LoginBtn">Login</button>
        
        {failure && <span className="failure">Something went wrong</span>}
      </form>
      <CloseIcon className="loginCancel" onClick={()=>setShowLogin(false)}/>
    </div>
  );
}
