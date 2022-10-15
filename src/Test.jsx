import React, {useEffect, useState} from 'react';
import $ from 'jquery'
import {io} from 'socket.io-client'
function Test ()
{
           useEffect( () =>
      {

            var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
                        token: ramdontoken,
                  },
                  success: function (data)
                  { 
                        console.log(data)
                  }
            } );
      }, [] );
      return (
            <div>
                  HI This is test
            </div>
      );
}

export default Test;
