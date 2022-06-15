// import * as PIXI from "pixi.js";
// window.PIXI = PIXI;
// import "pixi-spine";
import {Ticker} from "pixi.js";
import "../index.scss";
import {Model} from "./model/Model";
import {View} from "./view/View";
import {Controller} from "./controller/Controller";
import {IContext} from "./interface/IContext";
import {IModel} from "./interface/IModel";
import {IView} from "./interface/IView";
import {IController} from "./interface/IController";
import {ECommandNames} from "./enum/ECommandNames";
import {LoadAssetsCommand} from "./controller/commands/LoadAssetsCommand";
import {LoadGameConfigCommand} from "./controller/commands/LoadGameConfigCommand";
import {InitStateMachineCommand} from "./controller/commands/InitStateMachineCommand";
import {EStateNames} from "./enum/EStateNames";
import {LoadSubConfigsCommand} from "./controller/commands/LoadSubConfigsCommand";
import {EAssetsAliases} from "./enum/EAssetsAliases";
import {DrawAppCommand} from "./controller/commands/DrawAppCommand";
import {LoadMapCommand} from "./controller/commands/LoadMapCommand";
import {ActiveGameState} from "./state_machine/states/ActiveGameState";
import {PreloadingState} from "./state_machine/states/PreloadingState";
import {TankMovingCollision} from "./controller/commands/TankMovingCollision";
import {EnemyTankMovingCollision} from "./controller/commands/EnemyTankMovingCollision";

export class Context implements IContext<IModel, IView, IController> {
    private _model: Model;
    private _view: View;
    private _controller: Controller;
    private _ticker: Ticker;

    constructor() {
        this.init();
    }

    public init(): void {
        this.createModel();
        this.createView();
        this.createController();
        this.createTicker();
        this.registerCommands();
        this.executeCommands();
    }

    public gameLoop(deltaTime: number): void {
        this._model.deltaTime = deltaTime;
        // this._view.framesUpdate(this._model.deltaTime);

        if (this._model.stateMachine.currentState instanceof PreloadingState) {
            if (this._model.loader.progress !== 100) {
                this._view.getSceneByName(EStateNames.PRELOADING).updateProgressBar(this._model.loader.progress);
            }
        } else if (this._model.stateMachine.currentState instanceof ActiveGameState) {
            //TODO: temporary solution - refactor it
            this._controller.executeCommand(ECommandNames.TANK_MOVING_COLLISION);
            this._controller.executeCommand(ECommandNames.ENEMY_TANK_MOVING_COLLISION);
        }
    }

    public getModel(): IModel {
        return this._model;
    }

    public getView(): IView {
        return this._view;
    }

    public getController(): IController {
        return this._controller;
    }

    private createModel(): void {
        this._model = new Model();
    }

    private createView(): void {
        this._view = new View();
    }

    private createController(): void {
        this._controller = new Controller(this);
    }

    private registerCommands(): void {
        this._controller.registerCommand(ECommandNames.INIT_STATE_MACHINE, InitStateMachineCommand);
        this._controller.registerCommand(ECommandNames.LOAD_GAME_CONFIG, LoadGameConfigCommand);
        this._controller.registerCommand(ECommandNames.LOAD_SUB_CONFIGS, LoadSubConfigsCommand);
        this._controller.registerCommand(ECommandNames.LOAD_ASSETS, LoadAssetsCommand);
        this._controller.registerCommand(ECommandNames.DRAW_APP, DrawAppCommand);
        this._controller.registerCommand(ECommandNames.LOAD_MAP, LoadMapCommand);
        this._controller.registerCommand(ECommandNames.TANK_MOVING_COLLISION, TankMovingCollision);
        this._controller.registerCommand(ECommandNames.ENEMY_TANK_MOVING_COLLISION, EnemyTankMovingCollision);
    }

    private executeCommands(): void {
        this._controller.executeCommand(ECommandNames.INIT_STATE_MACHINE);
        this._controller.executeCommand(ECommandNames.LOAD_GAME_CONFIG);

        // window.addEventListener("resize", () => {
        //     this._view.app.renderer.resize(window.innerWidth, window.innerHeight);
        // });

        this._model.loader.onAssetsLoaded.add((alias: string) => {
            switch (alias) {
                case EAssetsAliases.GAME_CONFIG:
                    this._controller.executeCommand(ECommandNames.DRAW_APP);
                    this._controller.executeCommand(ECommandNames.LOAD_SUB_CONFIGS);
                    break;
                case EAssetsAliases.SUB_CONFIGS:
                    this._model.stateMachine.transition(EStateNames.PRELOADING);
                    break;
                case EAssetsAliases.GAME_ASSETS:
                    console.log(this._model.loader.resources);
                    this._model.stateMachine.transition(EStateNames.MAIN_MENU);
                    break;
            }
        });

        this._model.onCommandExecute.add((enumCommandName: string) => {
            this._controller.executeCommand(enumCommandName);
        });
    }

    private createTicker(): void {
        this._ticker = Ticker.shared;
        this._ticker.add(this.gameLoop, this);
        this._ticker.start();
    }
}
