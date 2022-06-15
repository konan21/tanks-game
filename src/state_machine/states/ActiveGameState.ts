import {Model} from "../../model/Model";
import {View} from "../../view/View";
import {AbstractState} from "../AbstractState";
import {ECommandNames} from "../../enum/ECommandNames";
import {EStateNames} from "../../enum/EStateNames";

export class ActiveGameState<IM extends Model, IV extends View> extends AbstractState<IM, IV> {
    public onEnter(): void {
        this.view.getSceneByName(EStateNames.ACTIVE_GAME).show();
        this.model.runTime();
        this.model.onCommandExecute.dispatch(ECommandNames.LOAD_MAP);
    }

    public onLeave(): void {
        this.view.getSceneByName(EStateNames.ACTIVE_GAME).hide();
    }
}
