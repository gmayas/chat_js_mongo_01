module.exports = io => {

    let nickNames = [];

    io.on('connection', (socket) => {
        console.log('New User Connected.');
        // Evento new user
        socket.on('new user', (user, res) => {
            try {
                if (nickNames.indexOf(user) <= -1) {
                    nickNames.push(user);
                }
                socket.nickname = user;
                //console.log('socket: ', socket);
                res({
                    Ok: true,
                    UserName: socket.nickname,
                    resError: 'No error.'
                })
                updateNickNames();
            } catch (e) {
                console.log('error new user: ', e)
                res({
                    Ok: false,
                    UserName: '',
                    resError: 'Oops, something went wrong.'
                })
            };
        });
        // Evento send message
        socket.on('send message', (message, cb) => {
            // @User message
            if (message.substr(0, 1) === '@') {
                message = message.substr(1);
                const index = message.indexOf(' ');
                if (index != -1) {
                    var nameUser = message.substr(0, index);
                    message = message.substr(index + 1);
                    if (nickNames.some(elem => elem == nameUser)) {
                        let wMessage = socket.nickname;
                        wMessage.emit('whisper', cb({
                            Ok: true,
                            UserName: socket.nickname,
                            msg: message,
                            resError: 'No error.'
                        }));
                    } else {
                        cb({
                            Ok: false,
                            UserName: socket.nickname,
                            msg: 'Error! Please enter a Valid User',
                            resError: 'Error.'
                        })
                        console.log('Si el user no esta conectado')
                    };
                } else {
                    cb({
                        Ok: false,
                        UserName: socket.nickname,
                        msg: 'Error! Please enter your message',
                        resError: 'Error.'
                    })
                }
            } else{
                io.sockets.emit('new message', {
                    msg: message,
                    UserName: socket.nickname
                }); // Se transmite a todas las conecciones
            };
        });
        // Evento disconnect
        socket.on('disconnect', () => {
            if (!socket.nickname) return;
            nickNames.splice(nickNames.indexOf(socket.nickname), 1);
            updateNickNames(); //
            console.log('User disconnect');
        });

        updateNickNames = () => {
            io.sockets.emit('usernames', nickNames); //
        }
    });
};