import {isEqual, some} from "lodash";
import {Container, DisplayObject, ParticleContainer, Sprite, Texture} from "pixi.js";
import {StringUtil} from "../util/StringUtil";
import {EAssetsNames} from "../enum/EAssetsNames";

export class MapView {
    private _display: Container = new Container();
    private _tiles: Array<Container | Sprite> = [];
    private _walls: ParticleContainer = new ParticleContainer();
    private _smallWalls: ParticleContainer = new ParticleContainer();

    constructor() {
        this._display.name = "Map";
        this._walls.name = "Walls";
        this._smallWalls.name = "Small walls";
        this._display.addChild(this._walls, this._smallWalls);
    }

    public get display(): Container {
        return this._display;
    }

    public get tiles(): Array<Container | Sprite> {
        return this._tiles;
    }

    public addTile(x: number, y: number, texture: Texture, containerName?: string): void {
        const tile: Sprite = new Sprite(texture);
        tile.position.set(x, y);
        tile.name = `${StringUtil.getFileName(texture.textureCacheIds[0])}_${this._tiles.length}`;
        switch (containerName) {
            case EAssetsNames.WALLS:
                this._walls.addChild(tile);
                break;
            case EAssetsNames.SMALL_WALLS:
                this._smallWalls.addChild(tile);
                break;
            default:
                this._display.addChild(tile);
                break;
        }
        this._tiles.push(tile);
    }

    public removeTile(tile: Container | Sprite): void {
        if (this._display.getChildByName(tile.name)) {
            this._display.removeChild(tile);
        } else if (this._smallWalls.getChildByName(tile.name)) {
            this._smallWalls.removeChild(tile);
        }
        // TODO: optimize using splice()
        this._tiles = this._tiles.filter((cTile: Container | Sprite) => cTile.name !== tile.name);
    }

    public getTile(x: number, y: number, name?: string) {}

    public addTank(x: number, y: number, tankDisplay: Container): void {
        tankDisplay.position.set(x, y);
        this._display.addChild(tankDisplay);
    }

    public get smallWalls(): Array<DisplayObject> {
        return this._smallWalls.children;
    }
}
