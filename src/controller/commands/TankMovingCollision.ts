import {BaseCommand} from "./BaseCommand";
import {Model} from "../../model/Model";
import {View} from "../../view/View";
import {EnemyTankView} from "../../view/EnemyTankView";
import {IPointData, Sprite, Container} from "pixi.js";
import {some, find} from "lodash";

export class TankMovingCollision extends BaseCommand<Model, View> {
    public execute() {
        // check for a collision before move player tank
        this.model.tank.position = {
            x: this.view.tank.display.position.x + this.view.tank.position.x * this.model.tank.speed,
            y: this.view.tank.display.position.y + this.view.tank.position.y * this.model.tank.speed,
        };
        const checkTankCollision = (tile: Sprite) => {
            return this.model.testHit(
                {
                    displayObj: this.view.tank.display,
                    possiblePosition: this.model.tank.position,
                    isStatic: false,
                },
                {displayObj: tile, isStatic: true}
            );
        };
        if (!some(this.view.map.tiles, checkTankCollision)) {
            this.view.tank.display.position.set(this.model.tank.position.x, this.model.tank.position.y);
        }

        // tank fire
        if (this.view.tank.bullets.size > 0) {
            this.view.tank.bullets.forEach((item: {bullet: Sprite; position: IPointData}) => {
                item.bullet.position.x += item.position.x * this.model.tank.bulletSpeed;
                item.bullet.position.y += item.position.y * this.model.tank.bulletSpeed;

                const checkBulletCollision = (tile: Sprite | Container) => {
                    return this.model.testHit(
                        {displayObj: item.bullet, isStatic: false},
                        {displayObj: tile, isStatic: true}
                    );
                };

                const enemyTanksDisplays = this.view.enemyTanks.map((enemyTankView: EnemyTankView) => enemyTankView.display);
                if (some([...this.view.map.tiles, ...enemyTanksDisplays], checkBulletCollision)) {
                    this.view.tank.removeBullet(item);
                    const tileName = this.model.tileToRemove.name;
                    if (tileName.includes("small_wall")) {
                        this.view.map.removeTile(this.model.tileToRemove);
                    } else if (tileName.includes("Enemy Tank")) {
                        const enemyTank = find(this.view.enemyTanks, (enemyTankView: EnemyTankView) => {
                            return enemyTankView.display === this.model.tileToRemove;
                        });
                        enemyTank.destroy();
                        this.view.map.removeTile(this.model.tileToRemove);
                    } else if (tileName.includes("eagle")) {
                        console.log("player shooting in eagle");
                    }
                }
            });
        }
    }
}
