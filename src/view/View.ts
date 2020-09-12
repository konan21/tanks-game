import {isNil} from "lodash";
import {Application, Container, Graphics, spine} from "pixi.js";
import {IView} from "../interface/IView";
import {TPixiAppOptions} from "../type/TPixiAppOptions";
import Spine = spine.Spine;
import {SceneView} from "./SceneView";
import {PreloadingSceneView} from "./PreloadingSceneView";
import {MainMenuSceneView} from "./MainMenuSceneView";
import {ActiveGameSceneView} from "./ActiveGameSceneView";

export class View implements IView {
    public scenes: Map<string, SceneView> = new Map();
    private _app: Application;
    private _preloadingScene: PreloadingSceneView;
    private _mainMenuScene: MainMenuSceneView;
    private _activeGameScene: ActiveGameSceneView;

    constructor(options?: TPixiAppOptions) {}

    public framesUpdate(deltaTime: number): void {}

    public drawApp(width: number, height: number) {
        this._app = new Application({
            width: width,
            height: height,
            // transparent: true,
            // backgroundColor: 0x86D0F2
        });
        document.getElementById("root").appendChild(this._app.view);
        this.drawScenes();

        // const graphics: Graphics = new Graphics();
        // graphics.beginFill(0xde3249);
        // graphics.drawRect(0, 0, 100, 100);
        // graphics.endFill();
        // graphics.name = "My Rect";

        // const testScene: SceneView = new SceneView("TEST");
        // this.addScene(testScene);
        // testScene.display.addChild(graphics);

        // this.drawLine();
    }

    public get preloadingScene(): PreloadingSceneView {
        return this._preloadingScene;
    }

    public get mainMenuScene(): MainMenuSceneView {
        return this._mainMenuScene;
    }

    public get activeGameScene(): ActiveGameSceneView {
        return this._activeGameScene;
    }

    public addScene(scene: SceneView): void {
        const name: string = scene.display.name;
        if (this.scenes.has(name)) {
            console.warn(`Scene with name ${name} already exist!`);
            return;
        }
        this._app.stage.addChild(scene.display);
        this.scenes.set(name, scene);
    }

    public removeScene(name: string): void {
        if (this.scenes.has(name)) {
            this._app.stage.removeChild(this.scenes.get(name).display);
            this.scenes.delete(name);
        } else {
            console.log(`Can't remove scene with name ${name}, because it doesn't exist!`);
        }
    }

    public get app(): Application | undefined {
        if (isNil(this._app)) {
            console.warn("PIXI Application wasn't inited!");
            return;
        }
        return this._app;
    }

    // private drawLine() {
    //   const line: Graphics = new Graphics();
    //   line.lineStyle(10, 0xd5402b, 1);
    //   line.position.x = this.app.screen.width / 2;
    //   line.position.y = this.app.screen.height / 2;
    //   line.pivot.set(0, 140);
    //   line.rotation = 0.785398;
    //   line.moveTo(5, 0);
    //   line.lineTo(5, 280);
    //   this.app.stage.addChild(line);
    // }

    private drawScenes(): void {
        this._preloadingScene = new PreloadingSceneView(this.app);
        this.addScene(this._preloadingScene);

        this._mainMenuScene = new MainMenuSceneView(this.app);
        this.addScene(this._mainMenuScene);

        this._activeGameScene = new ActiveGameSceneView(this.app);
        this.addScene(this._activeGameScene);
    }
}
