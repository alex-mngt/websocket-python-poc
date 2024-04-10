import { spawn } from "child_process";

const uWS = require("uWebSockets.js");

const port = 3000;

const app = uWS
  .App()
  .ws("/*", {
    /* Options */
    compression: uWS.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 10,
    /* Handlers */
    open: (ws) => {
      console.log("A WebSocket connected!");
    },
    message: (ws, message, isBinary) => {
      /* Ok is false if backpressure was built up, wait for drain */

      const process = spawn("python3", ["test.py"]);
      process.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });
      process.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });
      process.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
        if (code === 0) {
          ws.send("glasses");
        } else {
          ws.send("no glasses");
        }
      });
    },
    drain: (ws) => {
      console.log("WebSocket backpressure: " + ws.getBufferedAmount());
    },
    close: (ws, code, message) => {
      console.log("WebSocket closed");
    },
  })
  .any("/*", (res, req) => {
    res.end("Nothing to see here!");
  })
  .listen(port, (token) => {
    if (token) {
      console.log("Listening to port " + port);
    } else {
      console.log("Failed to listen to port " + port);
    }
  });
