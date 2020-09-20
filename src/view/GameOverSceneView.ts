import {SceneView} from "./SceneView";
import {Application, Text, TextStyle} from "pixi.js";

export class GameOverSceneView extends SceneView {
    constructor(app: Application) {
        super("Game Over", app);
        this.addBackground();
        this.addText();
    }

    private addText(): void {
        const styles: TextStyle = new TextStyle({
            fontFamily: "serif",
            fontSize: 72,
            fill: 0xffffff,
        });
        const text: Text = new Text("GAME OVER!", styles);
        text.position.x = this._app.screen.width / 2;
        text.position.y = this._app.screen.height / 2;
        text.anchor.set(0.5);
        this.display.addChild(text);
    }
}
