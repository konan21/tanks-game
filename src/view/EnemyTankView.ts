import {Container, IPointData, Sprite, Texture} from "pixi.js";
import {keyboard, TKey} from "../util/keyboard";
import {StringUtil} from "../util/StringUtil";

export class EnemyTankView {
    public direction: string = "top";
    public bullets: Map<string, {bullet: Sprite; position: IPointData}> = new Map();
    public position: IPointData = {x: 0, y: 0};
    private _display: Container = new Container();
    private _bulletTexture: Texture;
    private _bulletCounter: number = 0;
    private _fireInterval: number = 3000;

    constructor(tankTexture: Texture, bulletTexture: Texture, name?: string) {
        this._display.name = `Enemy Tank ${name ? name : ""}`;
        this._bulletTexture = bulletTexture;
        this.draw(tankTexture);
        this.autoMove();
        this._display.pivot.set(tankTexture.width / 2, tankTexture.height / 2);
    }

    public get display(): Container {
        return this._display;
    }

    public removeBullet(item: {bullet: Sprite; position: IPointData}): void {
        this._display.parent.removeChild(item.bullet);
        if (this.bullets.has(item.bullet.name)) {
            this.bullets.delete(item.bullet.name);
        }
    }

    public fire(): void {
        const bullet: Sprite = new Sprite(this._bulletTexture);
        const position: IPointData = {x: 0, y: 0};
        bullet.position.set(this._display.position.x, this._display.position.y);
        bullet.name = `${StringUtil.getFileName(this._bulletTexture.textureCacheIds[0])}_${this._bulletCounter++}`;
        this._display.parent.addChild(bullet);

        switch (this.direction) {
            case "top":
                position.y = -1;
                break;
            case "right":
                position.x = 1;
                break;
            case "bottom":
                position.y = 1;
                break;
            case "left":
                position.x = -1;
                break;
            default:
                console.warn(`${this._display.name} direction didn't set`);
                break;
        }

        this.bullets.set(bullet.name, {
            bullet: bullet,
            position: position,
        });
    }

    private draw(tankTexture: Texture) {
        const tank: Sprite = new Sprite(tankTexture);
        this._display.addChild(tank);
    }

    // TODO: move method to the Command & position, angle, direction move to TankModel
    private autoMove(): void {
        // Left
        this.position.x = -1;
        this.position.y = 0;
        this._display.angle = 270;
        this.direction = "left";

        // Up
        this.position.y = -1;
        this.position.x = 0;
        this._display.angle = 0;
        this.direction = "top";

        // Right
        this.position.x = 1;
        this.position.y = 0;
        this._display.angle = 90;
        this.direction = "right";

        // Down
        this.position.y = 1;
        this.position.x = 0;
        this._display.angle = 180;
        this.direction = "bottom";

        // Fire
        setInterval(() => {
            this.fire();
        }, this._fireInterval);
    }
}
