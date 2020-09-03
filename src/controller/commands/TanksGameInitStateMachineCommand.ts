import {BaseCommand} from "./BaseCommand";
import {TanksGameModel} from "../../model/TanksGameModel";
import {TanksGameView} from "../../view/TanksGameView";
import {StateMachine} from "../../state_machine/StateMachine";
import {ETanksGameStateNames} from "../../enum/ETanksGameStateNames";
import {TanksGamePreloadingState} from "../../state_machine/states/TanksGamePreloadingState";

export class TanksGameInitStateMachineCommand extends BaseCommand<TanksGameModel, TanksGameView> {
    public execute() {
        this.model.stateMachine.addState(
            ETanksGameStateNames.PRELOADING,
            new TanksGamePreloadingState(this.model, this.view)
        );
    }
}
