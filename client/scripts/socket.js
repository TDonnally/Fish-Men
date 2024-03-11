import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

const socket = io("http://localhost:3000");
let userID = "";
let players = {};

socket.on("connect", () => {
    console.log("connected");
});
socket.on("userID", (id) => {
    userID = id;
    console.log(userID);
});
socket.on("players coordinates", (playersCoordinates) => {
    players = playersCoordinates;
});

window.addEventListener('beforeunload', function(event) {
    socket.emit("disconnect user", (userID));
    socket.disconnect();
});
export{
    socket,
    userID,
    players
}