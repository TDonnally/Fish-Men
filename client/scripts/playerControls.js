let xSpeed = 0;
let ySpeed = 0;
let velocity = 5;
const keysDown = []


// Function to move the square
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
// Function for key release
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

// Event listener for keydown event
document.addEventListener("keydown", function(event) {
    keysDown[event.key] = true;
        
    const keyPressed = event.key.toUpperCase();
    if (["W", "A", "S", "D"].includes(keyPressed)) {
        moveCharacter(keyPressed);
    }
});
// Event listener for keydown event
document.addEventListener("keyup", function(event) {
    const keyReleased = event.key.toUpperCase();
    if (["W", "A", "S", "D"].includes(keyReleased)) {
        stopCharacter(keyReleased);
    }
});


export{
    xSpeed,
    ySpeed
}