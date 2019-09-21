
const express = require('express');
const socket = require('socket.io');

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
const server = app.listen( process.env.PORT || 3000, () => console.log('server up and running') );

const io = socket(server);

// handle new connection 
//

let text = { text:'' };

const newConnection = socket => {
    
    console.log(`New user with id ${socket.id} has entered`);
    
    // send the existing text document 
    socket.emit( 'newUser', text );

    // set handler for when user sends new updated text
    const handleContentChange = newData => {
        text.text = newData.text;
        socket.broadcast.emit( 'other-client-edited-content', newData );
    }

    socket.on('client-edits-content', handleContentChange );  // when any user makes changes in editor
}

io.sockets.on( 'connection', newConnection );

