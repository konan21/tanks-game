import {Application, Container, Sprite, Text, TextStyle, Texture} from "pixi.js";
import {SceneView} from "./SceneView";

export class MainMenuSceneView extends SceneView {
    // TODO: remove it (send position as parameter)
    private OFFSET: number = 100;

    constructor(app: Application) {
        super("Main Menu", app);
        this.addBackground();
        this.addText();
    }

    // TODO: Create button class as ui_component
    public addButton(texture: Texture, cb: Function): void {
        const button: Container = new Container();
        const buttonSkin: Sprite = new Sprite(texture);

        button.name = "Button";
        button.buttonMode = true;
        button.interactive = true;
        button.on("pointerdown", () => {
            button.alpha = 0.7;
        });
        button.on("mouseout", () => {
            button.alpha = 1;
        });
        button.on("pointerup", () => {
            button.alpha = 1;
            cb();
        });

        button.position.x = this._app.screen.width / 2 - texture.width / 2;
        button.position.y = this._app.screen.height / 2 - texture.height / 2 + this.OFFSET;

        button.addChild(buttonSkin);
        this.display.addChild(button);
    }

    // TODO: move styles to one place (as constants)
    private addText(): void {
        const styles: TextStyle = new TextStyle({
            fontFamily: "serif",
            fontSize: 72,
            fill: 0xffffff,
        });
        const text: Text = new Text("Tanks Game", styles);
        text.position.x = this._app.screen.width / 2;
        text.position.y = this._app.screen.height / 2 - this.OFFSET;
        text.anchor.set(0.5);
        this.display.addChild(text);
    }
}
