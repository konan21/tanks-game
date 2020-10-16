import {AbstractState} from "../AbstractState";
import {IModel} from "../../interface/IModel";
import {IView} from "../../interface/IView";
import {ECommandNames} from "../../enum/ECommandNames";
import {EStateNames} from "../../enum/EStateNames";

export class PreloadingState<IM extends IModel, IV extends IView> extends AbstractState<IM, IV> {
    public onEnter(): void {
        this.view.getSceneByName(EStateNames.PRELOADING).show();
        this.model.onCommandExecute.dispatch(ECommandNames.LOAD_ASSETS);
    }

    public onLeave(): void {
        this.view.getSceneByName(EStateNames.PRELOADING).hide();
    }
}
