import {Application, Container} from "pixi.js";
import {SceneView} from "./SceneView";

export class ActiveGameSceneView extends SceneView {
    constructor(app: Application) {
        super("Active Game", app);
        this.addBackground();
    }

    public addMap(): void {
        const map: Container = new Container();

        this.display.addChild(map);
    }

    public addPlayer(): void {}

    public addEnemies(): void {}
}
