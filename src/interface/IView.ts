import {PreloadingSceneView} from "../view/PreloadingSceneView";
import {MainMenuSceneView} from "../view/MainMenuSceneView";
import {ActiveGameSceneView} from "../view/ActiveGameSceneView";

export interface IView {
    framesUpdate(deltaTime: number): void;
    preloadingScene: PreloadingSceneView;
    mainMenuScene: MainMenuSceneView;
    activeGameScene: ActiveGameSceneView;
}
