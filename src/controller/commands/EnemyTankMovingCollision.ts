import {BaseCommand} from "./BaseCommand";
import {Model} from "../../model/Model";
import {View} from "../../view/View";
import {IPointData, Sprite} from "pixi.js";
import {some, isNil, forEach} from "lodash";
import {EStateNames} from "../../enum/EStateNames";
import {EnemyTankView} from "../../view/EnemyTankView";
import {TankModel} from "../../model/TankModel";

export class EnemyTankMovingCollision extends BaseCommand<Model, View> {
    public execute(): void {
        forEach(this.view.enemyTanks, (enemyTankView: EnemyTankView, index: number) => {
            const enemyTankModel = this.model.enemyTankModels[index];
            if (isNil(enemyTankModel)) {
                console.warn("Enemy Tank Model is not defined! Automove and collisions will not work!");
                return;
            }
            this.enemyCollisions(enemyTankView, enemyTankModel);
        });
    }

    public enemyCollisions(enemyTankView: EnemyTankView, enemyTankModel: TankModel): void {
        if (enemyTankView.isDestroyed) {
            return;
        }
        // enemy tank move collision
        enemyTankModel.position = {
            x: enemyTankView.display.position.x + enemyTankView.position.x * enemyTankModel.speed,
            y: enemyTankView.display.position.y + enemyTankView.position.y * enemyTankModel.speed,
        };
        enemyTankView.autoMove();
        // if (this.model.time % 3 === 0) {
        //     enemyTankView.direction = enemyTankView.getRandomDirection();
        // }
        const checkEnemyTankCollision = (tile: Sprite) => {
            return this.model.testHit(
                {
                    displayObj: enemyTankView.display,
                    possiblePosition: enemyTankModel.position,
                    isStatic: false,
                },
                {displayObj: tile, isStatic: true}
            );
        };
        if (!some(this.view.map.tiles, checkEnemyTankCollision)) {
            enemyTankView.rotateTank();
            enemyTankView.display.position.set(enemyTankModel.position.x, enemyTankModel.position.y);
            // console.log("enemy tank move to " + enemyTankView.direction);
        } else {
            enemyTankView.direction = enemyTankView.getRandomDirection();
        }

        // enemy tank fire
        if (enemyTankView.bullets.size > 0) {
            enemyTankView.bullets.forEach((item: {bullet: Sprite; position: IPointData}) => {
                item.bullet.position.x += item.position.x * enemyTankModel.bulletSpeed;
                item.bullet.position.y += item.position.y * enemyTankModel.bulletSpeed;

                const checkEnemyBulletCollision = (tile: Sprite) => {
                    return this.model.testHit(
                        {displayObj: item.bullet, isStatic: false},
                        {displayObj: tile, isStatic: true}
                    );
                };

                if (some([...this.view.map.tiles, this.view.tank.display], checkEnemyBulletCollision)) {
                    enemyTankView.removeBullet(item);
                    if (this.model.tileToRemove.name.includes("small_wall")) {
                        this.view.map.removeTile(this.model.tileToRemove);
                    } else if (
                        this.model.tileToRemove.name.includes("Player Tank") ||
                        this.model.tileToRemove.name.includes("eagle")
                    ) {
                        this.model.stateMachine.transition(EStateNames.GAME_OVER_LOSE);
                        // TODO: move text to one place (assets/translations)
                        console.log("GAME OVER!");
                    }
                }
            });
        }
    }
}
