// Function JQUERY
$(function () {
    const socket = io(); //Global variable io, the server connects and returns a socket to send and listen to events.

    // Obtaining DOM elements from the interface

    // Select the id nickForm
    const $nickForm = $('#nickForm');
    // Select the id nickError
    const $nickError = $('#nickError');
    // Select the id nickName
    const $nickName = $('#nickName');
    // Select the id userNames
    const $userNames = $('#userNames');
    // Select the id message-form
    const $messageForm = $('#message-form');
    // Select the id message
    const $messageBox = $('#message');
    // Select the id chat
    const $chat = $('#chat');

    // Events
    // $nickForm
    $nickForm.submit(e => {
        e.preventDefault();  // Evita el evento de resfrecar la pagina
        if (!($nickName.val().trim() == '')) {
            socket.emit('new user', $nickName.val(), dataResponse => {
                console.log('dataResponse: ', dataResponse);
                if (dataResponse) {
                    $('#nickWrap').hide();
                    $('#contentWrap').show();
                    $('#message').focus();
                } else {
                    $nickError.html(`<div class="alert alert-danger text-center"><h5>That username already Exists.</h5></div>`);
                };
            });
        }
        $nickName.val(null);
    });
    // $messageForm
    $messageForm.submit(e => {
        e.preventDefault();  // 
        if (!($messageBox.val().trim() == '')) {
            socket.emit('send message', $messageBox.val(), data =>{
                $chat.append(`<p class="error">${data}</p>`)
            }); // Se emite el mensaje
        }
        $messageBox.val(null);
    });
    // Se escucha el evento new message
    socket.on('new message', (message) => {
        displayMsg(data);
        
    });
    // Se escucha el evento usernames
    socket.on('usernames', (userNames) => {
        let html= '';
        userNames.map((currentValue) => {
            html += (`<p><h5><i class="fas fa-user"></i> ${currentValue} </h5></p>`);
        });
        $userNames.html(html);
    });

    socket.on('whisper', data => {
        $chat.append(`<p class="whisper"><b>${data.nick}</b>: ${data.msg}</p>`);
      });
  
      socket.on('load old msgs', msgs => {
        for(let i = msgs.length -1; i >=0 ; i--) {
          displayMsg(msgs[i]);
        }
      });

    displayMsg = (data) => {
        $chat.append(`<h5><i class="fas fa-user"></i> ${data.nick} says: <b class="text-info">${data.msg}</b></h5>`);
      }
});