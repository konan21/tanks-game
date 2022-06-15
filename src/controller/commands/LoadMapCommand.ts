import {includes, find, findIndex} from "lodash";
import {Texture} from "pixi.js";
import {BaseCommand} from "./BaseCommand";
import {Model} from "../../model/Model";
import {View} from "../../view/View";
import {MapModel, EEntityType} from "../../model/MapModel";
import {EImageNames} from "../../enum/EImageNames";
import {TankView} from "../../view/TankView";
import {TankModel} from "../../model/TankModel";
import {EnemyTankView} from "../../view/EnemyTankView";
import {EAssetsNames} from "../../enum/EAssetsNames";
import {EStateNames} from "../../enum/EStateNames";
import {NumberUtil} from "../../util/NumberUtil";

export class LoadMapCommand extends BaseCommand<Model, View> {
    private _mainTileToCalc: Texture;

    public execute(): void {
        this.loadMap();
        this.setRandomEnemyTanks()
    }

    private loadMap(): void {
        for (let i = 0; i < MapModel.cols; i++) {
            for (let j = 0; j < MapModel.rows; j++) {
                const tile: number = MapModel.getTile(j, i);

                switch (tile) {
                    case EEntityType.SMALL_WALL:
                        this.createSmallWalls(i, j);
                        break;
                    case EEntityType.WALL:
                        this.createWalls(i, j);
                        break;
                    case EEntityType.EAGLE:
                        this.createEagle(i, j);
                        break;
                    case EEntityType.PLAYER_TANK:
                        this.createPlayerTank(i, j);
                        break;
                    case EEntityType.ENEMY_TANK:
                        // this.createEnemyTank(i, j);
                        break;
                    case EEntityType.EMPTY_SPACE:
                    case EEntityType.WATER:
                    case EEntityType.LEAVES:
                        break;
                    default:
                        console.warn("Tile not found!", tile);
                        break;
                }
            }
        }
        this.view.getSceneByName(EStateNames.ACTIVE_GAME).addMap(this.view.map.display);
    }

    private setRandomEnemyTanks(): void {
        const emptySpaces: Array<{i: number, j: number}> = [];
        for (let i = 0; i < MapModel.cols; i++) {
            for (let j = 0; j < MapModel.rows; j++) {
                if (MapModel.getTile(j, i) === EEntityType.EMPTY_SPACE) {
                    emptySpaces.push({j, i});
                }
            }
        }
        for (let i = 0; i < MapModel.countEnemyTanks; i++) {
            const randomEnemyPosition = emptySpaces[NumberUtil.getRandom(0, emptySpaces.length - 1)];
            this.createEnemyTank(randomEnemyPosition.i, randomEnemyPosition.j);
        }
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
        this.model.enemyTankModels.push(new TankModel());
        const enemyTankView = new EnemyTankView(enemyTank, enemyBullet);
        this.view.enemyTanks.push(enemyTankView);
        this.view.map.addTank(x, y, enemyTankView.display);
    }
}
