import {Application, Container} from "pixi.js";
import {SceneView} from "./SceneView";

export class ActiveGameSceneView extends SceneView {
    constructor(app: Application) {
        super("Active Game", app);
        this.addBackground();
    }

    public addMap(mapDisplay: Container): void {
        this.display.addChild(mapDisplay);
    }

    public addPlayer(): void {}

    public addEnemies(): void {}
}
