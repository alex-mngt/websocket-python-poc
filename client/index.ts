const socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {
  // now we are connected
  socket.send("some text"); // send some text to server
};

socket.onmessage = (message) => {
  // here we got something sent from the server

  console.log(message);
};
