import React, {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookie from 'js-cookie'
import $ from 'jquery'
function Nav ()
{
      const [gmuhshaond, setmyusers] = useState([])
      const [userprofile, setuserprofile] = useState([])
     
      setTimeout(()=>{ 
            if ( Cookie.get( "user_c" ) )
            {
                  if ( Cookie.get( "user_c" ) === null )
                  {
                        let trustar = [
                              {
                                    responses: false,
                                    random: 1
                              }
                        ];
                        setmyusers( trustar );

                       
                  }
                  else
                  {
                        let trustar = [
                              {
                                    responses: true,
                                    random: 1
                              }
                        ];
                        setmyusers( trustar );

                        

                  }
            }
            else
            {
                  let trustar = [
                        {
                              responses: false,
                              random: 1
                        }
                  ];
                  setmyusers( trustar );
            }
      }, 2000)

      useEffect( () =>
      {
            if ( Cookie.get( "user_c" ) )
            {
                  if ( Cookie.get( "user_c" ) !== null )
                  {
                        $.ajax( {
                              method: "POST",
                              url: "http://192.168.1.19:3001/profilepic/user/grab",
                              data: {
                                    ide: Cookie.get( "user_c" )
                              },
                              success: function ( data )
                              {
                                   
                                    setuserprofile( data );

                                  
                              }
                        } );
                  }
                 
            }
      }, [] );

      return (
            <>
                  {
                        gmuhshaond.map( ( val, k ) =>
                        {
                              if ( val.responses !== false )
                              {
                                    return (
                                          <div id='keypath' key={ k }>
                                                <div className="head_part">
                                                      <div className="h_left">
                                                            <div className="log">
                                                                  <img src="https://www.vippng.com/png/full/442-4424935_eagle-blue-eagles-logo-png.png" alt="" />
                                                                 
                                                            </div>
                                                            <div className="_routes">
                                                                  <div className="home_1">
                                                                        <i className="fa fa-video"></i>
                                                                        <div className="titless">
                                                                              Video
                                                                        </div>
                                                                  </div>
                                                                  <div className="home_1">
                                                                        <i className="fa fa-images"></i>
                                                                        <div className="titless">
                                                                              Images
                                                                        </div>
                                                                  </div>
                                                                  <div className="home_1">
                                                                        <i className="fa fa-gears"></i>
                                                                        <div className="titless">
                                                                              Settings
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                            <div className="dims"></div>
                                                            <div className="_v_">
                                                                  <div onClick={ e =>
                                                                  {
                                                                        let wantedimg = document.getElementById( "wantedimg" );
                                                                        let dims = document.querySelector( ".dims" );
                                                                        let close_me = document.querySelector( ".close_me" );
                                                                        let _v_prof = document.querySelector( "._v_prof" );
                                                                        wantedimg.classList.remove( "zoomimg" );
                                                                        dims.classList.remove( "mydim" );
                                                                        close_me.classList.remove( "closezoom" );
                                                                        _v_prof.classList.remove( "logout" );

                                                                  } } className="close_me">
                                                                        <i className="fa fa-times"></i>
                                                                  </div>
                                                                  <div className="img_v">
                                                                        <img onClick={ e =>
                                                                        {
                                                                              let wantedimg = document.getElementById( "wantedimg" );
                                                                              let dims = document.querySelector( ".dims" );
                                                                              let close_me = document.querySelector( ".close_me" );
                                                                              let _v_prof = document.querySelector( "._v_prof" );
                                                                              wantedimg.classList.add( "zoomimg" );
                                                                              dims.classList.add( "mydim" );
                                                                              close_me.classList.add( "closezoom" );
                                                                              _v_prof.classList.add( "logout" );

                                                                        } } id='wantedimg' src={userprofile.profilepic} alt="" />
                                                                  </div>
                                                                 
                                                                  <div onClick={ e =>
                                                                  { 
                                                                        Cookie.remove( "user_c" )
                                                                        window.location.reload()
                                                                  }} className="_v_prof">
                                                                        <div className="open_profile">
                                                                              Logout
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    );
                              }
                              else
                              {
                                    
                              }
                        } )
                  }
            </>
      );
}

export default Nav;
