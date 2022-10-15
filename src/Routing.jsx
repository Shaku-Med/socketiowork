import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Auth from './Auth/Auth';
import Home from './Home/Home';
import Verify from './Home/Verify';


function Routing ()
{
      return (
            <>
                  <Routes>
                        <Route path='/' element={ <Home /> } />
                        <Route path='/Verify/:id' element={ <Verify /> } />
                        <Route path='/Auth' element={ <Auth /> } />
                  </Routes>
            </>
      );
}

export default Routing;
