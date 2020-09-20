import {IModel} from "../../interface/IModel";
import {IView} from "../../interface/IView";
import {AbstractState} from "../AbstractState";
import {ECommandNames} from "../../enum/ECommandNames";

export class ActiveGameState<IM extends IModel, IV extends IView> extends AbstractState<IM, IV> {
    public onEnter(): void {
        this.view.activeGameScene.show();
        this.model.onCommandExecute.dispatch(ECommandNames.LOAD_MAP);
    }

    public onLeave(): void {
        this.view.activeGameScene.hide();
    }
}
