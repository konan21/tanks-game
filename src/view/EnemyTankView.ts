import {Container, IPointData, Sprite, Texture} from "pixi.js";
import {StringUtil} from "../util/StringUtil";

export class EnemyTankView {
    public isDestroyed: boolean = false;
    public direction: string = "top";
    public bullets: Map<string, {bullet: Sprite; position: IPointData}> = new Map();
    public position: IPointData = {x: 0, y: 0};
    private _display: Container = new Container();
    private _bulletTexture: Texture;
    private _bulletCounter: number = 0;
    private _fireInterval: {instance: any; amount: number} = {instance: undefined, amount: 2000};

    constructor(tankTexture: Texture, bulletTexture: Texture, name?: string) {
        this._display.name = `Enemy Tank ${name ? name : ""}`;
        this._bulletTexture = bulletTexture;
        this.draw(tankTexture);
        this._display.pivot.set(tankTexture.width / 2, tankTexture.height / 2);
        this._display.angle = 180;
        this.direction = this.getRandomHorizontalDirection();

        // Fire
        // TODO: update - setInterval wrong way for performance
        this._fireInterval.instance = setInterval(() => {
            this.fire();
        }, this._fireInterval.amount);
    }

    public get display(): Container {
        return this._display;
    }

    public destroy(): void {
        this.isDestroyed = true;
        clearInterval(this._fireInterval.instance);

        // TODO: add sprite animation
        // animation = new PIXI.AnimatedSprite(sheet.animations["explode"]);
        // animation.animationSpeed = 0.167;
        // animation.updateAnchor = true;     // update anchor for each animation frame
        // animation.play();
        // app.stage.addChild(animation);
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

    // TODO: move it from here
    public autoMove(): void {
        switch (this.direction) {
            case "left":
                this.position.x = -1;
                this.position.y = 0;
                break;
            case "top":
                this.position.y = -1;
                this.position.x = 0;
                break;
            case "right":
                this.position.x = 1;
                this.position.y = 0;
                break;
            case "bottom":
                this.position.y = 1;
                this.position.x = 0;
                break;
            default:
                console.warn(`${this._display.name} direction in autoMove() is not correct!`);
                break;
        }
    }

    public rotateTank(): void {
        switch (this.direction) {
            case "left":
                this._display.angle = 270;
                break;
            case "top":
                this._display.angle = 0;
                break;
            case "right":
                this._display.angle = 90;
                break;
            case "bottom":
                this._display.angle = 180;
                break;
            default:
                console.warn(`couldn't set angle for ${this._display.name}`);
                break;
        }
    }

    public getRandomDirection(): string {
        return this.randomDirection(["top", "bottom", "left", "right"]);
    }

    public getRandomVerticalDirection(): string {
        return this.randomDirection(["top", "bottom"]);
    }

    public getRandomHorizontalDirection(): string {
        return this.randomDirection(["left", "right"]);
    }

    private randomDirection(directions: Array<string>): string {
        const min: number = 0;
        const max: number = directions.length - 1;
        return directions[Math.floor(Math.random() * (max - min + 1)) + min];
    }

    private draw(tankTexture: Texture) {
        const tank: Sprite = new Sprite(tankTexture);
        this._display.addChild(tank);
    }
}
