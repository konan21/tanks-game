import {IModel} from "../../interface/IModel";
import {IView} from "../../interface/IView";
import {AbstractState} from "../AbstractState";

export class GameOverState<IM extends IModel, IV extends IView> extends AbstractState<IM, IV> {
    public onEnter(): void {
        this.view.gameOverScene.show();
    }

    public onLeave(): void {
        this.view.gameOverScene.hide();
    }
}
