import {isNil, some} from "lodash";
import {Signal} from "signals";
import {IModel} from "../interface/IModel";
import {ProxyLoader} from "./ProxyLoader";
import {TGameConfig} from "../type/TGameConfig";
import {StateMachine} from "../state_machine/StateMachine";
import {TankModel} from "./TankModel";
import {THitDisplayObject} from "../type/THitDisplayObject";
import {THitObjectOptions} from "../type/THitObjectOptions";

export class Model implements IModel {
    public width: number;
    public height: number;
    public deltaTime: number;
    public loader: ProxyLoader = new ProxyLoader();
    public onCommandExecute: Signal = new Signal();
    public gameConfig: TGameConfig;
    public readonly assetsPath: string = "assets/";
    public readonly configPath: string = this.assetsPath + "configs/";
    public readonly gameConfigName: string = "game_config.json";
    private _stateMachine: StateMachine = new StateMachine();
    private _tankModel: TankModel;

    constructor() {}

    public get stateMachine(): StateMachine {
        return this._stateMachine;
    }

    public setAppSizes(): void {
        this.width = this.gameConfig.sceneWidth;
        this.height = this.gameConfig.sceneHeight;
    }

    public get tank(): TankModel {
        if (isNil(this._tankModel)) {
            console.log("TankModel class is not initialized!");
        }
        return this._tankModel;
    }

    public set tank(tankModel: TankModel) {
        this._tankModel = tankModel;
    }

    public testHit(objOptions1: THitObjectOptions, objOptions2: THitObjectOptions): boolean {
        let hit: boolean = false;

        const displayObj1 = objOptions1.displayObj;
        const possiblePosition1 = objOptions1.possiblePosition;
        const isStaticObj1 = objOptions1.isStatic;

        const displayObj2 = objOptions2.displayObj;
        const possiblePosition2 = objOptions2.possiblePosition;
        const isStaticObj2 = objOptions2.isStatic;

        const obj1HalfWidth: number =
            displayObj1.angle === 90 || displayObj1.angle === 270 ? displayObj1.height / 2 : displayObj1.width / 2;
        const obj1HalfHeight: number =
            displayObj1.angle === 90 || displayObj1.angle === 270 ? displayObj1.width / 2 : displayObj1.height / 2;

        const obj1: THitDisplayObject = {
            centerX:
                (!isNil(possiblePosition1) ? possiblePosition1.x : displayObj1.x) +
                (isStaticObj1 ? displayObj1.width / 2 : 0),
            centerY:
                (!isNil(possiblePosition1) ? possiblePosition1.y : displayObj1.y) +
                (isStaticObj1 ? displayObj1.height / 2 : 0),
            halfWidth: obj1HalfWidth,
            halfHeight: obj1HalfHeight,
        };
        const obj2: THitDisplayObject = {
            centerX:
                (!isNil(possiblePosition2) ? possiblePosition2.x : displayObj2.x) +
                (isStaticObj2 ? displayObj2.width / 2 : 0),
            centerY:
                (!isNil(possiblePosition2) ? possiblePosition2.y : displayObj2.y) +
                (isStaticObj2 ? displayObj2.height / 2 : 0),
            halfWidth: displayObj2.width / 2,
            halfHeight: displayObj2.height / 2,
        };

        // calculate the distance vector between the sprites
        const vx: number = obj1.centerX - obj2.centerX;
        const vy: number = obj1.centerY - obj2.centerY;

        const combinedHalfWidths: number = obj1.halfWidth + obj2.halfWidth;
        const combinedHalfHeights: number = obj1.halfHeight + obj2.halfHeight;

        // check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {
            // check for a collision on the y axis
            hit = Math.abs(vy) < combinedHalfHeights;
        } else {
            hit = false;
        }

        return hit;
    }
}