import express, { json } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { randomBytes } from "crypto";

const app = express();
app.use(express.json());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5500",
        methods: ["GET", "POST"]
      }
});
let playerCoordinates = {};
io.on("connection", (socket) => {
    console.log("connection")
    socket.emit("userID", randomBytes(9).toString("hex"));
    socket.on('player info', (msg) => {
        const data = JSON.parse(msg);
        playerCoordinates[data.userid] = {userX: data.userX, userY: data.userY, userColor: data.userColor};
        socket.emit(("players info"), playerCoordinates);
    });
    socket.on('disconnect user', (id) => {
        console.log(id, "has disconnected");
        delete playerCoordinates[id];

    })
});

httpServer.listen(3000,() => {
    console.log("listening on Port 3000");
});