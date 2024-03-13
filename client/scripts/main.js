import { Player } from './Player.js';
import { xSpeed, ySpeed, color, mouseAngle, charging } from './playerControls.js';
import { socket, userID, players } from './socket.js'

const canvas = document.querySelector(".game-view");
const ctx = canvas.getContext("2d");


// Set canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 100 FPS cap
const frameRate = 100;
const loopInterval = 1000/frameRate;

// init for client player
const user = new Player(canvas.width/2, canvas.height/2, color,userID);

// Image element for charge action
let chargeArrow = new Image();
chargeArrow.src = './images/arrow.webp';

// For export
let userX = user.x;
let userY = user.y;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add other players to clients view
    for (const [key, value] of Object.entries(players)) {
        let player = new Player(value.userX, value.userY, value.userColor);
        if(userID != key && key != ""){
            player.drawPlayer(ctx);
        }
    }

    if(charging){
        ctx.save();
        ctx.translate(userX, userY);
        ctx.rotate(mouseAngle);
        console.log(mouseAngle);
        ctx.drawImage(chargeArrow, -16, -7.5, 32, 15);
        ctx.restore();
    }

    // Update client player
    user.x = user.x + xSpeed;
    user.y = user.y + ySpeed;
    user.color = color;
    user.drawPlayer(ctx);

    // Update for export
    userX = user.x;
    userY = user.y;

    // Emit the clients info to the server
    socket.emit('player info', JSON.stringify({userid: userID, userX: user.x, userY: user.y, userColor: user.color}))
    setTimeout(()=>{
        requestAnimationFrame(gameLoop);
    }, loopInterval)
    
}   
gameLoop();

export{
    canvas,
    userX,
    userY
}