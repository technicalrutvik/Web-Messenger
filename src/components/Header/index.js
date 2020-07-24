import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../../actions';
/**
* @author
* @function Header
**/

const Header = (props) => {

  const auth=useSelector(state=>state.auth);
  const dispatch =useDispatch();
  const logout = () =>{
    dispatch(logoutAction(auth.uid))
  }


  return(
       
            <header className="header">
            <div style={{display: 'flex'}}>
              <div className="logo">Web Messenger</div>
              

              {
                !auth.authenticated ? 

                <ul className="leftMenu">
                <li><NavLink to={'/login'}>Login</NavLink></li>
                <li><NavLink to={'/signup'}>Sign up</NavLink></li>
                </ul> : null

              }

               
            </div>
            <div style={{margin: '20px 0', color: '#fff', fontWeight: 'bold'}}>{auth.authenticated ? `Hi ${auth.firstname }  ${auth.lastname}` : ''}</div>
            <ul className="menu">

                {
                  auth.authenticated ?  
                  <li>
                  <Link to={'#'} onClick={logout}>Logout</Link>
                  </li> : null
                }

                   
            </ul>
        </header>
    )

 }

export default Header