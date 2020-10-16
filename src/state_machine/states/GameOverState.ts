import {IModel} from "../../interface/IModel";
import {IView} from "../../interface/IView";
import {AbstractState} from "../AbstractState";
import {EStateNames} from "../../enum/EStateNames";

export class GameOverState<IM extends IModel, IV extends IView> extends AbstractState<IM, IV> {
    public onEnter(): void {
        this.view.getSceneByName(EStateNames.GAME_OVER_LOSE).show();
    }

    public onLeave(): void {
        this.view.getSceneByName(EStateNames.GAME_OVER_LOSE).hide();
    }
}
