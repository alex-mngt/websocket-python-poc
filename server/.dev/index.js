import { spawn } from "child_process";
import uWS from "uWebSockets.js";
var port = 3000;
var app = uWS.App().ws("/*", {
    /* Options */ compression: uWS.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 10,
    /* Handlers */ open: function(ws) {
        console.log("A WebSocket connected!");
    },
    message: function(ws, message, isBinary) {
        var process = spawn("python3", [
            "scripts/test.py"
        ], {
            cwd: import.meta.dirname
        });
        process.stdout.on("data", function(data) {
            console.log("stdout: ".concat(data));
        });
        process.stderr.on("data", function(data) {
            console.error("stderr: ".concat(data));
        });
        process.on("close", function(code) {
            console.log("child process exited with code ".concat(code));
            if (code === 0) {
                ws.send("glasses");
            } else {
                ws.send("no glasses");
            }
        });
    },
    drain: function(ws) {
        console.log("WebSocket backpressure: " + ws.getBufferedAmount());
    },
    close: function(ws, code, message) {
        console.log("WebSocket closed");
    }
}).any("/*", function(res, req) {
    res.end("Nothing to see here!");
}).listen(port, function(token) {
    if (token) {
        console.log("Listening to port " + port);
    } else {
        console.log("Failed to listen to port " + port);
    }
});
