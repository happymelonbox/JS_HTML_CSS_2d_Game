import Enemy from "../gameplay/Enemy.js";

class Angler1 extends Enemy{
    constructor(game){
        super(game);
        this.width = 228;
        this.height = 169;
        this.lives = 3;
        this.score = this.lives;
        this.y = Math.random() * (this.game.height * 0.9 - this.height);
        this.image = document.getElementById("angler1");
        this.frameY = Math.floor(Math.random() * 3);
    }
}

export default Angler1;