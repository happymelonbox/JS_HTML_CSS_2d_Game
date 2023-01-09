import Projectile from "./Projectile.js";

class Player {
    constructor(game){
        this.game = game;
        this.width = 120;
        this.height = 190;
        this.x = 20;
        this.y = 150;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 37;
        this.speedY = 0;
        this.maxSpeed = 2;
        this.projectiles = [];
        this.image = document.getElementById("player");
        this.powerUp = false;
        this.powerUpTimer = 0;
        this.powerUpLimit = 10000;
    }
    update(deltaTime){
            if (this.game.keys.includes("ArrowUp") && this.y > 0){
                this.speedY = -this.maxSpeed;
            } else if (this.game.keys.includes("ArrowDown") && this.y < (500 - (this.height * 0.1))){
                this.speedY = this.maxSpeed;
            } else {
                this.speedY = 0;
            }
        this.y += this.speedY;

        //handle projectiles
        this.projectiles.forEach(projectile => {
            projectile.update()
        });
        this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
        // sprite animation
        if (this.frameX < this.maxFrame){
            this.frameX++;
        } else {
            this.frameX = 0;
        }

        //power up
        if (this.powerUp){
            if (this.powerUpTimer > this.powerUpLimit){
                this.powerUpTimer = 0;
                this.powerUp = false;
                this.frameY = 0;
            } else {
                this.powerUpTimer += deltaTime;
                this.frameY = 1;
                this.game.ammo += 0.1
            }
        }
    }
    draw(context){
        if (this.game.debug){
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        this.projectiles.forEach(projectile => {
            projectile.draw(context)
        })
    }
    shootTop(){
        if (this.game.ammo > 0){
        this.projectiles.push(new Projectile(this.game, this.x, this.y));
        this.game.ammo--;
        }
    }
    enterPowerUp(){

    }
};

export default Player;