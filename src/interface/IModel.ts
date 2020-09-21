import {Signal} from "signals";
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
    runTime(): void;
    playSound(name: string): void;

    testHit(objOptions1: THitObjectOptions, objOptions2: THitObjectOptions): boolean;
}
