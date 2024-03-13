// Function to calculate angle between two points
function getAngle(x, y, mouseX, mouseY) {
    // Calculate the difference in x and y coordinates
    const dx = mouseX - x;
    const dy = mouseY - y;
    
    // Use atan2 to calculate the angle
    const angle = Math.atan2(dy, dx);

    // Adjust angle to be positive
    return angle;
}

function getMousePos(event, canvas) {
    const rect = canvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

export{
    getAngle,
    getMousePos
}

