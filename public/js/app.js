const socket = io();

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
	let cursorPosition = editor.getCursor();
    
    editor.setValue(data.text);
    
    editor.setCursor(cursorPosition);
}
// When opened for the first time update editor with existing data
socket.on('newUser', updateContent);

// When any other client makes changes to the content update the editor with updatedContent
socket.on('other-client-edited-content', updateContent);
