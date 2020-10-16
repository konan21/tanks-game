import {includes} from "lodash";
import {Texture} from "pixi.js";
import {BaseCommand} from "./BaseCommand";
import {Model} from "../../model/Model";
import {View} from "../../view/View";
import {MapModel} from "../../model/MapModel";
import {EImageNames} from "../../enum/EImageNames";
import {TankView} from "../../view/TankView";
import {TankModel} from "../../model/TankModel";
import {EnemyTankView} from "../../view/EnemyTankView";
import {EAssetsNames} from "../../enum/EAssetsNames";
import {EStateNames} from "../../enum/EStateNames";

export class LoadMapCommand extends BaseCommand<Model, View> {
    private _mainTileToCalc: Texture;

    public execute() {
        for (let i = 0; i < MapModel.cols; i++) {
            for (let j = 0; j < MapModel.rows; j++) {
                const tile: number = MapModel.getTile(j, i);

                switch (tile) {
                    case 1:
                        this.createSmallWalls(i, j);
                        break;
                    case 2:
                        this.createWalls(i, j);
                        break;
                    case 7:
                        this.createEagle(i, j);
                        break;
                    case 8:
                        this.createPlayerTank(i, j);
                        break;
                    case 9:
                        this.createEnemyTank(i, j);
                        break;
                    case 0:
                    case 3:
                    case 4:
                        break;
                    default:
                        console.warn("Tile not found!", tile);
                        break;
                }
            }
        }
        this.view.getSceneByName(EStateNames.ACTIVE_GAME).addMap(this.view.map.display);
    }

    private createSmallWalls(i: number, j: number): void {
        let x: number;
        let y: number;
        let tileTexture: Texture;

        tileTexture = this.model.loader.resources.spritesheet.textures[EImageNames.SMALL_WALL_1];
        x = i * tileTexture.width * 2;
        y = j * tileTexture.height * 2;
        this.view.map.addTile(x, y, tileTexture, EAssetsNames.SMALL_WALLS);

        tileTexture = this.model.loader.resources.spritesheet.textures[EImageNames.SMALL_WALL_2];
        x = i * tileTexture.width * 2 + tileTexture.width;
        y = j * tileTexture.height * 2;
        this.view.map.addTile(x, y, tileTexture, EAssetsNames.SMALL_WALLS);

        tileTexture = this.model.loader.resources.spritesheet.textures[EImageNames.SMALL_WALL_3];
        x = i * tileTexture.width * 2;
        y = j * tileTexture.height * 2 + tileTexture.height;
        this.view.map.addTile(x, y, tileTexture, EAssetsNames.SMALL_WALLS);

        tileTexture = this.model.loader.resources.spritesheet.textures[EImageNames.SMALL_WALL_4];
        x = i * tileTexture.width * 2 + tileTexture.width;
        y = j * tileTexture.height * 2 + tileTexture.height;
        this.view.map.addTile(x, y, tileTexture, EAssetsNames.SMALL_WALLS);
    }

    private createWalls(i: number, j: number): void {
        const tileTexture = this.model.loader.resources.spritesheet.textures[EImageNames.WALL];
        const x = i * tileTexture.width;
        const y = j * tileTexture.height;
        this.view.map.addTile(x, y, tileTexture, EAssetsNames.WALLS);
    }

    private createEagle(i: number, j: number): void {
        const tileTexture = this.model.loader.resources.spritesheet.textures[EImageNames.EAGLE];
        const x = i * this.model.pointOfMap.width;
        const y = j * this.model.pointOfMap.height;
        this.view.map.addTile(x, y, tileTexture);
    }

    private createPlayerTank(i: number, j: number): void {
        const tank: Texture = this.model.loader.resources.spritesheet.textures[EImageNames.TANK];
        const bullet: Texture = this.model.loader.resources.spritesheet.textures[EImageNames.BULLET];
        const x = i * this.model.pointOfMap.width + tank.width / 2;
        const y = j * this.model.pointOfMap.height + tank.height / 2;
        this.model.tank = new TankModel();
        this.view.tank = new TankView(tank, bullet);
        this.view.map.addTank(x, y, this.view.tank.display);
    }

    private createEnemyTank(i: number, j: number): void {
        const enemyTank: Texture = this.model.loader.resources.spritesheet.textures[EImageNames.TANK_ENEMY_RED];
        const enemyBullet: Texture = this.model.loader.resources.spritesheet.textures[EImageNames.BULLET_ENEMY];
        const x = i * this.model.pointOfMap.width + enemyTank.width / 2;
        const y = j * this.model.pointOfMap.height + enemyTank.height / 2;
        this.model.enemyTank = new TankModel();
        this.view.enemyTank = new EnemyTankView(enemyTank, enemyBullet);
        this.view.map.addTank(x, y, this.view.enemyTank.display);
    }
}
