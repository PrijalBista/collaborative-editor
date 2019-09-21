const socket = io.connect("http://192.168.1.162:3000");

let editor = document.getElementById('editor');
editor.contentEditable = true;
editor.focus();


handleContentChange = (e)=> {
    socket.emit('client-edits-content', { text:e.target.innerHTML });
}

editor.addEventListener( 'input', handleContentChange);

// When opened for the first time update editor with existing data
updateContent= data => {
    editor.innerHTML = data.text;
}
socket.on('newUser', updateContent);

socket.on('other-client-edited-content', updateContent);
