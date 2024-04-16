import { spawn } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";

import uWS from "uWebSockets.js";

const port = 3000;
let pythonProcess = null;
let lastResponse: "glasses" | "no glasses";

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

      const tempFilePath = `${tempFolder}/screenshot.webp`;

      writeFileSync(tempFilePath, Buffer.from(message));

      const pythonInterpreter = `${
        import.meta.dirname
      }/python/.venv/bin/python`;

      if (pythonProcess === null) {
        pythonProcess = spawn(
          pythonInterpreter,
          [`python/detector.py`, tempFilePath],
          {
            cwd: import.meta.dirname,
          }
        );

        pythonProcess.stdout.on("data", (data) => {
          console.log(`stdout: ${data}`);
        });

        pythonProcess.stderr.on("data", (data) => {
          console.error(`stderr: ${data}`);
        });

        pythonProcess.on("close", (code: number) => {
          console.log(`child process exited with code ${code}`);

          pythonProcess = null;
          lastResponse = code === 1 ? "glasses" : "no glasses";
          ws.send(lastResponse);
        });
      } else {
        ws.send(lastResponse);
      }
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
