import {StateMachine} from "../state_machine/StateMachine";

export interface ITanksGameModel {
    width: number;
    height: number;
    deltaTime: number;
    stateMachine: StateMachine;
}
