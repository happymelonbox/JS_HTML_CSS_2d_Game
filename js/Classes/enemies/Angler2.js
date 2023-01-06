import Enemy from "../gameplay/Enemy.js";

class Angler2 extends Enemy{
    constructor(game){
        super(game);
        this.width = 213;
        this.height = 165;
        this.y = Math.random() * (this.game.height * 0.9 - this.height);
        this.image = document.getElementById("angler2");
        this.frameY = Math.floor(Math.random() * 2);
    }
}

export default Angler2;