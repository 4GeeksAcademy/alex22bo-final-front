import React, { use, useContext, useState } from "react";  // 1 importar react y hooks
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";


// 5 y 2
export const Login = () => {
  const {store, actions} = useContext(Context)
  const navigate = useNavigate()

  // 3.1 Defino los estados
  const [email, setEmail] = useState('');
  const [ name, setName ] = useState('');
  const [password, setPassword] = useState('');
  const [example, setExample] = useState('');
  const [select, setSelect] = useState('1')
  const [checkMe, setCheckMe] = useState(false);
  
  const handleEmail = (event) => {
    // console.log(event)
    // console.log(event.target)
    // console.log(event.target.value)
    setEmail(event.target.value)
  }
  const handleName = (event) => { setName(event.target.value) };
  const handlePassword = (event) => { setPassword(event.target.value) };
  const handleCheckMe = (event) => { setCheckMe(event.target.checked) };
  const handleExample = (event) => { setExample(event.target.value) };
  const handleSelect = (event) => { setSelect(event.target.value)};

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setExample('');
    setSelect('1');
    setCheckMe(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();  // 1.- Siempre primera línea de un submit
    /* const dataToSend = {
      email: email,
      password: password,
      description: example,
      country: select,
      accept: checkMe
    } */
    const dataToSend = {email, password, description: example}
    // lógica que debería lanzar el formulario
    //     talvez redirigir a error o dasboard 
    console.log(dataToSend);
    
    /* Forma INCORRECTA de cambiar el valor de una clave del store 
    store.isLogged = true
    */
   /* Forma correcta de cambiar el valor de una clave del store */
   actions.setIsLogged(true);
   navigate('/');
   // ejecutar el actions que cambie el valor de store.user
   actions.setUser({
    email,
    lastname: select
   })
   actions.getTodos()
   
   

  }

  
  // 4
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
          <label htmlFor="exampleInputName" className="form-label">User name</label>
          <input type="text" className="form-control" id="exampleInputName" aria-describedby="namelHelp"
            value={name} onChange={handleName} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"
            value={password} onChange={handlePassword} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
            value={example} onChange={handleExample}>

          </textarea>
        </div>

        <select className="form-select" aria-label="Default select example"
          value={select} onChange={handleSelect}>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="sp">Spain</option>
          <option value="uk">United Kindom</option>
          <option value="us">United States</option>
        </select>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"
            checked={checkMe} onChange={handleCheckMe} />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <button onClick={handleReset} type="reset" className="btn btn-secondary ms-2">Reset</button>
      </form>
    </div>
  )
}

// 7 y 6