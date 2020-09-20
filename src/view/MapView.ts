import {isEqual, some} from "lodash";
import {Container, ParticleContainer, Sprite, Texture} from "pixi.js";

export class MapView {
    private _display: Container = new Container();
    private _tiles: Array<Sprite> = [];
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

    public get tiles(): Array<Sprite> {
        return this._tiles;
    }

    public addTile(x: number, y: number, texture: Texture, containerName?: string): void {
        const tile: Sprite = new Sprite(texture);
        tile.position.set(x, y);
        tile.name = texture.textureCacheIds[0].replace(/\..*/, "");
        switch (containerName) {
            case "walls":
                this._walls.addChild(tile);
                break;
            case "small_walls":
                this._smallWalls.addChild(tile);
                break;
            default:
                this._display.addChild(tile);
                break;
        }
        this._tiles.push(tile);
    }

    public removeTile(tile: Sprite): void {
        // if (some(this._smallWalls.children, (cTile: Sprite) => isEqual(cTile, tile))) {
        //     this._smallWalls.removeChild(tile);
        //     return;
        // }
        this._display.removeChild(tile);
        // or check for x and y axises
        this._tiles = this._tiles.filter((cTile: Sprite) => isEqual(cTile, tile));
    }

    public getTile(x: number, y: number, name?: string): Sprite {
        return this._tiles[0];
    }

    public addTank(x: number, y: number, tankDisplay: Container): void {
        tankDisplay.position.set(x, y);
        this._display.addChild(tankDisplay);
    }
}
