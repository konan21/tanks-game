import {AbstractState} from "../AbstractState";
import {ITanksGameModel} from "../../interface/ITanksGameModel";
import {ITanksGameView} from "../../interface/ITanksGameView";

export class TanksGamePreloadingState<M extends ITanksGameModel, V extends ITanksGameView> extends AbstractState<M, V> {
    public onEnter(): void {
        // TODO: show preloading view
    }

    public onLeave(): void {
        // TODO: hide preloading view and show options_screen view
    }
}
