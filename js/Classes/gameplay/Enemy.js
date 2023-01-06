class Enemy {
    constructor(game){
        this.game = game;
        this.x = this.game.width;
        this.speedX = Math.random() * -1.5 - 0.5;
        this.markedForDeletion = false;
        this.lives = 5;
        this.score = this.lives;
    }
    update(){
        this.x += this.speedX;
        if (this.x + this.width < 0){
            this.markedForDeletion = true;
        }
    }
    draw(context){
        if (this.game.debug){
            context.strokeRect(this.x, this.y, this.width, this.height);
        };
        context.fillStyle = "black";
        context.font = "20px Helvetica";
        context.fillText(this.lives, this.x, this.y);
    }
};

export default Enemy;