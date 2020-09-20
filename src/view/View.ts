import {isNil} from "lodash";
import {Application, Container, Graphics, spine, Texture} from "pixi.js";
import {IView} from "../interface/IView";
import {TPixiAppOptions} from "../type/TPixiAppOptions";
import Spine = spine.Spine;
import {SceneView} from "./SceneView";
import {PreloadingSceneView} from "./PreloadingSceneView";
import {MainMenuSceneView} from "./MainMenuSceneView";
import {ActiveGameSceneView} from "./ActiveGameSceneView";
import {MapView} from "./MapView";
import {TankView} from "./TankView";
import {EnemyTankView} from "./EnemyTankView";
import {GameOverSceneView} from "./GameOverSceneView";

export class View implements IView {
    public scenes: Map<string, SceneView> = new Map();
    private _map: MapView = new MapView();
    private _tank: TankView;
    private _enemyTank: EnemyTankView;
    private _app: Application;
    private _preloadingScene: PreloadingSceneView;
    private _mainMenuScene: MainMenuSceneView;
    private _activeGameScene: ActiveGameSceneView;
    private _gameOverScene: GameOverSceneView;

    constructor(options?: TPixiAppOptions) {}

    /**
     * @deprecated
     */
    public framesUpdate(deltaTime: number): void {}

    public drawApp(options?: TPixiAppOptions) {
        if (isNil(options)) {
            options = {
                width: 1024,
                height: 768,
                // transparent: true,
                // backgroundColor: 0x86d0f2,
            };
        }
        this._app = new Application(options);
        document.getElementById("root").appendChild(this._app.view);
        this.drawScenes();
    }

    public get map(): MapView {
        if (isNil(this._map)) {
            console.log("MapView class is not initialized!");
        }
        return this._map;
    }

    public get tank(): TankView {
        if (isNil(this._tank)) {
            console.log("TankView class is not initialized!");
        }
        return this._tank;
    }

    public set tank(tank: TankView) {
        this._tank = tank;
    }

    public get enemyTank(): EnemyTankView {
        if (isNil(this._enemyTank)) {
            console.log("EnemyTankView class is not initialized!");
        }
        return this._enemyTank;
    }

    public set enemyTank(tank: EnemyTankView) {
        this._enemyTank = tank;
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

    public get gameOverScene(): GameOverSceneView {
        return this._gameOverScene;
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

    private drawScenes(): void {
        this._preloadingScene = new PreloadingSceneView(this.app);
        this.addScene(this._preloadingScene);

        this._mainMenuScene = new MainMenuSceneView(this.app);
        this.addScene(this._mainMenuScene);

        this._activeGameScene = new ActiveGameSceneView(this.app);
        this.addScene(this._activeGameScene);

        this._gameOverScene = new GameOverSceneView(this.app);
        this.addScene(this._gameOverScene);
    }
}
