import React, { use, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Login = () => {
  const {store, actions} = useContext(Context)
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate()
  
  const handleEmail = (event) => {setEmail(event.target.value)}
  const handlePassword = (event) => {setPassword(event.target.value)};
  
  const handleReset = () => {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    actions.setAlert({text:'', background: 'primary', visible: false})  
    const dataToSend = {email,  password} 
    await actions.login(dataToSend)
    //actions.setIsLogged(true);
    //actions.setUser({ email })
    //actions.getTodos()
    if (store.isLogged){
      navigate('/');
    }
  }

  return (
    <div className="container">
      <h1 className="text-primary">Login</h1>
       <form onSubmit={handleSubmit} className="text-start">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            value={email} onChange={handleEmail} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"
            value={password} onChange={handlePassword} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button onClick={handleReset} type="reset" className="btn btn-secondary ms-2">Reset</button>
      </form>
    </div>
  )
}