import { canvas } from "./main.js";

// Function to calculate angle between two points
function getAngle(x, y, mouseX, mouseY) {
    // Calculate the difference in x and y coordinates
    const dx = mouseX - x;
    const dy = mouseY - y;
    
    // Use atan2 to calculate the angle
    const angle = Math.atan2(dy, dx);

    // Convert radians to degrees
    const degrees = angle * (180 / Math.PI);

    // Adjust angle to be positive
    return (degrees + 360) % 360;
}

function getMousePos(event, canvas) {
    const rect = canvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

document.addEventListener("DOMContentLoaded", function(e) {
    // Event listener for mousemove event
    canvas.addEventListener("mousemove", function(event) {
        // Get the mouse position relative to the canvas
        const mousePos = getMousePos(event, canvas);

        // Log the mouse coordinates
        console.log(mousePos.x);
        console.log(mousePos.y);
    });
})

