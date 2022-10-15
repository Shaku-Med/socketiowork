import React, {useEffect, useState} from 'react';
import $ from 'jquery'
import { io } from 'socket.io-client'
import DeviceDetector from "device-detector-js";
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie'


function Home ()
{
      const [user_info, set_user_info] = useState([])
      const [ sesuser, sessionusers ] = useState( [] )
      const [ yearbath, setybath ] = useState( '' )
      const socket = io( "http://192.168.1.19:3001" )
      const [csrf, setcsrf] = useState("")
      let navigate = useNavigate()
      
      let [quest, setquests] = useState([])

      let [ otherusr, setothusr ] = useState( [] )
       const [chat_sent, set_cat_get] = useState([])
       let [value, setState] = useState(true);

    

    
      

   

     

      useEffect( () =>
      {
            if ( Cookie.get( "user_c" ) )
            {
                  if ( Cookie.get( "user_c" ) !== null )
                  {
                        const deviceDetector = new DeviceDetector();
                        const useragent = navigator.userAgent;
                        const device = deviceDetector.parse( useragent );

                        $.ajax( {
                              method: "POST",
                              url: "http://192.168.1.19:3001/check",
                              data: {
                                    ide: Cookie.get( "user_c" ),
                                    devices: device.os.name + " " + device.os.version
                              },
                              success: function ( data )
                              {
                                    if ( data !== "success" )
                                    {
                                          Cookie.remove( "user_c" );
                                          window.location.reload()
                                    }
                              }
                        } );
                  }
            }
      }, [] );

      useEffect( () =>
      { 
             if ( Cookie.get( "user_c" ) && Cookie.get( "chat_id" ) )
            {
                  if ( Cookie.get( "user_c" ) !== null && Cookie.get( "chat_id" ) !== null )
                  {
                        const deviceDetector = new DeviceDetector();
                        const useragent = navigator.userAgent;
                        const device = deviceDetector.parse( useragent );

                        $.ajax( {
                              method: "POST",
                              url: "http://192.168.1.19:3001/grab_id_emails",
                              data: {
                                    ide: Cookie.get( "user_c" ),
                                    chatid: Cookie.get( "chat_id" )
                              },
                              success: function ( data )
                              {
                                    setothusr( data );
                                    set_cat_get( data )
                                    localStorage.setItem("oth", data.ownermail)
                              }
                        } );
                  }
            }
            
      }, [])



      setInterval( () =>
      { 
             if ( Cookie.get( "user_c" ) || localStorage.getItem( "user_c" ) )
            {
                  if ( Cookie.get( "user_c" ) !== localStorage.getItem( "user_c" ) || localStorage.getItem( "user_c" ) !== Cookie.get( "user_c" ) )
                  {
                        localStorage.removeItem( "user_c" );
                        Cookie.remove( "user_c" );
                         window.open("../#/Auth", "_self")
                       
                  setTimeout( () =>
                  { 
                         window.location.reload();  
                  }, 2000)
                                    
                  }
                        
            }  
            else
            { 
                 localStorage.removeItem( "user_c" );
                  Cookie.remove( "user_c" );
                   window.open("../#/Auth", "_self")
                       
                  setTimeout( () =>
                  { 
                         window.location.reload();  
                  }, 2000)
            }
      }, 1000)

      const [contacts, setcontacts] = useState([])
      
      useEffect( () =>
      { 
       
            $.ajax( {
                  method: "POST",
                  url: "http://192.168.1.19:3001/fetch_users_in",
                  data: {
                        ide: Cookie.get( "user_c" ),
                  },
                  success: function ( data )
                  {
                       setcontacts(data)
                  }
            } );
            
      }, [] )
      
      let [ chag_msg, setchatmsg ] = useState( '' )
     
      useEffect( () =>
      { 
             let sockme = localStorage.getItem("oth")
      ////SOcket chat messages
      socket.on( "chat_mes", ( data ) =>
      {
            let s_m_d = document.querySelector(".s_m_d")
            if ( data.sendersid === Cookie.get( "user_c" ) || data.ownderid === Cookie.get( "user_c" ) )
            { 
                  console.log(sockme)
                  if (data.sendersemail === sockme || data.ownermail === sockme )
                  { 
                        let style = { 
                              background: "red"
                        }
                        let htm = '<div style={{background: "red"}} className="chat_msg1">' +
                                                            '<div className="chat_box">' +
                                                                  '<div className="chat_b">' +
                                                                      data.message
                                                                       +
                                                                  '</div>' +
                                                                 ' <div className="date_sent">' +
                                                                     data.date
                                                                       +
                                                                  '</div>' +
                                                            '</div>' +
                              '</div>'
                        
                        s_m_d.innerHTML += htm;
                  }
            }
      } );


      //End of socket chat mesg
      })


      const handle_chat_send = ( e ) =>
      { 
            e.preventDefault()

            if ( chag_msg !== "" )
            { 
                  let chat_msgs = [ { 
                         sendersid: Cookie.get( "user_c" ),
                        ownderid: Cookie.get( "chat_id" ),
                        message: chag_msg,
                        sendersmail: otherusr.sendersemail,
                         ownermail: otherusr.ownermail
                  }]
                 
                  chat_msgs.map( vm =>
                  { 
                         socket.emit("chat_mes", vm )
                  } )
                  
                  

                  $.ajax( { 
                        method: "POST",
                        url: "http://192.168.1.19:3001/messages/send/to",
                        data: { 
                              sendersid: Cookie.get( "user_c" ),
                              ownderid: Cookie.get( "chat_id" ),
                                message: chag_msg
                        },
                        success: function ( data )
                        { 
                              console.log(data)
                        }
                  })
            }

      }

      useEffect( () =>
      {
            if ( Cookie.get( "user_c" ) && Cookie.get( "chat_id" ) )
            {
                  if ( Cookie.get( "user_c" ) !== null && Cookie.get( "chat_id" ) !== null )
                  { 
                        let uids = { 
                              chattoid: Cookie.get( "chat_id" ),
                              sendersid: Cookie.get( "user_c" )
                        }
                        socket.emit("chat", uids)
                  }
            }
      }, [] );

      

      return (
            <>
                  <div >
                        <div style={ { overflow: "hidden" } } className="home_test_h">
                              <div className="first_users">
                                    <div className="user_part">
                                          <div className="utxt">
                                                Users
                                          </div>
                                          <div className="user_drops">
                                                {
                                                      contacts.map( ( v, mk ) =>
                                                      {
                                                            if ( v.unic_id === v.uid )
                                                            {
                                                                  if ( v.unic_id !== Cookie.get( "user_c" ) )
                                                                  {
                                                                        return (
                                                                              <div onClick={e => 
                                                                              {
                                                                                    let user_part = document.querySelector( ".user_part" );
                                                                                    let _routes = document.querySelector( "#keypath" );
                                                                                    user_part.classList.add( "lefpm" );
                                                                                    _routes.classList.add( "routee" );

                                                                                    

                                                                                    Cookie.set( "chat_id", v.unic_id, { secure: true, sameSite: 'strict' } );
                                                                              
                                                                                    if ( Cookie.get( "user_c" ) && Cookie.get( "chat_id" ) )
                                                                                    {
                                                                                          if ( Cookie.get( "user_c" ) !== null && Cookie.get( "chat_id" ) !== null )
                                                                                          {
                                                                                                const deviceDetector = new DeviceDetector();
                                                                                                const useragent = navigator.userAgent;
                                                                                                const device = deviceDetector.parse( useragent );

                                                                                                $.ajax( {
                                                                                                      method: "POST",
                                                                                                      url: "http://192.168.1.19:3001/grab_id_emails",
                                                                                                      data: {
                                                                                                            ide: Cookie.get( "user_c" ),
                                                                                                            chatid: Cookie.get( "chat_id" )
                                                                                                      },
                                                                                                      success: function ( data )
                                                                                                      {
                                                                                                            setothusr( data );
                                                                                                            set_cat_get( data );
                                                                                                            localStorage.setItem( "oth", data.ownermail );
                                                                                                      }
                                                                                                } );
                                                                                          }
                                                                                    }

                                                                                   
                                                                                    

                                                                              } } className="u1">
                                                                                    <div className="ima_uc">
                                                                                          <img src={ v.profilepic } alt="" />
                                                                                    </div>
                                                                                    <div className="name_st">
                                                                                          <div className="u_name">
                                                                                                { v.fname + " " + v.lname }
                                                                                          </div>
                                                                                          <div className="last_msg">
                                                                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae praesentium explicabo natus itaque adipisci asperiores nulla sapiente deserunt, dolorum repellat quos reiciendis numquam tenetur maxime voluptate nisi doloribus excepturi iusto!
                                                                                          </div>
                                                                                          <div className="status"></div>
                                                                                          <div className="date_sn">2:20Am</div>
                                                                                    </div>
                                                                              </div>



                                                                        );
                                                                  }
                                                            }
                                                      } )
                                                }
                                                <div className="bot_help" style={ { height: "20vh" } }></div>
                                          </div>

                                    </div>
                                    <div className="chat_area">
                                          <div className="scroll_part">
                                                <div className="header_part_us">
                                                      <div className="user_main_part">
                                                            <div className="profile_of_p">
                                                                  <div onClick={ e =>
                                                                  {
                                                                        let user_part = document.querySelector( ".user_part" );
                                                                        let _routes = document.querySelector( "#keypath" );
                                                                        user_part.classList.remove( "lefpm" );
                                                                        _routes.classList.remove( "routee" );
                                                                                                
                                                                  } } className="close_now">
                                                                        <i className="fa fa-arrow-left"></i>
                                                                  </div>
                                                                  <div className="img_m">
                                                                        <img src="https://thumbs.dreamstime.com/b/sexy-woman-silhouette-over-red-sunset-sky-sensual-female-beach-vacation-holiday-concept-girl-windy-flying-cloth-51320474.jpg" alt="" />
                                                                  </div>
                                                                  <div className="_grammi_ly">
                                                                        <div className="name_gra">
                                                                              Mohamed Brima Amara
                                                                        </div>
                                                                        <div className="status_on">
                                                                              Online
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className="s_m_d">
                                                     
                                                      <div className="chat_msg1">
                                                            <div className="chat_box">
                                                                  <div className="chat_b">
                                                                        mohamed Brima Amara Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, optio quis ipsum eligendi cupiditate nisi assumenda delectus, quisquam aut quos saepe eos similique laboriosam repellendus quo non distinctio sapiente inventore?
                                                                  </div>
                                                                  <div className="date_sent">
                                                                        2:30Pm
                                                                  </div>
                                                            </div>
                                                      </div>

                                                      <div className="chat_msg2">
                                                            <div className="chat_box">
                                                                  <div className="chat_b1">
                                                                        mohamed Brima Amara Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, optio quis ipsum eligendi cupiditate nisi assumenda delectus, quisquam aut quos saepe eos similique laboriosam repellendus quo non distinctio sapiente inventore?
                                                                  </div>
                                                                  <div className="date_sent">
                                                                        2:30Pm
                                                                  </div>
                                                            </div>
                                                      </div>

                                                      <div className="chat_msg1">
                                                            <div className="chat_box">
                                                                  <div className="img_part">
                                                                        <img id='img_prev' src="https://thumbs.dreamstime.com/b/sexy-woman-silhouette-over-red-sunset-sky-sensual-female-beach-vacation-holiday-concept-girl-windy-flying-cloth-51320474.jpg" alt="" />
                                                                  </div>
                                                                  <div className="chat_b">
                                                                        hello how are yu
                                                                  </div>
                                                                  <div className="date_sent">
                                                                        2:30Pm
                                                                  </div>
                                                            </div>
                                                      </div>

                                                      <div className="chat_msg2">
                                                            <div className="chat_box">
                                                                  <div className="img_part">
                                                                        <img id='img_prev' src="https://thumbs.dreamstime.com/b/sexy-woman-silhouette-over-red-sunset-sky-sensual-female-beach-vacation-holiday-concept-girl-windy-flying-cloth-51320474.jpg" alt="" />
                                                                  </div>
                                                                  <div className="chat_b1">
                                                                        hello how are yu
                                                                  </div>
                                                                  <div className="date_sent">
                                                                        2:30Pm
                                                                  </div>
                                                            </div>
                                                      </div>

                                                      <div className="chat_msg1">
                                                            <div className="chat_box">
                                                                  <div className="img_part">
                                                                        <video controls src="https://player.vimeo.com/external/639058718.hd.mp4?s=9960fc6c540e085b3435bfe32d86b8722ff7798b&profile_id=174&oauth2_token_id=57447761#t=0.01"></video>
                                                                  </div>
                                                                  <div className="chat_b">
                                                                        hello how are yu
                                                                  </div>
                                                                  <div className="date_sent">
                                                                        2:30Pm
                                                                  </div>
                                                            </div>
                                                      </div>

                                                      <div className="chat_msg2">
                                                            <div className="chat_box">
                                                                  <div className="img_part">
                                                                        <video controls src="https://player.vimeo.com/external/639058718.hd.mp4?s=9960fc6c540e085b3435bfe32d86b8722ff7798b&profile_id=174&oauth2_token_id=57447761#t=0.01"></video>
                                                                  </div>
                                                                  <div className="chat_b1">
                                                                        hello how are yu
                                                                  </div>
                                                                  <div className="date_sent">
                                                                        2:30Pm
                                                                  </div>
                                                            </div>
                                                      </div>
                                                                              
                                                      <div className="vvg" style={ { height: '60vh' } }></div>
                                                </div>
                                          </div>
                                          <div className="input_field">
                                                <form onSubmit={ handle_chat_send } aria-label='Send' action="">
                                                      <div className="file_part">
                                                            <i className="fa fa-link"></i>
                                                      </div>
                                                      <input onChange={ e => setchatmsg( e.target.value ) } type="text" name="" id="" />
                                                      <div className="camera_part">
                                                            <input accept='image/*, video/*' accessKey='v' style={ { display: "none" } } type="file" name="image_up" id="_imgup" />
                                                            <label htmlFor="_imgup">
                                                                  <i className="fa fa-camera"></i>
                                                            </label>
                                                      </div>
                                                </form>
                                          </div>
                                    </div>

                                                            
                                                           
                              </div>

                                                      
                        </div>
                  </div>
            </>
      );
}

export default Home;
