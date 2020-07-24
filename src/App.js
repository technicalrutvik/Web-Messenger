import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedInUser} from  '../src/actions';

function App() {

  const dispatch=useDispatch();
  const auth = useSelector(state=>state.auth)

  useEffect(()=>{
      if(!auth.authenticated){
        dispatch(isLoggedInUser())
      }
  },[])



  return (
    <div className="App">
    <Router>
      {/* Only loggin user can access */}
      <PrivateRoute path='/' exact component={HomePage}/>

      <Route path='/login'  component={LoginPage} />
      <Route path='/signup' component={RegisterPage}/>
    </Router>
    </div>
  );
}

export default App;
