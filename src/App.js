import React, {useState, useEffect} from 'react';
import './App.css';
import Routing from './Routing';
import {HashRouter} from 'react-router-dom'
import Nav from './Home/Nav';
import DeviceDetector from "device-detector-js";

function App ()
{
  let [a, seta] = useState([])
  
  useEffect( () =>
  {

    const deviceDetector = new DeviceDetector();
    const useragent = navigator.userAgent;
    const device = deviceDetector.parse( useragent );

    if ( device.os.name !== "Windows" )
    { 
      let ar = [
        { 
          set: false,
          trues: 1
        }
      ]
      seta(ar)
    }
    else
    { 
       let ar = [
        { 
          set: true,
          trues: 1
        }
      ]
      seta(ar)
    }
  
  }, [] );

  return (
    <>
      {
        a.map( (val, vval) =>
        { 
          if ( val.set === false )
          { 
            return ( 
              <div onContextMenu={e => e.preventDefault()} key={vval}>
                <div className="center_img">
                   Hi, This website can only be accessed on windows computers.
               </div>
              </div>
            )
          }
          else
          { 
            return (
              <HashRouter key={vval}>
                <Nav />
                <Routing />
              </HashRouter>
            );
          }
        })
      }
      
    </>
  );
}

export default App;
