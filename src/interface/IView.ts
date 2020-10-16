import {MapView} from "../view/MapView";
import {TankView} from "../view/TankView";

export interface IView {
    map: MapView;
    tank: TankView;
    // TODO: remove any
    getSceneByName: any;
}
