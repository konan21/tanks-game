import {AbstractState} from "../AbstractState";
import {IModel} from "../../interface/IModel";
import {IView} from "../../interface/IView";

export class PreloadingState<IM extends IModel, IV extends IView> extends AbstractState<IM, IV> {
    public onEnter(): void {
        this.view.preloadingScene.show();
        this.model.onPreloadingStarted.dispatch();
        const interval = setInterval(() => {
            if (this.model.loader.progress === 100) {
                clearInterval(interval);
            }
            this.view.preloadingScene.updateProgressBar(this.model.loader.progress);
        }, this.model.deltaTime);
    }

    public onLeave(): void {
        this.view.preloadingScene.hide();
    }
}
