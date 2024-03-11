import { Player } from './Player.js';
import { xSpeed, ySpeed } from './playerControls.js';
import { socket, userID, players } from './socket.js'

const canvas = document.querySelector(".game-view");
const ctx = canvas.getContext("2d");
// Set canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameRate = 100;
const loopInterval = 1000/frameRate;

const user = new Player(canvas.width/2, canvas.height/2, userID);


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const [key, value] of Object.entries(players)) {
        let player = new Player(value.userX, value.userY);
        if(userID != key && key != ""){
            player.drawPlayer(ctx);
        }
    }

    user.x = user.x + xSpeed;
    user.y = user.y + ySpeed;
    user.drawPlayer(ctx);
    socket.emit('player coordinates', JSON.stringify({userid: userID, userX: user.x, userY: user.y}))
    setTimeout(()=>{
        requestAnimationFrame(animate);
    }, loopInterval)
    
}   
animate();