import {BaseCommand} from "./BaseCommand";
import {Model} from "../../model/Model";
import {View} from "../../view/View";
import {EStateNames} from "../../enum/EStateNames";
import {PreloadingState} from "../../state_machine/states/PreloadingState";
import {MainMenuState} from "../../state_machine/states/MainMenuState";
import {ActiveGameState} from "../../state_machine/states/ActiveGameState";

export class InitStateMachineCommand extends BaseCommand<Model, View> {
    public execute() {
        this.model.stateMachine.addState(EStateNames.PRELOADING, new PreloadingState(this.model, this.view));
        this.model.stateMachine.addState(EStateNames.MAIN_MENU, new MainMenuState(this.model, this.view));
        this.model.stateMachine.addState(EStateNames.ACTIVE_GAME, new ActiveGameState(this.model, this.view));
    }
}
