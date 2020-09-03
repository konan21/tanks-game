import {ITanksGameModel} from "../interface/ITanksGameModel";
import {StateMachine} from "../state_machine/StateMachine";

export class TanksGameModel implements ITanksGameModel {
    public width: number;
    public height: number;
    public deltaTime: number;
    private _stateMachine: StateMachine = new StateMachine();

    constructor() {
        // TODO: remove code below and get that data from gameConfig.json
        this.width = 768;
        this.height = 1024;
    }

    public get stateMachine(): StateMachine {
        return this._stateMachine;
    }
}
