import {IModel} from "../../interface/IModel";
import {IView} from "../../interface/IView";
import {AbstractState} from "../AbstractState";
import {EStateNames} from "../../enum/EStateNames";
import {EImageNames} from "../../enum/EImageNames";
import {ESoundNames} from "../../enum/ESoundNames";

export class MainMenuState<IM extends IModel, IV extends IView> extends AbstractState<IM, IV> {
    public onEnter(): void {
        this.view.getSceneByName(EStateNames.MAIN_MENU).show();
        this.view
            .getSceneByName(EStateNames.MAIN_MENU)
            .addButton(this.model.loader.resources.spritesheet.textures[EImageNames.BUTTON_START], () => {
                this.model.stateMachine.transition(EStateNames.ACTIVE_GAME);
            });

        // TODO: remove it && use enum sound names
        // this.model.playSound("sound_win");

        // just for testing & development
        // this.model.stateMachine.transition(EStateNames.ACTIVE_GAME);
    }

    public onLeave(): void {
        this.view.getSceneByName(EStateNames.MAIN_MENU).hide();
    }
}
