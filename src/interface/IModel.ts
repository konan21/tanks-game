import {Signal} from "signals";
import {TGameConfig} from "../type/TGameConfig";
import {ProxyLoader} from "../model/ProxyLoader";
import {StateMachine} from "../state_machine/StateMachine";

export interface IModel {
    width: number;
    height: number;
    deltaTime: number;
    loader: ProxyLoader;
    assetsPath: string;
    configPath: string;
    gameConfig: TGameConfig;
    onPreloadingStarted: Signal;
    stateMachine: StateMachine;
}
