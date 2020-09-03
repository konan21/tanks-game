import {IState} from "./interface/IState";
import {IStateMachineOptions} from "./interface/IStateMachineOptions";

export class StateMachine {
    public states: Map<string, IState>;
    public currentState: IState | null;

    /**
     * @param options - optionally include states or contextual awareness
     */
    constructor(options: IStateMachineOptions = {}) {
        this.currentState = null;
        this.states = new Map();

        if (options.states) {
            this.states = options.states;
        }
        if (options.currentState) {
            this.currentState = options.currentState;
        }
    }

    /**
     * @param name
     * @param stateInstance
     */
    public addState(name: string, stateInstance: IState): void {
        this.states.set(name, stateInstance);
    }

    /**
     * This is the most important function — it allows programmatically driven
     * changes in state, such as calling myStateMachine.transition("gameOver")
     * @param nextState
     */
    public transition(nextState: string): void {
        if (this.currentState) {
            // leave the current state—transition out, unload assets, views, so on
            this.currentState.onLeave();
        }

        // change the reference to the desired state
        this.currentState = this.states.get(nextState);

        // enter the new state, swap in views,
        // setup event handlers, animated transitions
        this.currentState.onEnter();
    }
}
