import React, { useContext, useState } from 'react'
import { loginUser } from '../utils/ApiFunctions';
import { Link, useNavigate } from 'react-router-dom';
import  { AuthContext } from './AuthProvider';

const Login = () => {
    const [errorMessage, setErrorMessage]= useState("");
    const [login, setLogin]= useState({
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const {handleLogin} = useContext(AuthContext)
    const handleInputChange = (event)=>{
        setLogin({...login,[event.target.name] : event.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const success=await loginUser(login)
        if (success){
            handleLogin(success)
            navigate("/")
        }else{
            setErrorMessage("Invalid username or password")
        }
        setTimeout(()=>{
            setErrorMessage("")
        },3500)
    }
  return (
    <section className='container col-6 md-5 mb-5'>
        {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
        <h2>
            Login
        </h2>
        <form onSubmit={handleLogin}>
            <div className='row mb-3'>
                <label htmlFor='email' className='col-sm-2 col-form-label'>Email</label>
                <div>
                    <input type="text"
                     name="email"
                     id="email"
                     className='form-control'
                     value={login.email}
                     onChange={handleInputChange} />
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor='password' className='col-sm-2 col-form-label'>Password</label>
                <div>
                    <input type="text"
                     name="password"
                     id="password"
                     className='form-control'
                     value={login.password}
                     onChange={handleInputChange} />
                </div>
            </div>
            <div className='mb-3'>
                <button onClick={handleSubmit} type='submit'
                 className='btn btn-hotel'
                 style={{marginRight : "10px"}}>
                    Login
                </button>
                <span style={{marginLeft: "10px"}}>
                    Don't have an account yet?<Link to={"/register"}>Register</Link>
                </span>
            </div>
        </form>
    </section>
  )
}

export default Login