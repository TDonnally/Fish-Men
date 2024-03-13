class Player {
    constructor(x, y, color, id){
        this.x = x;
        this.y = y;
        this.id = id;
        this.color = color
    }

    drawPlayer(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 50, 50);
    }
}

export{
    Player
}