import { useEffect, useRef } from "react";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.play();

        const webcamVideoStreamSettings = stream
          .getVideoTracks()[0]
          .getSettings();

        if (
          !webcamVideoStreamSettings.width ||
          !webcamVideoStreamSettings.height
        ) {
          return;
        }

        canvas.width = webcamVideoStreamSettings.width;
        canvas.height = webcamVideoStreamSettings.height;
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });
  }, []);

  useEffect(() => {
    let interval: number;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    let connectCount = 0;

    if (!video || !canvas) {
      return;
    }

    const connect = () => {
      const socket = new WebSocket("ws://localhost:3000");

      socket.onopen = () => {
        // now we are connected
        interval = setInterval(() => {
          if (socket.readyState !== WebSocket.OPEN) {
            clearInterval(interval);
          }

          const context = canvas.getContext("2d");

          if (!context) {
            return;
          }

          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            async (blob) => {
              if (!blob) {
                return;
              }

              socket.send(await blob.arrayBuffer());
            },
            "image/webp",
            0
          );
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
        if (connectCount < 5) {
          setTimeout(() => {
            connect();
            connectCount++;
          }, 1000);
        } else {
          console.log("Failed to connect after 5 attempts");
        }
      };
    };

    connect();
    connectCount++;

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main>
      <video
        className="h-screen w-screen object-cover object-center"
        ref={videoRef}
      />
      <canvas className="hidden" ref={canvasRef} />
    </main>
  );
}

export default App;
