// Function JQUERY
$(function () {
    const socket = io(); //Global variable io, the server connects and returns a socket to send and listen to events.
    
    // Obtaining DOM elements from the interface

    // Select the id message-form
    const $messageForm = $('#message-form');
    // Select the id message
    const $messagebox = $('#message');
    // Select the id chat
    const $chat = $('#chat');

    // Events
    $messageForm.submit( e =>{
        e.preventDefault();  // Evita el eevento de refrecar la pafina
        console.log('Sending data')
    });

});