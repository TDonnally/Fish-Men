class Player {
    constructor(x, y, id,sprite){
        this.x = x;
        this.y = y;
        this.id = id;
    }

    drawPlayer(ctx){
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, 50, 50);
    }
}

export{
    Player
}