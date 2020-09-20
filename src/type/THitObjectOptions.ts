import {Container, IPointData, Sprite} from "pixi.js";

export type THitObjectOptions = {
    displayObj: Container | Sprite;
    possiblePosition?: IPointData;
    isStatic?: boolean;
};
