import {PreloadingSceneView} from "../view/PreloadingSceneView";
import {MainMenuSceneView} from "../view/MainMenuSceneView";
import {ActiveGameSceneView} from "../view/ActiveGameSceneView";
import {MapView} from "../view/MapView";
import {TankView} from "../view/TankView";

export interface IView {
    framesUpdate(deltaTime: number): void;
    map: MapView;
    tank: TankView;
    preloadingScene: PreloadingSceneView;
    mainMenuScene: MainMenuSceneView;
    activeGameScene: ActiveGameSceneView;
}
