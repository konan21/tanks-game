import * as PIXI from "pixi.js";
window.PIXI = PIXI;
import "pixi-spine";
import {Ticker} from "pixi.js";
import "../index.scss";
import {TanksGameModel} from "./model/TanksGameModel";
import {TanksGameView} from "./view/TanksGameView";
import {TanksGameController} from "./controller/TanksGameController";
import {ITanksGameContext} from "./interface/ITanksGameContext";
import {ITanksGameModel} from "./interface/ITanksGameModel";
import {ITanksGameView} from "./interface/ITanksGameView";
import {ITanksGameController} from "./interface/ITanksGameController";
import {ETanksGameCommandNames} from "./enum/ETanksGameCommandNames";
import {TanksGameLoadAssetsCommand} from "./controller/commands/TanksGameLoadAssetsCommand";

export class TanksGameContext implements ITanksGameContext<ITanksGameModel, ITanksGameView, ITanksGameController> {
    private _model: TanksGameModel;
    private _view: TanksGameView;
    private _controller: TanksGameController;
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
    }

    public getModel(): ITanksGameModel {
        return this._model;
    }

    public getView(): ITanksGameView {
        return this._view;
    }

    public getController(): ITanksGameController {
        return this._controller;
    }

    private createModel(): void {
        this._model = new TanksGameModel();
    }

    private createView(): void {
        this._view = new TanksGameView({
            width: this._model.width,
            height: this._model.height,
            backgroundColor: 0x000000,
        });
    }

    private createController(): void {
        this._controller = new TanksGameController(this);
    }

    private registerCommands(): void {
        this._controller.registerCommand(ETanksGameCommandNames.LOAD_ASSETS, TanksGameLoadAssetsCommand);
    }

    private executeCommands(): void {
        this._controller.executeCommand(ETanksGameCommandNames.LOAD_ASSETS);
    }

    private createTicker(): void {
        this._ticker = Ticker.shared;
        this._ticker.add(this.gameLoop, this);
        this._ticker.start();
    }
}

new TanksGameContext();
