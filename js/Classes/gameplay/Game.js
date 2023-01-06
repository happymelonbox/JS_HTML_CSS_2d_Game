import Player from "./Player.js";
import InputHandler from "./InputHandler.js";
import UI from "../ui/UI.js";
import Angler1 from "../enemies/Angler1.js";
import Background from "../ui/Background.js";
import Angler2 from "../enemies/Angler2.js";
import Lucky from "../enemies/Lucky.js";


class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.keys = [];
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.ammo = 20;
            this.maxAmmo = 50;
            this.ammoTimer = 0;
            this.ammoInterval = 500;
            this.gameOver = false;
            this.score = 0;
            this.winningScore = 100;
            this.gameTime = 0;
            this.timeLimit = 30000;
            this.speed = 1;
            this.debug = true;
        }

        update(deltaTime){
            if(!this.gameOver) {
                this.gameTime += deltaTime;
            };
            if (this.gameTime > this.timeLimit){
                this.gameOver = true;
            };
            this.background.update();
            this.background.layer4.update();
            this.player.update();
            if(this.ammoTimer > this.ammoInterval){
                if (this.ammo < this.maxAmmo){
                    this.ammo++;
                }
                this.ammoTimer = 0;
            } else {
                this.ammoTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update();
                if (this.checkCollision(this.player, enemy)){
                    enemy.markedForDeletion = true;
                }
                this.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, enemy)){
                        enemy.lives--;
                        projectile.markedForDeletion = true;
                        if (enemy.lives <= 0){
                            enemy.markedForDeletion = true;
                            if (!this.gameOver){
                                this.score += enemy.score;
                            }
                            if (this.score > this.winningScore) this.gameOver = true;
                        }
                    }
                })
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
        }

        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.ui.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.background.layer4.draw(context);
        }

        addEnemy(){
            const randomize = Math.random();
            if (randomize < 0.5){
                this.enemies.push(new Angler1(this));
            } else if (randomize < 0.6){
                this.enemies.push(new Angler2(this));
            } else {
                this.enemies.push(new Lucky(this));
            }
        }

        checkCollision(rect1, rect2){
            return (
                // if left side of rect1 is to the left of right side of rect2
                rect1.x < rect2.x + rect2.width &&
                // if the right side of rect1 is to the right of the left side of rect2
                rect1.x + rect1.width > rect2.x &&
                // if top side of rect1 is above bottom side of rect2
                rect1.y < rect2.y + rect2.height &&
                // if bottom side of rect1 is below top of rect2
                rect1.height + rect1.y > rect2.y
            )
        }
    }

    export default Game;