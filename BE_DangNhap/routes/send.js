const io = require("socket.io-client");
const socket = io("http://localhost:3000", { withCredentials: true });

socket.on("connect", () => {
    console.log("Connected to server:", socket.id);
    socket.emit("message", "Hello from Node.js client 1!");
});

socket.on("message", (msg) => {
    console.log("Received:", msg);
});
