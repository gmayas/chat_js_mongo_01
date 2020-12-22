module.exports = io => {

    let nickNames = [
        'Fazt',
        'Ryan',
        'Joe',
        'Gabriel'
    ];

    io.on('connection', (socket) => {
        console.log('New User Connected.');
        // Evento new user
        socket.on('new user', (user, res) => {
            try{
                if (nickNames.indexOf(user) <= -1){
                    nickNames.push(user);
                }
                socket.nickname = user;
                res({
                    Ok: true,
                    UserName: socket.nickname,
                    resError: 'No error.'
                })
                io.sockets.emit('usernames', nickNames); // Se emite a todos los usuarios
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
        socket.on('send message', (message) => {
            io.sockets.emit('new message', message); // Se transmite a todas las conecciones
        });
        // Evento disconnect
        socket.on('disconnect', () => {
            console.log('User disconnect');
        });
    });
};