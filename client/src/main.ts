const connect = () => {
  const socket = new WebSocket("ws://localhost:3000");

  socket.onopen = () => {
    // now we are connected
    setInterval(() => {
      socket.send("some text"); // send some text to server
    }, 1000);
  };

  socket.onmessage = (message) => {
    // here we got something sent from the server
    console.log(message.data);
  };

  socket.onclose = () => {
    // connection closed
    console.log("Connection closed");
    // Try to reconnect after a delay
    setTimeout(connect, 1000);
  };
};

connect();
