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
            console.log('$nickName.val(): ', $nickName.val().trim());
            socket.emit('new user', $nickName.val().trim(), dataResponse => {
                console.log('dataResponse: ', dataResponse);
                if (dataResponse.Ok) {
                    $('#nickWrap').hide();
                    $('#contentWrap').show();
                } else {
                    $nickError.html(`<div class="alert alert-danger text-center"><h5>${dataResponse.resError}</h5></div>`);
                };
            });
        }
        $nickName.val(null);
    });
    // $messageForm
    $messageForm.submit(e => {
        e.preventDefault();  // 
        if (!($messageBox.val().trim() == '')) {
            socket.emit('send message', $messageBox.val().trim(), data =>{
                console.log('data call back', data)
            } ); // Se emite el mensaje
        }
        $messageBox.val(null);
    });
    // Se escucha el evento new message
    socket.on('new message', (message) => {
        $chat.append(`<h5><i class="fas fa-user"></i> ${message.UserName} says: <b class="text-info">${message.msg}</b></h5>`);
    });
    // Se escucha el evento usernames
    socket.on('usernames', (userNames) => {
        let html= '';
        userNames.map((currentValue) => {
            html += (`<p><h5><i class="fas fa-user"></i> ${currentValue} </h5></p>`);
        });
        $userNames.html(html);
    });
});