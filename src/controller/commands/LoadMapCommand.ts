import {Texture} from "pixi.js";
import {BaseCommand} from "./BaseCommand";
import {Model} from "../../model/Model";
import {View} from "../../view/View";
import {MapModel} from "../../model/MapModel";
import {EImageNames} from "../../enum/EImageNames";
import {TankView} from "../../view/TankView";
import {TankModel} from "../../model/TankModel";

export class LoadMapCommand extends BaseCommand<Model, View> {
    public execute() {
        let tile: number = 0;
        let x: number = 0;
        let y: number = 0;
        let tileTexture: Texture;

        for (let i = 0; i < MapModel.cols; i++) {
            for (let j = 0; j < MapModel.rows; j++) {
                tile = MapModel.getTile(j, i);

                switch (tile) {
                    case 1:
                        tileTexture = this.model.loader.resources.spritesheet.textures[EImageNames.SMALL_WALL_1];
                        x = i * tileTexture.width * 2;
                        y = j * tileTexture.height * 2;
                        this.view.map.addTile(x, y, tileTexture, "small_walls");

                        tileTexture = this.model.loader.resources.spritesheet.textures[EImageNames.SMALL_WALL_2];
                        x = i * tileTexture.width * 2 + tileTexture.width;
                        y = j * tileTexture.height * 2;
                        this.view.map.addTile(x, y, tileTexture, "small_walls");

                        tileTexture = this.model.loader.resources.spritesheet.textures[EImageNames.SMALL_WALL_3];
                        x = i * tileTexture.width * 2;
                        y = j * tileTexture.height * 2 + tileTexture.height;
                        this.view.map.addTile(x, y, tileTexture, "small_walls");

                        tileTexture = this.model.loader.resources.spritesheet.textures[EImageNames.SMALL_WALL_4];
                        x = i * tileTexture.width * 2 + tileTexture.width;
                        y = j * tileTexture.height * 2 + tileTexture.height;
                        this.view.map.addTile(x, y, tileTexture, "small_walls");
                        break;
                    case 2:
                        tileTexture = this.model.loader.resources.spritesheet.textures[EImageNames.WALL];
                        x = i * tileTexture.width;
                        y = j * tileTexture.height;
                        this.view.map.addTile(x, y, tileTexture, "walls");
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 7:
                        tileTexture = this.model.loader.resources.spritesheet.textures[EImageNames.EAGLE];
                        x = i * tileTexture.width;
                        y = j * tileTexture.height;
                        this.view.map.addTile(x, y, tileTexture);
                        break;
                    case 8:
                        const tank: Texture = this.model.loader.resources.spritesheet.textures[EImageNames.TANK];
                        const bullet: Texture = this.model.loader.resources.spritesheet.textures[EImageNames.BULLET];
                        x = i * tank.width + tank.width / 2;
                        y = j * tank.height + tank.height / 2;
                        this.model.tank = new TankModel();
                        this.view.tank = new TankView(tank, bullet);
                        this.view.map.addTank(x, y, this.view.tank.display);
                        break;
                    case 9:
                    case 0:
                        break;
                    default:
                        console.warn("Tile not found!", tile);
                        break;
                }
            }
        }
        this.view.activeGameScene.addMap(this.view.map.display);
    }
}
