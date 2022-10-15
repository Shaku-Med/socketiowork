import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { io } from 'socket.io-client';
import DeviceDetector from "device-detector-js";
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

function Auth ()
{

      const [ user_info, set_user_info ] = useState( [] );
      const [ sesuser, sessionusers ] = useState( [] );
      const [ yearbath, setybath ] = useState( '' );
      const [ csrf, setcsrf ] = useState( "" );
      let navigate = useNavigate();

      let [ quest, setquests ] = useState( [] );

      let [ otherusr, setothusr ] = useState( [] );


      //Regixs...

      let emailreg = /.+@(gmail|yahoo)\.com$/;
      let passreg = /^(?=.*[0-9])(?=.*[!@?#$%&*])[a-zA-Z0-9!@?#$%&*]{8,15}$/;
      let namereg = /^[a-zA-Z ]{2,30}$/;

      //End of regixs

      //Sign in function_ready_to_lead
      const [ sfname, setsfname ] = useState( '' );
      const [ slname, setslname ] = useState( '' );
      const [ semail, setsemail ] = useState( '' );
      const [ spass, setspass ] = useState( '' );
      const [ squest, setsquest ] = useState( "My Dad's name is?" );
      const [ squans, setsquans ] = useState( "" );

      //Sign UP part Ends...

      //error 
      const [ errors, seterrors ] = useState( '' );

      //Login Part Starts...
      const [ email, setemail ] = useState( '' );
      const [ pass, setpass ] = useState( '' );
      //Login part Ends...


      useEffect( () =>
      {

            var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var passwordLength = 12;
            var ramdontoken = "";

            for ( var i = 0; i <= passwordLength; i++ )
            {
                  var randomNumber = Math.floor( Math.random() * chars.length );
                  ramdontoken += chars.substring( randomNumber, randomNumber + 1 );
            }

            $.ajax( {
                  method: 'POST',
                  url: 'http://192.168.1.19:3001/csrf_api',
                  data: {
                        token: ramdontoken
                  },
                  success: function ( data )
                  {
                        setcsrf( data.name );
                  }
            } );
      }, [] );


      useEffect( () =>
      {
            if ( Cookie.get( "othersess" ) )
            {
                  if ( Cookie.get( "othersess" ) !== null )
                  {

                        $.ajax( {
                              method: "POST",
                              url: "http://192.168.1.19:3001/grab_data",
                              data: {
                                    session: Cookie.get( "othersess" )
                              },
                              success: function ( data )
                              {
                                    setothusr( data );
                              }
                        } );
                  }
            }

            if ( Cookie.get( "othersess" ) )
            {
                  if ( Cookie.get( "othersess" ) !== null )
                  {
                        let codes = [
                              {
                                    tests: 1,
                                    responses: true
                              }
                        ];
                        sessionusers( codes );
                  }
            }
      }, [] );

      useEffect( () =>
      {
            if ( Cookie.get( "user_c" ) )
            {
                  window.open( "../#/", "_self" );
                  setTimeout( () =>
                  {
                        window.location.reload();
                  }, 1000 );
            }
      } );

      const bringsheet = () =>
      {
            let sidn_up_part = document.querySelector( ".sidn_up_part" );

            sidn_up_part.classList.add( "sheet" );
      };

      const sendsignup = ( e ) =>
      {
            e.preventDefault();
            let fname = document.querySelector( "#fname" );
            let lname = document.querySelector( "#lname" );
            let semail1 = document.querySelector( "#semail" );
            let spass1 = document.querySelector( "#spass" );
            let select_q = document.querySelector( "#select_q" );
            let selquest = document.querySelector( "#selquest" );
            let token = document.querySelector( "#token" );

            let error_msg = document.querySelector( ".error_msg" );


            let timer = Math.floor( Math.random() * 100000 ) - 10;

            if ( sfname === "" )
            {
                  seterrors( "" );
                  seterrors( "Enter your first name" );
                  fname.style.border = "1px solid red";
                  lname.style.border = '2px solid var(--borders)';
                  semail1.style.border = '2px solid var(--borders)';
                  spass1.style.border = '2px solid var(--borders)';
                  selquest.style.border = '2px solid var(--borders)';
                  fname.focus();

                  if ( errors !== "" )
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";

                        let adderr = '<div class="error_main">' + errors + '</div>';
                        error_msg.classList.add( "mainerr" );

                        error_msg.innerHTML += adderr;
                  }

                  setTimeout( () =>
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";
                        fname.style.border = '2px solid var(--borders)';
                        seterrors( "" );
                  }, timer );
            }
            else if ( !sfname.match( namereg ) )
            {
                  seterrors( "" );
                  seterrors( "Enter your actual name." );
                  fname.style.border = "1px solid red";
                  lname.style.border = '2px solid var(--borders)';
                  semail1.style.border = '2px solid var(--borders)';
                  spass1.style.border = '2px solid var(--borders)';
                  selquest.style.border = '2px solid var(--borders)';
                  fname.focus();

                  if ( errors !== "" )
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";

                        let adderr = '<div class="error_main">' + errors + '</div>';
                        error_msg.classList.add( "mainerr" );
                        error_msg.innerHTML += adderr;
                  }

                  setTimeout( () =>
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";
                        fname.style.border = '2px solid var(--borders)';
                        seterrors( "" );
                  }, timer );

            }

            else if ( slname === "" )
            {
                  seterrors( "" );
                  seterrors( "Enter your last name." );
                  lname.style.border = "1px solid red";
                  fname.style.border = '2px solid var(--borders)';
                  semail1.style.border = '2px solid var(--borders)';
                  spass1.style.border = '2px solid var(--borders)';
                  selquest.style.border = '2px solid var(--borders)';
                  lname.focus();

                  if ( errors !== "" )
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";

                        let adderr = '<div class="error_main">' + errors + '</div>';
                        error_msg.classList.add( "mainerr" );
                        error_msg.innerHTML += adderr;
                  }

                  setTimeout( () =>
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";
                        lname.style.border = '2px solid var(--borders)';
                        seterrors( "" );
                  }, timer );

            }

            else if ( !slname.match( namereg ) )
            {
                  seterrors( "" );
                  seterrors( "Enter your actual name." );
                  lname.style.border = "1px solid red";
                  fname.style.border = '2px solid var(--borders)';
                  semail1.style.border = '2px solid var(--borders)';
                  spass1.style.border = '2px solid var(--borders)';
                  selquest.style.border = '2px solid var(--borders)';
                  lname.focus();

                  if ( errors !== "" )
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";

                        let adderr = '<div class="error_main">' + errors + '</div>';
                        error_msg.classList.add( "mainerr" );
                        error_msg.innerHTML += adderr;
                  }

                  setTimeout( () =>
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";
                        seterrors( "" );
                        lname.style.border = '2px solid var(--borders)';
                  }, timer );

            }

            else if ( semail === "" )
            {
                  seterrors( "" );
                  seterrors( "Enter your email." );
                  semail1.style.border = "1px solid red";
                  fname.style.border = '2px solid var(--borders)';
                  lname.style.border = '2px solid var(--borders)';
                  spass1.style.border = '2px solid var(--borders)';
                  selquest.style.border = '2px solid var(--borders)';
                  semail1.focus();

                  if ( errors !== "" )
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";

                        let adderr = '<div class="error_main">' + errors + '</div>';
                        error_msg.classList.add( "mainerr" );
                        error_msg.innerHTML += adderr;
                  }

                  setTimeout( () =>
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";
                        seterrors( "" );
                        semail1.style.border = '2px solid var(--borders)';
                  }, timer );

            }

            else if ( !semail.match( emailreg ) )
            {
                  seterrors( "" );
                  seterrors( "Invalid email address. email must be either @gmail.com / @yahoo.com" );
                  semail1.style.border = "1px solid red";
                  fname.style.border = '2px solid var(--borders)';
                  lname.style.border = '2px solid var(--borders)';
                  spass1.style.border = '2px solid var(--borders)';
                  selquest.style.border = '2px solid var(--borders)';
                  semail1.focus();

                  if ( errors !== "" )
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";

                        let adderr = '<div class="error_main">' + errors + '</div>';
                        error_msg.classList.add( "mainerr" );
                        error_msg.innerHTML += adderr;
                  }

                  setTimeout( () =>
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";
                        seterrors( "" );
                        semail1.style.border = '2px solid var(--borders)';
                  }, timer );

            }
            else if ( spass === "" )
            {
                  seterrors( "" );
                  seterrors( "Enter your New password." );
                  spass1.style.border = "1px solid red";
                  fname.style.border = '2px solid var(--borders)';
                  lname.style.border = '2px solid var(--borders)';
                  semail1.style.border = '2px solid var(--borders)';
                  selquest.style.border = '2px solid var(--borders)';
                  spass1.focus();

                  if ( errors !== "" )
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";

                        let adderr = '<div class="error_main">' + errors + '</div>';
                        error_msg.classList.add( "mainerr" );
                        error_msg.innerHTML += adderr;
                  }

                  setTimeout( () =>
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";
                        seterrors( "" );
                        spass1.style.border = '2px solid var(--borders)';
                  }, timer );

            }
            else if ( !spass.match( passreg ) )
            {
                  seterrors( "" );
                  seterrors( "Not a strong password. your password must contain letters, numbers and a special charater." );
                  spass1.style.border = "1px solid red";
                  fname.style.border = '2px solid var(--borders)';
                  lname.style.border = '2px solid var(--borders)';
                  semail1.style.border = '2px solid var(--borders)';
                  selquest.style.border = '2px solid var(--borders)';
                  spass1.focus();

                  if ( errors !== "" )
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";

                        let adderr = '<div class="error_main">' + errors + '</div>';
                        error_msg.classList.add( "mainerr" );
                        error_msg.innerHTML += adderr;
                  }

                  setTimeout( () =>
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";
                        seterrors( "" );
                        spass1.style.border = '2px solid var(--borders)';
                  }, timer );

            }
            else if ( squest === "" )
            {
                  alert( "Please Choose your security question." );
            }
            else if ( squans === "" )
            {
                  seterrors( "" );
                  seterrors( "You must enter your answer." );
                  selquest.style.border = "1px solid red";
                  fname.style.border = '2px solid var(--borders)';
                  lname.style.border = '2px solid var(--borders)';
                  semail1.style.border = '2px solid var(--borders)';
                  spass1.style.border = '2px solid var(--borders)';
                  selquest.focus();

                  if ( errors !== "" )
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";

                        let adderr = '<div class="error_main">' + errors + '</div>';
                        error_msg.classList.add( "mainerr" );
                        error_msg.innerHTML += adderr;
                  }

                  setTimeout( () =>
                  {
                        error_msg.classList.remove( "mainerr" );
                        error_msg.innerHTML = "";
                        seterrors( "" );
                        selquest.style.border = '2px solid var(--borders)';
                  }, timer );

            }
            else
            {

                  let subbtn = document.querySelector( "#subbtn" );

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



                  const deviceDetector = new DeviceDetector();
                  const useragent = navigator.userAgent;
                  const device = deviceDetector.parse( useragent );

                  let token = document.querySelector( "#token" );

                  function dates ()
                  {
                        let date = new Date(),
                              month = date.getMonth(),
                              nowdate = date.getDate(),
                              year = date.getFullYear();
                        if ( month < 10 )
                        {
                              return month + "/" + nowdate + "/" + year;
                        }
                        else
                        {

                              return month + "/" + nowdate + "/" + year;

                        }
                  }

                  subbtn.setAttribute( "disabled", "disabled" );
                  subbtn.innerHTML = "Please wait...";

                  $.ajax( {
                        method: "POST",
                        url: "http://192.168.1.19:3001/sign_up/now",
                        data: {
                              fname: sfname,
                              lname: slname,
                              email: semail,
                              pass: spass,
                              secuquest: squest,
                              secans: squans,
                              unic_id: randomcodes( 50 ),
                              resetid: randomcodes( 50 ),
                              devicetype: device.os.name + " " + device.os.version,
                              rooms: "rooms" + randomcodes( 10 ),
                              profilepic: "https://www.indieweek.com/wp-content/uploads/2019/08/profile-icon-300x300.png",
                              coverpic: "https://c4.wallpaperflare.com/wallpaper/701/856/860/8k-waterfall-nature-wallpaper-preview.jpg",
                              ctoken: token.value,
                              createdate: dates(),
                              vcode: randomcodes( 6 ),
                              vurl: randomcodes( 10 )
                        },
                        success: function ( data )
                        {
                              console.log( data );
                              if ( data.success !== "success" )
                              {
                                    alert( data );
                                    subbtn.removeAttribute( "disabled" );
                                    subbtn.innerHTML = "Sign Up";
                              }
                              else
                              {

                                    $.ajax( {
                                          method: "POST",
                                          url: "https://otp.badzybaddest.repl.co/sms.php",
                                          data: {
                                                emails: semail,
                                                fnames: sfname,
                                                checkin: 1,
                                                codes: data.code
                                          },
                                          success: function ( mydata )
                                          {
                                                if ( mydata === "success" )
                                                {
                                                      navigate( "../Verify/" + data.vur );
                                                      setTimeout( () =>
                                                      {
                                                            window.location.reload();
                                                      }, 1000 );
                                                }
                                          }
                                    } );

                              }
                        }
                  } );
            }

      };


      const loginsubmit = ( e ) =>
      {
            e.preventDefault();

            let emails = document.querySelector( "#emails" );
            let autofom = document.querySelector( "#autofom" );
            let csrfpass = document.querySelector( "#csrfpass" );

            if ( email === "" )
            {
                  alert( "Enter your email." );
                  emails.focus();
            }
            else if ( !email.match( emailreg ) )
            {
                  alert( "This is not a valid email address" );
                  emails.focus();
            }
            else if ( pass === "" )
            {
                  alert( "Enter your password." );
                  autofom.focus();
            }
            else if ( !pass.match( passreg ) )
            {
                  alert( "Access Denied. Please Try again with stronger password." );
                  autofom.focus();
            }
            else
            {

                  let loginbtn = document.querySelector( "#loginbtn" );
                  loginbtn.setAttribute( "disabled", "disabled" );
                  loginbtn.innerHTML = "Please wait...";

                  const deviceDetector = new DeviceDetector();
                  const useragent = navigator.userAgent;
                  const device = deviceDetector.parse( useragent );

                  let _sec_quest = document.querySelector( "._sec_quest" );

                  $.ajax( {
                        method: "POST",
                        url: "http://192.168.1.19:3001/_enter_/in",
                        data: {
                              email: email,
                              pass: pass,
                              csrfcode: csrfpass.value,
                              devices: device.os.name + " " + device.os.version
                        },
                        success: function ( data )
                        {
                              if ( data.success === "success" )
                              {

                                    Cookie.set( "user_c", data.user_c, { secure: true, sameSite: 'strict' } );
                                    ////////////
                                    localStorage.setItem( "user_c", data.user_c );


                                    Cookie.set( "othersess", data.user_c, { secure: true, sameSite: 'strict' } );
                                    Cookie.set( "timebomb", data.user_c, { secure: true, sameSite: 'strict' } );
                                    window.open( "../#/", "_self" );
                                    setTimeout( () =>
                                    {
                                          window.location.reload();
                                    }, 1000 );



                              }
                              else if ( data.success === "successid" )
                              {
                                    setquests( data );
                                    _sec_quest.classList.add( "quest" );
                              }
                              else
                              {
                                    alert( data );
                                    loginbtn.removeAttribute( "disabled" );
                                    loginbtn.innerHTML = "Log In";
                              }
                        }
                  } );

            }
      };


      return (
            <>

                  <div>
                        <title>Eagle ~ Login or Sign up</title>
                        <div className="login_part">
                              <div className="login_part_sq">
                                    <div className="intro_text">
                                          <div className="logo_top">
                                                <img src="https://www.vippng.com/png/full/442-4424935_eagle-blue-eagles-logo-png.png" alt="" />
                                                <div className="logo_txt">
                                                      Eagle
                                                </div>
                                          </div>
                                          {
                                                sesuser.map( ( others, otherkey ) =>
                                                {
                                                      if ( others.responses === true )
                                                      {
                                                            return (
                                                                  <div style={ { width: "100%" } } key={ otherkey }>
                                                                        <div className="resently_logged_in">
                                                                              <h4>Recently logged in</h4>
                                                                              <hr />
                                                                              <div className="recent_img">
                                                                                    {
                                                                                          otherusr.map( ( vvid, vhey ) =>
                                                                                          {

                                                                                                return (
                                                                                                      <div key={ vhey } className="img_cov">
                                                                                                            <div onClick={ e =>
                                                                                                            {
                                                                                                                  if ( window.confirm( "You're about to remove " + vvid.fname + ". do you wish to do so?" ) === true )
                                                                                                                  {
                                                                                                                        Cookie.remove( "othersess" );
                                                                                                                        window.location.reload();
                                                                                                                  }
                                                                                                            } } className="rem">
                                                                                                                  <i className="fa fa-times"></i>
                                                                                                            </div>
                                                                                                            <img onClick={ e =>
                                                                                                            {
                                                                                                                  let form_now = document.querySelector( ".form_now" );
                                                                                                                  let overlays_s = document.querySelector( ".overlays_s" );

                                                                                                                  form_now.classList.add( "fmn" );
                                                                                                                  overlays_s.classList.add( "ovl" );

                                                                                                            } } style={ { cursor: "pointer" } } src={ vvid.profilepic } alt="" />
                                                                                                            <hr />
                                                                                                            <div className="name_of">
                                                                                                                  { vvid.fname + " " + vvid.lname }
                                                                                                            </div>
                                                                                                      </div>
                                                                                                );
                                                                                          } )
                                                                                    }

                                                                              </div>
                                                                              <div className="form_now">
                                                                                    <i onClick={ e =>
                                                                                    {
                                                                                          let form_now = document.querySelector( ".form_now" );
                                                                                          let overlays_s = document.querySelector( ".overlays_s" );

                                                                                          form_now.classList.remove( "fmn" );
                                                                                          overlays_s.classList.remove( "ovl" );
                                                                                    } } className="fa fa-times"></i>
                                                                                    <div className="users_grab">
                                                                                          {
                                                                                                otherusr.map( ( vvi, ks ) =>
                                                                                                {
                                                                                                      return (
                                                                                                            <div key={ ks } className="imag_div">
                                                                                                                  <img src={ vvi.profilepic } alt="" />
                                                                                                                  <br />
                                                                                                                  <div className="titles">{ vvi.fname + " " + vvi.lname }</div>
                                                                                                            </div>
                                                                                                      );
                                                                                                } )
                                                                                          }
                                                                                    </div>
                                                                                    <form onSubmit={ e =>
                                                                                    {
                                                                                          e.preventDefault();
                                                                                          let regist = document.querySelector( "#regist" );

                                                                                          if ( regist.value === "" )
                                                                                          {
                                                                                                alert( "Please enter your password." );
                                                                                                regist.focus();
                                                                                          }
                                                                                          else if ( !regist.value.match( passreg ) )
                                                                                          {
                                                                                                alert( "Invalid password." );
                                                                                                regist.focus();
                                                                                          }

                                                                                          else
                                                                                          {
                                                                                                let donebtn = document.querySelector( "#donebtn" );
                                                                                                donebtn.setAttribute( "disabled", "disabled" );
                                                                                                donebtn.innerHTML = "Please wait...";
                                                                                                $.ajax( {
                                                                                                      method: "POST",
                                                                                                      url: "http://192.168.1.19:3001/pass_me/done",
                                                                                                      data: {
                                                                                                            ide: Cookie.get( "othersess" ),
                                                                                                            pass: regist.value
                                                                                                      },
                                                                                                      success: function ( data )
                                                                                                      {
                                                                                                            if ( data.success === "success" )
                                                                                                            {

                                                                                                                  Cookie.set( "user_c", data.user_c, { secure: true, sameSite: 'strict' } );
                                                                                                                  //////////// 
                                                                                                                  localStorage.setItem( "user_c", data.user_c )
                                                                                                                        ;
                                                                                                                  Cookie.set( "othersess", data.user_c, { secure: true, sameSite: 'strict' } );
                                                                                                                  Cookie.set( "timebomb", data.user_c, { secure: true, sameSite: 'strict' } );
                                                                                                                  window.open( "../#/", "_self" );
                                                                                                                  setTimeout( () =>
                                                                                                                  {
                                                                                                                        window.location.reload();
                                                                                                                  }, 1000 );

                                                                                                            }

                                                                                                            else
                                                                                                            {
                                                                                                                  alert( data );
                                                                                                                  donebtn.removeAttribute( "disabled" );
                                                                                                                  donebtn.innerHTML = "Done";
                                                                                                            };
                                                                                                      }
                                                                                                } );
                                                                                          }
                                                                                    } } action="">
                                                                                          <input placeholder='Enter password' type="password" autoComplete='off' name="register" id="regist" />
                                                                                          <button className="btn btn-success p-2 font-weight-bold w-100 mt-2" id='donebtn'>Done</button>
                                                                                    </form>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            );
                                                      }
                                                      else
                                                      {
                                                            return (
                                                                  <div id='mycon' key={ otherkey }>
                                                                        <h3>Connect with friends and the world around you on <b>Eagle</b></h3>
                                                                  </div>
                                                            );
                                                      }
                                                } )
                                          }
                                    </div>
                                    <div className="form_Part">
                                          <form onSubmit={ loginsubmit } action="">
                                                <input onChange={ e => setemail( e.target.value ) } autoComplete='off' placeholder='Email' type="email" name="" id="emails" />
                                                <input onChange={ e => setpass( e.target.value ) } placeholder='Password' type="password" name="" autoComplete='off' id="autofom" />
                                                <input autoComplete='off' type="hidden" name="_csrf" value={ csrf } id="csrfpass" />
                                                <button id='loginbtn' className="btn btn-primary">Log In</button>

                                                <div onClick={ bringsheet } className="btn btn-success">Create new account</div>
                                          </form>
                                    </div>
                                    <div className="sidn_up_part" id='bottom_sheet'>
                                          <div className="_form_sign">

                                                <div className="head_pa">
                                                      <div className="telme">
                                                            <div>Sign Up</div>
                                                            <small>It's quick and easy.</small>
                                                      </div>
                                                      <i style={ { cursor: 'pointer' } } onClick={ e =>
                                                      {
                                                            let sidn_up_part = document.querySelector( ".sidn_up_part" );
                                                            let error_msg = document.querySelector( ".error_msg" );
                                                            error_msg.classList.remove( "mainerr" );
                                                            error_msg.innerHTML = "";
                                                            seterrors( "" );
                                                            sidn_up_part.classList.remove( "sheet" );
                                                      } } className="fa fa-times"></i>
                                                </div>
                                                <hr />
                                                <form onSubmit={ sendsignup } action="">
                                                      <div className="col namecol">
                                                            <div className="cors">
                                                                  <input onChange={ e => setsfname( e.target.value ) } placeholder='First name' type="text" name="" id="fname" />
                                                            </div>
                                                            <div className="cors">
                                                                  <input onChange={ e => setslname( e.target.value ) } placeholder='Last name' type="text" name="" id="lname" />
                                                            </div>
                                                      </div>
                                                      <div className="col">
                                                            <div className="cors">
                                                                  <input onChange={ e => setsemail( e.target.value ) } autoComplete='off' placeholder='Email' type="email" name="" id="semail" />
                                                            </div>
                                                            <div className="cors">
                                                                  <input onChange={ e => setspass( e.target.value ) } placeholder='New password' type="password" autoComplete='off' name="masns" id="spass" />
                                                            </div>
                                                      </div>
                                                      <div className="security_quest">
                                                            <small>Security Question</small> <br />
                                                            <div className="se_q">
                                                                  <select onChange={ e => setsquest( e.target.value ) } name="select_qu" id="select_q">
                                                                        <optgroup label='Select a Question'>
                                                                              <option value="My Dad's name is?">My Dad's name is?</option>
                                                                              <option value="My Dog's name is?">My Dog's name is?</option>
                                                                              <option value="My Uncle's name is?">My Uncle's name is?</option>
                                                                              <option value="What's my favorite food?">What's my favorite food?</option>
                                                                              <option value="What's my favorite color?">What's my favorite color?</option>
                                                                              <option value="What's my pet's name?">What's my pet's name?</option>
                                                                              <option value="What's my website url?">What's my website url?</option>
                                                                              <option value="What kind of device am i using?">What kind of device am i using?</option>
                                                                              <option value="What cup do i like to drink in?">What cup do i like to drink in?</option>
                                                                              <option value="Who's my favorite commedian?">Who's my favorite commedian?</option>
                                                                        </optgroup>
                                                                  </select>
                                                                  <input onChange={ e => setsquans( e.target.value ) } placeholder='Enter Your Answer' type="text" name="selquest" id="selquest" />
                                                                  <input type="hidden" autoComplete='off' name="_csrf" value={ csrf } id="token" />
                                                            </div>
                                                      </div>
                                                      <div className="form_b">
                                                            <button className="btn btn-success w-100 p-2 font-weight-bold" id="subbtn">Sign Up</button>
                                                      </div>
                                                </form>
                                          </div>
                                    </div>
                              </div>
                              <div className="error_msg"></div>
                              <div className="_sec_quest">
                                    <div className="_se_qa">
                                          <div className="quest_float">
                                                { quest.sequest }
                                          </div>
                                          <form onSubmit={ e =>
                                          {
                                                e.preventDefault();

                                                let ans = document.querySelector( "#ans" );

                                                if ( ans.value === "" )
                                                {
                                                      alert( "Please enter your answer" );
                                                }
                                                else
                                                {
                                                      let andv = ans.value.toUpperCase();
                                                      let dbdn = document.querySelector( "#dbdn" );

                                                      dbdn.setAttribute( "disabled", "disabled" );
                                                      dbdn.innerHTML = "Please Wait";


                                                      const deviceDetector = new DeviceDetector();
                                                      const useragent = navigator.userAgent;
                                                      const device = deviceDetector.parse( useragent );

                                                      $.ajax( {
                                                            method: "POST",
                                                            url: "http://192.168.1.19:3001/question/answers",
                                                            data: {
                                                                  ide: quest.user_c,
                                                                  anss: andv,
                                                                  devices: device.os.name + " " + device.os.version
                                                            },
                                                            success: function ( data )
                                                            {
                                                                  if ( data.success === "success" )
                                                                  {

                                                                        Cookie.set( "user_c", data.user_c, { secure: true, sameSite: 'strict' } );
                                                                        ////////////    
                                                                        localStorage.setItem( "user_c", data.user_c )
                                                                              ;
                                                                        Cookie.set( "othersess", data.user_c, { secure: true, sameSite: 'strict' } );
                                                                        Cookie.set( "timebomb", data.user_c, { secure: true, sameSite: 'strict' } );
                                                                        window.open( "../#/", "_self" );
                                                                        setTimeout( () =>
                                                                        {
                                                                              window.location.reload();
                                                                        }, 1000 );

                                                                  }

                                                                  else
                                                                  {
                                                                        alert( data );
                                                                        dbdn.removeAttribute( "disabled" );
                                                                        dbdn.innerHTML = "Done";
                                                                  };
                                                            }
                                                      } );
                                                }

                                          } } action="">
                                                <input placeholder='Enter your answer...' type="text" name="" id="ans" />
                                                <br />
                                                <button className="btn btn-primary p-2 mt-2" id='dbdn'>Done</button>
                                          </form>
                                    </div>
                              </div>
                              <div className="overlays_s"></div>
                        </div>
                  </div>

            </>
      );
}

export default Auth;
