const socket = io.connect("http://192.168.1.162:3000");

let editor = CodeMirror(document.body, {
  value: "#include <stdio.h>\n \nint main(){\n \n}",
  //mode:  "javascript",
  mode: "text/x-c++src",
  lineNumbers: true,
  tabSize:2,
});


handleContentChange = (changeObj)=> {
    socket.emit('client-edits-content', { text:editor.getValue() });
}
// Whenever User use editor to make changes to the content propagate this change to all other clients 
editor.on('keyup', handleContentChange );

updateContent= data => {
	if(data.text=='') return;
    editor.setValue(data.text);
}
// When opened for the first time update editor with existing data
socket.on('newUser', updateContent);

// When any other client makes changes to the content update the editor with updatedContent
socket.on('other-client-edited-content', updateContent);
