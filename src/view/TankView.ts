import {Container, IPointData, Sprite, Texture} from "pixi.js";
import {keyboard, TKey} from "../util/keyboard";
import {StringUtil} from "../util/StringUtil";

export class TankView {
    public direction: string = "top";
    public bullets: Map<string, {bullet: Sprite; position: IPointData}> = new Map();
    public position: IPointData = {x: 0, y: 0};
    private _display: Container = new Container();
    private _bulletTexture: Texture;
    private _keyLeft: TKey = keyboard("ArrowLeft");
    private _keyUp: TKey = keyboard("ArrowUp");
    private _keyRight: TKey = keyboard("ArrowRight");
    private _keyDown: TKey = keyboard("ArrowDown");
    private _keySpace: TKey = keyboard(" ");
    private _bulletCounter: number = 0;

    constructor(tankTexture: Texture, bulletTexture: Texture, name?: string) {
        this._display.name = `${name ? name + " " : ""}Player Tank`;
        this._bulletTexture = bulletTexture;
        this.draw(tankTexture);
        this.addKeyboardEventListeners();
        this._display.pivot.set(tankTexture.width / 2, tankTexture.height / 2);
    }

    public get display(): Container {
        return this._display;
    }

    public removeBullet(item: {bullet: Sprite; position: IPointData}): void {
        // item.position.x = 0;
        // item.position.y = 0;
        // item.bullet.position.set(-item.bullet.width, -item.bullet.height);
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
    private addKeyboardEventListeners(): void {
        // Left arrow key `press` method
        this._keyLeft.press = () => {
            // Change the velocity when the key is pressed
            this.position.x = -1;
            this.position.y = 0;
            this._display.angle = 270;
            this.direction = "left";
        };
        // Left arrow key `release` method
        this._keyLeft.release = () => {
            // If the left arrow has been released, and the right arrow isn't down,
            // and the tank isn't moving vertically:
            // Stop the tank
            if (!this._keyRight.isDown && this.position.y === 0) {
                this.position.x = 0;
            }
        };

        // Up
        this._keyUp.press = () => {
            this.position.y = -1;
            this.position.x = 0;
            this._display.angle = 0;
            this.direction = "top";
        };
        this._keyUp.release = () => {
            if (!this._keyDown.isDown && this.position.x === 0) {
                this.position.y = 0;
            }
        };

        // Right
        this._keyRight.press = () => {
            this.position.x = 1;
            this.position.y = 0;
            this._display.angle = 90;
            this.direction = "right";
        };
        this._keyRight.release = () => {
            if (!this._keyLeft.isDown && this.position.y === 0) {
                this.position.x = 0;
            }
        };

        // Down
        this._keyDown.press = () => {
            this.position.y = 1;
            this.position.x = 0;
            this._display.angle = 180;
            this.direction = "bottom";
        };
        this._keyDown.release = () => {
            if (!this._keyUp.isDown && this.position.x === 0) {
                this.position.y = 0;
            }
        };

        // Space
        this._keySpace.press = () => {
            this.fire();
        };
    }
}
