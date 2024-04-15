import { spawn } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";

import uWS from "uWebSockets.js";

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
      const tempFolder = `${import.meta.dirname}/.temp`;

      if (!existsSync(tempFolder)) {
        mkdirSync(tempFolder);
      }

      writeFileSync(`${tempFolder}/screenshot.webp`, Buffer.from(message));

      const process = spawn("python3", ["scripts/test.py"], {
        cwd: import.meta.dirname,
      });

      process.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });

      process.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      process.on("close", (code) => {
        console.log(`child process exited with code ${code}`);

        if (code === 0) {
          const res = ws.send("glasses");
        } else {
          const res = ws.send("no glasses");
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
