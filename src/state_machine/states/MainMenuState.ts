import {IModel} from "../../interface/IModel";
import {IView} from "../../interface/IView";
import {AbstractState} from "../AbstractState";
import {EStateNames} from "../../enum/EStateNames";
import {EImageNames} from "../../enum/EImageNames";

export class MainMenuState<IM extends IModel, IV extends IView> extends AbstractState<IM, IV> {
    public onEnter(): void {
        this.view.mainMenuScene.show();
        this.view.mainMenuScene.addButton(
            this.model.loader.resources.spritesheet.textures[EImageNames.BUTTON_START],
            () => {
                this.model.stateMachine.transition(EStateNames.ACTIVE_GAME);
            }
        );

        // TODO: remove it
        this.model.stateMachine.transition(EStateNames.ACTIVE_GAME);
    }

    public onLeave(): void {
        this.view.mainMenuScene.hide();
    }
}