import Game from "./classes/gameplay/Game.js"

window.addEventListener("load", ()=>{
    
    //canvas setup
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    //animation loop
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0 , 0, canvas.width, canvas.height)
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
})