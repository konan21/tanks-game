import {each, find, isNil} from "lodash";
import {Application, Container, Graphics, spine, Texture} from "pixi.js";
import {SceneView} from "./SceneView";
import {PreloadingSceneView} from "./PreloadingSceneView";
import {MainMenuSceneView} from "./MainMenuSceneView";
import {ActiveGameSceneView} from "./ActiveGameSceneView";
import {MapView} from "./MapView";
import {TankView} from "./TankView";
import {EnemyTankView} from "./EnemyTankView";
import {GameOverSceneView} from "./GameOverSceneView";
import {EStateNames} from "../enum/EStateNames";
import {IView} from "../interface/IView";
import {TPixiAppOptions} from "../type/TPixiAppOptions";
import {TScene} from "../type/TScene";
import Spine = spine.Spine;

export class View implements IView {
    public scenes: Map<string, SceneView> = new Map();
    private _map: MapView = new MapView();
    private _tank: TankView;
    private _enemyTank: EnemyTankView;
    private _app: Application;
    private _scenes: Array<TScene> = [];

    constructor(options?: TPixiAppOptions) {
        this.initScenes();
    }

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

    // TODO: remove any
    public getSceneByName(name: string): any {
        return find(this._scenes, (scene: TScene) => scene.name === name).classInstance;
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

    private initScenes(): void {
        this._scenes = [
            {
                name: EStateNames.PRELOADING,
                class: PreloadingSceneView,
            },
            {
                name: EStateNames.MAIN_MENU,
                class: MainMenuSceneView,
            },
            {
                name: EStateNames.ACTIVE_GAME,
                class: ActiveGameSceneView,
            },
            {
                name: EStateNames.GAME_OVER_LOSE,
                class: GameOverSceneView,
            },
        ];
    }

    private drawScenes(): void {
        each(this._scenes, (scene: TScene) => {
            scene.classInstance = new scene.class(this.app);
            this.addScene(scene.classInstance);
        });
    }
}
