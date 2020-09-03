import {IState} from "./IState";

export interface IStateMachineOptions {
    states?: Map<string, IState>;
    currentState?: IState | null;
}
