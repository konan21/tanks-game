import * as PIXI from "pixi.js";
window.PIXI = PIXI;
import "pixi-spine";
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

export class Context implements IContext<IModel, IView, IController> {
    private _model: Model;
    private _view: View;
    private _controller: Controller;
    private _ticker: Ticker;

    constructor() {
        this.init();
        // TODO: Start Loading gameConfig from assets (run command etc.)
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
        // TODO: set deltaTIme to model
        // TODO: redraw command (run framesUpdate method from View with deltaTime parameter from Model) and others commands
        this._model.deltaTime = deltaTime;
        this._view.framesUpdate(this._model.deltaTime);
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
        this._view = new View({
            width: this._model.width,
            height: this._model.height,
            backgroundColor: 0x000000,
        });
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
    }

    private executeCommands(): void {
        this._controller.executeCommand(ECommandNames.INIT_STATE_MACHINE);
        this._controller.executeCommand(ECommandNames.LOAD_GAME_CONFIG);

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

        this._model.onPreloadingStarted.addOnce(() => {
            this._controller.executeCommand(ECommandNames.LOAD_ASSETS);
        });
    }

    private createTicker(): void {
        this._ticker = Ticker.shared;
        this._ticker.add(this.gameLoop, this);
        this._ticker.start();
    }
}

new Context();
