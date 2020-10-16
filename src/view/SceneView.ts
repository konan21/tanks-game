import {Application, Container, Graphics} from "pixi.js";

export class SceneView {
    protected _app: Application;
    private _display: Container = new Container();

    constructor(name: string, app: Application) {
        this._display.name = `${name} Scene`;
        this._app = app;
        this.hide();
    }

    public get display(): Container {
        return this._display;
    }

    public show(): void {
        this._display.alpha = 1;
        this._display.visible = true;
    }

    public hide(): void {
        this._display.alpha = 0;
        this._display.visible = false;
    }

    public addBackground(color: number = 0x112233) {
        const background: Graphics = new Graphics();
        background.beginFill(color);
        background.drawRect(0, 0, this._app.screen.width, this._app.screen.height);
        background.endFill();
        background.name = "Background";
        this._display.addChild(background);
    }
}
