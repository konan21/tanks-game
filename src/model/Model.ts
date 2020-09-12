import {IModel} from "../interface/IModel";
import {StateMachine} from "../state_machine/StateMachine";
import {Signal} from "signals";
import {TGameConfig} from "../type/TGameConfig";
import {ProxyLoader} from "./ProxyLoader";

export class Model implements IModel {
    private _stateMachine: StateMachine = new StateMachine();
    public readonly assetsPath: string = "assets/";
    public readonly configPath: string = this.assetsPath + "configs/";
    public readonly gameConfigName: string = "game_config.json";
    public gameConfig: TGameConfig;
    public width: number;
    public height: number;
    public deltaTime: number;
    public loader: ProxyLoader = new ProxyLoader();
    public onPreloadingStarted: Signal = new Signal();

    constructor() {
        // this.initLoaderEvents();
    }

    public get stateMachine(): StateMachine {
        return this._stateMachine;
    }

    public setAppSizes(): void {
        this.width = this.gameConfig.sceneWidth;
        this.height = this.gameConfig.sceneHeight;
    }
}
