import Layer from "./Layer.js";

class Background {
    constructor(game){
        this.game = game;
        this.image1 = document.getElementById("layer1");
        this.layer1 = new Layer(this.game, this.image1, 1)
        this.layers = [this.layer1]
    }

    update(){
        this.layers.forEach(layer => layer.update())
    }

    draw(context){
        this.layers.forEach(layer => layer.draw(context))
    }
}

export default Background;