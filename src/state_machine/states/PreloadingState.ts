import {AbstractState} from "../AbstractState";
import {IModel} from "../../interface/IModel";
import {IView} from "../../interface/IView";
import {ECommandNames} from "../../enum/ECommandNames";

export class PreloadingState<IM extends IModel, IV extends IView> extends AbstractState<IM, IV> {
    public onEnter(): void {
        this.view.preloadingScene.show();
        this.model.onCommandExecute.dispatch(ECommandNames.LOAD_ASSETS);
    }

    public onLeave(): void {
        this.view.preloadingScene.hide();
    }
}
