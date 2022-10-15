import React, {useEffect, useState} from 'react';
import $ from 'jquery'
import { io } from 'socket.io-client'
import { useNavigate, useParams } from 'react-router-dom';


function Verify ()
{

      const [ code, setcode ] = useState( '' )
      const { id } = useParams()
      const navigate = useNavigate()
      const handle_code = ( e ) =>
      {
            e.preventDefault();

            if ( code === "" )
            {
                  alert( "Enter the code sent to your email." );
            }
            else if ( code.length < 6 )
            {
                  alert( "It looks like you didn't receive the code. your code length must be 6" );
            }
            else
            {

                  function randomcodes ( passwordLength )
                  {
                        var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                        var ramdontoken = "";
                        for ( var i = 1; i <= passwordLength; i++ )
                        {
                              var randomNumber = Math.floor( Math.random() * chars.length );
                              ramdontoken += chars.substring( randomNumber, randomNumber + 1 );
                        }
                        return ramdontoken;
                  };

                  let click_me = document.querySelector( "#clickme" );
                  click_me.setAttribute( "disabled", "disabled" );
                  click_me.innerHTML = "Please wait...";
                  $.ajax( {
                        method: "POST",
                        url: "http://192.168.1.19:3001/verify_code",
                        data: {
                              code: code,
                              helper: id,
                              changes: randomcodes( 6 ),
                              vurl: randomcodes( 10 )
                        },
                        success: function ( data )
                        {
                              if ( data === "success" )
                              { 
                                    navigate( "../" )
                                    setTimeout( () =>
                                    { 
                                     window.location.reload()      
                                    }, 1000)
                              }
                              else
                              { 
                                    alert(data)
                              }
                        }
                  } );
                  
            }
      };

      const handleresend = () =>
      {
            let click_me = document.querySelector( ".click_me" );
            
            click_me.style.display = "none";

            function randomcodes ( passwordLength )
            {
                  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                  var ramdontoken = "";
                  for ( var i = 1; i <= passwordLength; i++ )
                  {
                        var randomNumber = Math.floor( Math.random() * chars.length );
                        ramdontoken += chars.substring( randomNumber, randomNumber + 1 );
                  }
                  return ramdontoken;
            };


            $.ajax( {
                  method: "POST",
                  url: "http://192.168.1.19:3001/resend_code",
                  data: {
                        helper: id,
                        changes: randomcodes( 6 ),
                        vurl: randomcodes(10)
                  },
                  success: function ( data )
                  {
                        if ( data.success === "success" )
                        {
                             
                              $.ajax( {
                                    method: "POST",
                                    url: "https://otp.badzybaddest.repl.co/sms.php",
                                    data: {
                                          emails: data.email,
                                          fnames: data.fname,
                                          checkin: 1,
                                          codes: data.code
                                    },
                                    success: function ( mydata )
                                    {
                                          if ( mydata === "success" )
                                          {
                                                alert( "A new code has been sent to your email." )
                                                 click_me.style.display = "block";
                                          }
                                         
                                    }
                              } );
                        }
                        else
                        { 
                              alert(data)
                        }
                  }
            } );
          
            
      };

      return (
            <div className='vvv'>
                  <title>Verify ~ Eagle</title>
                  <div className="item_conta">
                        <img src="https://www.vippng.com/png/full/442-4424935_eagle-blue-eagles-logo-png.png" alt="" />
                        <h3>Check Your Email</h3>
                        <p>We sent you a verification code</p>
                        <form onSubmit={ handle_code } action="">
                              <input onChange={ e => setcode( e.target.value ) } placeholder='Enter Code...' maxLength={ 6 } type="text" name="" id="" />
                              <button id='clickme' className="btn btn-primary w-100 p-2 mt-2 mb-4">Send</button>
                              <hr />
                        </form>
                        <div onClick={ handleresend } className="click_me">
                              Didn't get code? resend
                        </div>
                  </div>
            </div>
      );
}

export default Verify;
