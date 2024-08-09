//import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () =>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout =()=>{
        //console.warn('apple')
        localStorage.clear('user');
        navigate('/signup')
    }
    return(
    <div>
        <img 
        alt='logo'
        className='logo' 
        src='https://www.creativefabrica.com/wp-content/uploads/2019/01/BlockChain-Logo-by-ashmbuhdsgn-580x386.png'/>
       {auth  ?  <ul className='nav-ul'>
              <li><Link to="/">Products</Link></li>  
              <li><Link to="/add">Add Products</Link></li>  
              <li><Link to="/update">Update Product</Link></li>       
              <li><Link to="/profile">Profile</Link></li>  
              <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
              
            

          </ul> 
          :       
          <ul className='nav-ul nav-right'>
                 <li> <Link to="/signup">Sign Up</Link></li> 
                 <li><Link to="/login">Login</Link></li>
          </ul>
}
    </div>
    );
}

export default Nav;