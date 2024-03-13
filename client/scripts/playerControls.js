/**
 * Controls:
 * WASD = move character
 * Spacebar = dash
 * LMB = charge and throw long range attack
 * RMB = Swipe with short range attack
 */


import { canvas, userX, userY } from "./main.js";
import { getAngle, getMousePos } from "./mouse.js";

let xSpeed = 0;
let ySpeed = 0;
let color = 'black';
let velocity = 5;
let mouseAngle = 0;
let charging = false;
const keysDown = [];


//move the character(WASD)
function moveCharacter(direction) {
    switch(direction) {
        case "W":
            ySpeed = -velocity;
            keysDown["w"] = true;
            break;
        case "S":
            ySpeed = velocity;
            keysDown["s"] = true;
            break;
        case "A":
            xSpeed = -velocity;
            keysDown["a"] = true;
            break;
        case "D":
            xSpeed = velocity;
            keysDown["d"] = true;
            break;
    }
}
//stop the character on WASD release
function stopCharacter(direction) {
    switch(direction) {
        case "W":
            if(keysDown["s"] == true){
                ySpeed = -velocity;
            }
            else{
                ySpeed = 0;
            }
            keysDown["w"] = false;
            break;
        case "S":
            if(keysDown["w"] == true){
                ySpeed = velocity;
            }
            else{
                ySpeed = 0;
            }
            keysDown["s"] = false;
            break;
        case "A":
            if(keysDown["d"] == true){
                xSpeed = velocity;
            }
            else{
                xSpeed = 0;
            }
            keysDown["a"] = false;
            break;
        case "D":
            if(keysDown["a"] == true){
                xSpeed = -velocity;
            }
            else{
                xSpeed = 0;
            }
            keysDown["d"] = false;
            break;
    }
}
//charge long range attack on LMB down
function chargeHook(direction){
    if(ySpeed != 0){
        ySpeed = ySpeed/velocity;
    }
    if(xSpeed != 0){
        xSpeed = xSpeed/velocity;
    }
    velocity = 1;
    color = "red";
    charging = true;
    console.log("charging");
}
//throw long range attack on LMB release
function throwHook(direction){
    if(xSpeed != 0){
        xSpeed = xSpeed * 5;
    }
    if(ySpeed != 0){
        ySpeed = ySpeed * 5;
    }
    velocity = 5;
    color = "black";
    charging = false;
    console.log("throwing");
}
//swipe on RMB click 
function swipeBlade(direction){
    console.log("swipe");
}
//dash when spacebar is pressed
function dash(direction){
    console.log("dashing")
}
// Event listener for keydown event
document.addEventListener("keydown", function(event) {
    keysDown[event.key] = true;
        
    const keyPressed = event.key.toUpperCase();
    if (["W", "A", "S", "D"].includes(keyPressed)) {
        moveCharacter(keyPressed);
    }
    if (keyPressed == " "){
        dash();
    }
});
// Event listener for keydown event
document.addEventListener("keyup", function(event) {
    const keyReleased = event.key.toUpperCase();
    if (["W", "A", "S", "D"].includes(keyReleased)) {
        stopCharacter(keyReleased);
    }
});
//Event listener for mouse down
document.addEventListener("mousedown", function(event) {
    event.preventDefault();
    const mouseButtonPressed = event.button;
    switch(mouseButtonPressed){
        case 0: 
            chargeHook();
            break;
        case 2:
            swipeBlade();
            break;
    }
})
//Event listener for mouse release
document.addEventListener("mouseup", function(event) {
    event.preventDefault();
    const mouseButtonReleased = event.button;
    switch(mouseButtonReleased){
        case 0:
            throwHook();
            break;
    }
})
//Prevent menu from opening on right click
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});
//Get mouse angle for charge up, long range attack, and slash
document.addEventListener("DOMContentLoaded", function(e) {
    // Event listener for mousemove event
    canvas.addEventListener("mousemove", function(event) {
        // Get the mouse position relative to the canvas
        const mousePos = getMousePos(event, canvas);

        // Log the angle
        mouseAngle = (getAngle(userX, userY, mousePos.x, mousePos.y));
    });
})

export{
    xSpeed,
    ySpeed, 
    color,
    mouseAngle,
    charging
}

