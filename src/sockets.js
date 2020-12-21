module.exports = io => {
    io.on('connection', (socket) => {
        console.log('New User Connected.');
        socket.on('disconnect', () => {
            console.log('User disconnect');
        });
    });
};