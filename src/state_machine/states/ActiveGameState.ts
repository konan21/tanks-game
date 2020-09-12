import {IModel} from "../../interface/IModel";
import {IView} from "../../interface/IView";
import {AbstractState} from "../AbstractState";

export class ActiveGameState<IM extends IModel, IV extends IView> extends AbstractState<IM, IV> {
    public onEnter(): void {
        this.view.activeGameScene.show();
    }

    public onLeave(): void {
        this.view.activeGameScene.hide();
    }
}
