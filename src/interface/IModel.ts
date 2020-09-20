import {Signal} from "signals";
import {Container, IPointData, Sprite} from "pixi.js";
import {TGameConfig} from "../type/TGameConfig";
import {ProxyLoader} from "../model/ProxyLoader";
import {StateMachine} from "../state_machine/StateMachine";
import {TankModel} from "../model/TankModel";
import {THitObjectOptions} from "../type/THitObjectOptions";

export interface IModel {
    width: number;
    height: number;
    deltaTime: number;
    loader: ProxyLoader;
    assetsPath: string;
    configPath: string;
    gameConfig: TGameConfig;
    onCommandExecute: Signal;
    stateMachine: StateMachine;
    tank: TankModel;

    // testHit(displayObj1: Container | Sprite, displayObj2: Container | Sprite): boolean;
    testHit(objOptions1: THitObjectOptions, objOptions2: THitObjectOptions): boolean;
}
