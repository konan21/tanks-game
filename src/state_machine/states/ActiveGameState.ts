import {IModel} from "../../interface/IModel";
import {IView} from "../../interface/IView";
import {AbstractState} from "../AbstractState";
import {ECommandNames} from "../../enum/ECommandNames";
import {EStateNames} from "../../enum/EStateNames";

export class ActiveGameState<IM extends IModel, IV extends IView> extends AbstractState<IM, IV> {
    public onEnter(): void {
        this.view.getSceneByName(EStateNames.ACTIVE_GAME).show();
        this.model.runTime();
        this.model.onCommandExecute.dispatch(ECommandNames.LOAD_MAP);
    }

    public onLeave(): void {
        this.view.getSceneByName(EStateNames.ACTIVE_GAME).hide();
    }
}
