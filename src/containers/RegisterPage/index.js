import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/Layout/UI/Card'
import {signup} from  '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
/**
* @author
* @function RegisterPage
**/

const RegisterPage = (props) => {
  
  const [firstname,setFirstName]=useState('');
  const [lastname,setLastName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const dispatch =useDispatch();
  const auth =useSelector(state=>state.auth)
  const registerUser = (e) => {
      
    e.preventDefault();

    const user={
      firstname,lastname,email,password
    }    
    dispatch(signup(user))
  }
  if(auth.authenticated){
    return <Redirect to={`/`}/>
  }
  
  return(
      <Layout>
        <div className='registerContainer'>
          <Card>
            <form onSubmit={registerUser}>
              <h3>Sign Up</h3>
            <input
               name='firstname'
                type="text"
                value={firstname}
                onChange={(e)=>setFirstName(e.target.value)}
                placeholder='Firstname'
                /> 
                  <input
               name='lastname'
                type="text"
                value={lastname}
                onChange={(e)=>setLastName(e.target.value)}
                placeholder='Lastname'
                /> 
            <input
                name='email'
                type="text"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder='Email'
                /> 
            <input
                name='password'
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder='Password'
             />   
             <div>
              <button>Sign Up</button>
              </div>
            </form>
            
          </Card>
        </div>
      </Layout>
   )

 }

export default RegisterPage