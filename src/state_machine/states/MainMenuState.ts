import {IModel} from "../../interface/IModel";
import {IView} from "../../interface/IView";
import {AbstractState} from "../AbstractState";
import {EStateNames} from "../../enum/EStateNames";

export class MainMenuState<IM extends IModel, IV extends IView> extends AbstractState<IM, IV> {
    public onEnter(): void {
        this.view.mainMenuScene.show();
        this.view.mainMenuScene.addButton(this.model.loader.resources.spritesheet.textures["button_start.png"], () => {
            console.log("SHOW MAP SCENE!!!");
            this.model.stateMachine.transition(EStateNames.ACTIVE_GAME);
        });
    }

    public onLeave(): void {
        this.view.mainMenuScene.hide();
    }
}
