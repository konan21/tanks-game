import * as PIXI from "pixi.js";
window.PIXI = PIXI;
import "pixi-spine";
import {IPointData, Sprite, Ticker} from "pixi.js";
import {each, isNil, some} from "lodash";
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
                this._view.preloadingScene.updateProgressBar(this._model.loader.progress);
            }
        } else if (this._model.stateMachine.currentState instanceof ActiveGameState) {
            this._model.tank.position = {
                x: this._view.tank.display.position.x + this._view.tank.position.x * this._model.tank.speed,
                y: this._view.tank.display.position.y + this._view.tank.position.y * this._model.tank.speed,
            };

            // check for a collision before move tank
            const checkTankCollision = (tile: Sprite) => {
                return this._model.testHit(
                    {
                        displayObj: this._view.tank.display,
                        possiblePosition: this._model.tank.position,
                        isStatic: false,
                    },
                    {displayObj: tile, isStatic: true}
                );
            };
            if (!some(this._view.map.tiles, checkTankCollision)) {
                this._view.tank.display.position.set(this._model.tank.position.x, this._model.tank.position.y);
            }

            // tank fire
            if (this._view.tank.bullets.size > 0) {
                this._view.tank.bullets.forEach((item: {bullet: Sprite; position: IPointData}) => {
                    item.bullet.position.x += item.position.x * this._model.tank.bulletSpeed;
                    item.bullet.position.y += item.position.y * this._model.tank.bulletSpeed;

                    const checkBulletCollision = (tile: Sprite) => {
                        return this._model.testHit(
                            {displayObj: item.bullet, isStatic: false},
                            {displayObj: tile, isStatic: true}
                        );
                    };

                    if (some(this._view.map.tiles, checkBulletCollision)) {
                        this._view.tank.removeBullet(item);
                        if (this._model.tileToRemove.name.includes("small_wall")) {
                            this._view.map.removeTile(this._model.tileToRemove);
                        }
                    }
                });
            }
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

new Context();
