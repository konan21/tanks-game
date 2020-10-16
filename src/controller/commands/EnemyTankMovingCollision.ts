import {BaseCommand} from "./BaseCommand";
import {Model} from "../../model/Model";
import {View} from "../../view/View";
import {IPointData, Sprite} from "pixi.js";
import {some} from "lodash";
import {EStateNames} from "../../enum/EStateNames";

export class EnemyTankMovingCollision extends BaseCommand<Model, View> {
    public execute() {
        if (this.view.enemyTank.isDestroyed) {
            return;
        }
        // enemy tank move collision
        this.model.enemyTank.position = {
            x: this.view.enemyTank.display.position.x + this.view.enemyTank.position.x * this.model.enemyTank.speed,
            y: this.view.enemyTank.display.position.y + this.view.enemyTank.position.y * this.model.enemyTank.speed,
        };
        this.view.enemyTank.autoMove();
        // if (this.model.time % 3 === 0) {
        //     this.view.enemyTank.direction = this.view.enemyTank.getRandomDirection();
        // }
        const checkEnemyTankCollision = (tile: Sprite) => {
            return this.model.testHit(
                {
                    displayObj: this.view.enemyTank.display,
                    possiblePosition: this.model.enemyTank.position,
                    isStatic: false,
                },
                {displayObj: tile, isStatic: true}
            );
        };
        if (!some(this.view.map.tiles, checkEnemyTankCollision)) {
            this.view.enemyTank.rotateTank();
            this.view.enemyTank.display.position.set(this.model.enemyTank.position.x, this.model.enemyTank.position.y);
            // console.log("enemy tank move to " + this.view.enemyTank.direction);
        } else {
            this.view.enemyTank.direction = this.view.enemyTank.getRandomDirection();
        }

        // enemy tank fire
        if (this.view.enemyTank.bullets.size > 0) {
            this.view.enemyTank.bullets.forEach((item: {bullet: Sprite; position: IPointData}) => {
                item.bullet.position.x += item.position.x * this.model.enemyTank.bulletSpeed;
                item.bullet.position.y += item.position.y * this.model.enemyTank.bulletSpeed;

                const checkEnemyBulletCollision = (tile: Sprite) => {
                    return this.model.testHit(
                        {displayObj: item.bullet, isStatic: false},
                        {displayObj: tile, isStatic: true}
                    );
                };

                if (some([...this.view.map.tiles, this.view.tank.display], checkEnemyBulletCollision)) {
                    this.view.enemyTank.removeBullet(item);
                    if (this.model.tileToRemove.name.includes("small_wall")) {
                        this.view.map.removeTile(this.model.tileToRemove);
                    } else if (
                        this.model.tileToRemove.name.includes("Player Tank") ||
                        this.model.tileToRemove.name.includes("eagle")
                    ) {
                        this.model.stateMachine.transition(EStateNames.GAME_OVER_LOSE);
                        console.log("GAME OVER!");
                    }
                }
            });
        }
    }
}
