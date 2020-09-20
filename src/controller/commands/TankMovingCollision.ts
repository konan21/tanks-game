import {BaseCommand} from "./BaseCommand";
import {Model} from "../../model/Model";
import {View} from "../../view/View";
import {IPointData, Sprite} from "pixi.js";
import {some} from "lodash";

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

                const checkBulletCollision = (tile: Sprite) => {
                    return this.model.testHit(
                        {displayObj: item.bullet, isStatic: false},
                        {displayObj: tile, isStatic: true}
                    );
                };

                if (some([...this.view.map.tiles, this.view.enemyTank.display], checkBulletCollision)) {
                    this.view.tank.removeBullet(item);
                    if (this.model.tileToRemove.name.includes("small_wall")) {
                        this.view.map.removeTile(this.model.tileToRemove);
                    } else if (this.model.tileToRemove.name.includes("Enemy Tank")) {
                        this.view.map.removeTile(this.model.tileToRemove);
                        this.view.enemyTank.destroy();
                    }
                }
            });
        }
    }
}
